import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Easing,
  Platform,
  Image,
  Alert,
  Linking,
  KeyboardAvoidingView,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import DatePicker from "react-native-date-picker";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

import Container from "../../component/customComponent/Container";
import { Colors } from "../../assets/colors/Colors";
import { PoppinsFonts } from "../../assets/fonts";
import { TopBar } from "../../component/customComponent/TopBar";
import { icon } from "../../assets/images/Image";
import {
  formatDate,
  load,
  removeKeys,
  save,
} from "../../component/helper/storage";
import { RootStackParamList } from "../../assets/types/Types";
import {
  presignedUrlApi,
  updatePersonalInfoApi,
  uploadImageToS3,
} from "../../utils/api";
import FastImage from "react-native-fast-image";
import { useDispatch, useSelector } from "react-redux";
import { authStoreActions, getAuthStoreState } from "../../redux/authStore";

const FloatingLabelInput = ({
  label,
  value,
  onChangeText,
  editable,
  keyboardType,
  onPress,
  showCalendarIcon,
  isEditable,
}: any) => {
  const [isFocused, setIsFocused] = useState(false);
  const labelAnim = useRef(new Animated.Value(value ? 1 : 0)).current;

  const handleFocus = () => {
    setIsFocused(true);
    Animated.timing(labelAnim, {
      toValue: 1,
      duration: 150,
      easing: Easing.out(Easing.ease),
      useNativeDriver: false,
    }).start();
    if (onPress) onPress();
  };

  const handleBlur = () => {
    if (!value) {
      setIsFocused(false);
      Animated.timing(labelAnim, {
        toValue: 0,
        duration: 100,
        easing: Easing.out(Easing.ease),
        useNativeDriver: false,
      }).start();
    }
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={styles.inputContainer}
      disabled={onPress && isEditable ? false : true}
    >
      <Animated.Text
        style={[
          styles.label,
          {
            top: labelAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [18, -11],
            }),
            left: labelAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [10, 25],
            }),
            fontSize: labelAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [16, 14],
            }),
            color: isFocused || value ? "#fff" : "#888",
            fontFamily: PoppinsFonts.Regular,
          },
        ]}
      >
        {label}
      </Animated.Text>
      <View style={styles.inputRow}>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          onFocus={handleFocus}
          onBlur={handleBlur}
          editable={editable}
          style={styles.inputText}
          keyboardType={keyboardType}
        />
        {showCalendarIcon && (
          <FontAwesome
            name="calendar"
            size={20}
            color="#fff"
            style={styles.calendarIcon}
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

export const PersonalDetails = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const dispatch = useDispatch();
  const { userDetails } = useSelector((rootState) =>
    getAuthStoreState(rootState)
  );
  const [isEditable, setIsEditable] = useState(false);
  const [details, setDetails] = useState<any>({
    name: userDetails?.user?.name,
    email: userDetails?.user?.email,
    dateOfBirth: formatDate(new Date(userDetails?.user?.dateOfBirth)),
    location: userDetails?.userProfile?.location,
    portfolioLink: userDetails?.userProfile?.portfolioLink,
    musicInOneWord: userDetails?.userProfile?.musicInOneWord,
    profileUrl: userDetails?.userProfile?.profileUrl,
  });

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(
    new Date(userDetails?.user?.dateOfBirth)
  );
  const [buttonLoader, setButtonLoader] = useState(false);

  console.log("details------->>", selectedDate);
  console.log("userDetails from store------->>", userDetails);

  const toggleEdit = () => setIsEditable(!isEditable);

  const handleDateChange = (date: Date) => {
    setShowDatePicker(false);
    setSelectedDate(date);
    const formattedDate = `${date.getDate().toString().padStart(2, "0")}-${(
      date.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}-${date.getFullYear()}`;
    setDetails({ ...details, dateOfBirth: formattedDate });
  };

  const pickImage = async () => {
    try {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission Denied",
          "Photos access has been denied. Please enable it from the app settings to proceed.",

          [
            {
              text: "Go to Settings",
              onPress: () => Linking.openSettings(),
            },
            {
              text: "Cancel",
              style: "cancel",
            },
          ],
          { cancelable: false }
        );
        return;
      }
      const mediaType: any = "Images";
      const result: ImagePicker.ImagePickerResult =
        await ImagePicker.launchImageLibraryAsync({
          mediaTypes: mediaType,
          aspect: [4, 3],
          quality: 1,
        });

      if (result.canceled || !result.assets?.length) {
        return;
      }
      const selectedAsset: ImagePicker.ImagePickerAsset = result.assets[0];
      const currentUser: any = await load("currentUser");
      console.log("selectedAsset---->>", selectedAsset);
      setDetails((prevDetails: any) => ({
        ...prevDetails,
        profileUrl: selectedAsset.uri,
      }));
      const fileObj = {
        fileName: selectedAsset.fileName ?? "image.jpg",
        fileType: selectedAsset.mimeType ?? "image/jpeg",
        filePath: "profile",
      };

      // Fetch presigned URL
      const res = await presignedUrlApi(currentUser.user.accessToken, fileObj);
      if (!res?.data?.presignedUrl)
        throw new Error("Failed to fetch presigned URL");

      const { presignedUrl, key } = res.data;
      console.log("presignedUrl---->>", presignedUrl);

      const newImageUrl = await uploadImageToS3(
        presignedUrl,
        key,
        selectedAsset
      );
      if (newImageUrl) {
        console.log("Uploaded Image URL:---->>", newImageUrl);
        setDetails((prevDetails: any) => ({
          ...prevDetails,
          profileUrl: newImageUrl,
        }));
      }
    } catch (error) {
      console.error("Error selecting image:", error);
    } finally {
    }
  };

  const handleSave = async () => {
    try {
      setButtonLoader(true);
      const updatedObj = removeKeys(details, ["email"]);
      console.log("updated Obj---->>", updatedObj);

      const resUpdateInfo = await updatePersonalInfoApi(
        userDetails.user.accessToken,
        updatedObj
      );
      console.log("resUpdateInfo---->>", resUpdateInfo);

      if (resUpdateInfo?.status) {
        const filteredUser = removeKeys(resUpdateInfo.data.user, [
          "__v",
          "password",
        ]);
        const filteredUserProfile = resUpdateInfo.data.userProfile
          ? removeKeys(resUpdateInfo.data.userProfile, ["__v", "_id"])
          : null;

        const filteredData = {
          user: filteredUser,
          ...(filteredUserProfile && { userProfile: filteredUserProfile }),
          ...{ isLoggedIn: true },
        };
        console.log("filteredData---->>", filteredData);
        await save("currentUser", filteredData);
        dispatch(authStoreActions.setUserDetails(filteredData));
        setButtonLoader(false);
        navigation.navigate("Home");
      } else {
        setButtonLoader(false);
      }
    } catch (error) {
      setButtonLoader(false);
    } finally {
      setButtonLoader(false);
    }
  };

  return (
    <Container bottomTexts={["it’s", "your", "world"]}>
      <TopBar
        onLeftPress={() => navigation.goBack()}
        isBackButton={true}
        midText={"Personal Details"}
        isEditButton={!isEditable}
        onRightLogPress={toggleEdit}
        showEditButton={true}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={styles.container}>
            <TouchableOpacity style={styles.userIcon}>
              <View style={styles.circle}>
                <View style={styles.halfBlack} />
              </View>
              {details.profileUrl ? (
                <FastImage
                  source={{ uri: details.profileUrl }}
                  style={[styles.userImage, { borderRadius: 38 }]}
                />
              ) : (
                <FastImage source={icon.Avatar} style={styles.userImage} />
              )}
              {isEditable && (
                <TouchableOpacity
                  onPress={() => {
                    pickImage();
                  }}
                  style={{
                    position: "absolute",
                    top: 0,
                    right: 7,
                    width: 20,
                    height: 20,
                    backgroundColor: Colors.white,
                    borderRadius: 10,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Image
                    source={icon.editIcon}
                    style={{
                      width: 15,
                      height: 15,
                    }}
                    tintColor={Colors.black}
                  />
                </TouchableOpacity>
              )}
            </TouchableOpacity>

            {Object.keys(details).map(
              (key) =>
                key !== "profileUrl" &&
                (key === "dateOfBirth" ? (
                  <FloatingLabelInput
                    key={key}
                    label="Date of Birth"
                    value={details.dateOfBirth}
                    editable={false}
                    onPress={() => isEditable && setShowDatePicker(true)}
                    showCalendarIcon={true}
                    isEditable={isEditable}
                  />
                ) : (
                  <FloatingLabelInput
                    key={key}
                    label={
                      key === "portfolioLink"
                        ? "Portfolio Link"
                        : key == "musicInOneWord"
                        ? "Music In OneWord"
                        : key.replace(/\b\w/g, (l) => l.toUpperCase())
                    }
                    value={details[key]}
                    onChangeText={(text: any) =>
                      setDetails((prevDetails: any) => ({
                        ...prevDetails,
                        [key]: text,
                      }))
                    }
                    editable={key !== "email" && isEditable}
                    keyboardType={key === "phone" ? "phone-pad" : "default"}
                  />
                ))
            )}
            {showDatePicker && (
              <DatePicker
                modal
                open={showDatePicker}
                date={selectedDate}
                mode="date"
                maximumDate={new Date()}
                onConfirm={handleDateChange}
                onCancel={() => setShowDatePicker(false)}
              />
            )}
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.saveButton}
                onPress={() => {
                  handleSave();
                }}
                disabled={buttonLoader}
              >
                {buttonLoader ? (
                  <ActivityIndicator size={"small"} color={Colors.black} />
                ) : (
                  <Text style={styles.buttonText}>Save</Text>
                )}
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setIsEditable(false)}
              >
                <Text style={[styles.buttonText, { color: Colors.white }]}>
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  inputContainer: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#666",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 10,
    position: "relative",
  },
  inputText: {
    color: "white",
    fontSize: 16,
    padding: 10,
    fontFamily: PoppinsFonts.Regular,
    flex: 1,
  },
  label: {
    position: "absolute",
    backgroundColor: Colors.black,
    paddingHorizontal: 5,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  calendarIcon: {
    marginRight: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  saveButton: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 20,
    flex: 1,
    marginRight: 10,
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: "#1F1F1F",
    padding: 10,
    borderRadius: 20,
    flex: 1,
    alignItems: "center",
  },
  buttonText: { fontSize: 16, fontWeight: "bold" },
  userIcon: {
    // marginTop: 10,
    width: 100,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.white,
    borderRadius: 55,
    alignSelf: "center",
    marginBottom: 30,
  },
  userImage: {
    position: "absolute",
    width: 76,
    height: 76,
  },
  circle: {
    width: 90,
    height: 90,
    borderRadius: 50,
    backgroundColor: "transparent",
    overflow: "hidden", // Hide the overflowing black part
  },
  halfBlack: {
    position: "absolute",
    width: "50%",
    height: "100%",
    backgroundColor: "black",
    left: 0, // Covers half of the circle
  },
});
