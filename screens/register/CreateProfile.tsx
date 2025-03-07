import {
  Image,
  KeyboardTypeOptions,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { PoppinsFonts } from "../../assets/fonts";
import {
  inputFields,
  ProfileType,
  ScreenWidth,
  SocialLinkIcon,
} from "../../component/helper/Helper";
import { Colors } from "../../assets/colors/Colors";
import LoginAndRegisterCustom from "../../component/customComponent/LoginAndRegisterCustom";
import { RootStackParamList, UserDetails } from "../../assets/types/Types";
import { Dropdown } from "react-native-element-dropdown";
import { NavigationProp, useNavigation } from "@react-navigation/native";

export const CreateProfile = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [userDetails, setUserDetails] = useState<UserDetails | any>({
    profileType: "",
    location: "",
    portfolio: "",
    bio: "",
  });

  const handleChange = <T extends keyof UserDetails>(key: T, value: string) => {
    setUserDetails((prev: any) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <LoginAndRegisterCustom>
      <View style={styles.mainContainer}>
        <View style={styles.container}>
          <Text style={styles.firstHeading}>Create New Profile</Text>
        </View>

        <View style={styles.secondContainer}>
          <View>
            <Dropdown
              style={styles.dropdown}
              selectedTextStyle={styles.selectedTextStyle}
              containerStyle={styles.containerStyle}
              itemTextStyle={styles.itemTextStyle}
              placeholderStyle={styles.placeholderStyle}
              onChange={(item) => handleChange("profileType", item.label)}
              data={ProfileType}
              search={false}
              value={userDetails?.profileType} // Ensure this updates
              labelField="label"
              valueField="value"
              placeholder="Profile Type"
            />
            <Dropdown
              style={styles.dropdown}
              selectedTextStyle={styles.selectedTextStyle}
              containerStyle={styles.containerStyle}
              itemTextStyle={styles.itemTextStyle}
              placeholderStyle={styles.placeholderStyle}
              onChange={(item) => handleChange("location", item.label)}
              data={ProfileType}
              search={false}
              value={userDetails?.location} // Ensure this updates
              labelField="label"
              valueField="value"
              placeholder="location"
            />
          </View>
          {inputFields?.map(
            ({ key, placeholder, keyboardType, type, options }) => (
              <View key={key} style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  keyboardType={keyboardType}
                  placeholder={placeholder}
                  value={userDetails[key]}
                  onChangeText={(text) => handleChange(key, text)}
                />
              </View>
            )
          )}
        </View>
        <View style={styles.socialContainer}>
          <View style={styles.socialTextView}>
            <Text style={styles.socialText}>Link socials:</Text>
          </View>
          <View style={styles.socialIconView}>
            {SocialLinkIcon.map((item, index) => (
              <TouchableOpacity key={index}>
                <Image
                  source={item.icon}
                  style={[
                    styles.socialIcon,
                    index !== SocialLinkIcon.length - 1 && { marginRight: 10 }, // Add margin except for the last icon
                  ]}
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <View style={styles.SubmitContainer}>
          <TouchableOpacity
            style={styles.SubmitButton}
            onPress={() => {
              navigation.navigate("CollectorsVault");
            }}
          >
            <Text style={styles.SubmitText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </LoginAndRegisterCustom>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    height: 500,
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 40,
  },
  firstHeading: {
    fontFamily: PoppinsFonts.Medium,
    fontSize: 28,
    color: Colors.white,
  },
  secondContainer: {
    paddingTop: 10,
  },
  inputContainer: {
    position: "relative",
    height: 46,
    backgroundColor: Colors.white,

    borderRadius: 23,
    marginTop: 15,
    paddingHorizontal: 10,
    width: ScreenWidth - 140,
    justifyContent: "center",
  },
  placeholderContainer: {
    position: "absolute",
    flexDirection: "row",
    alignItems: "center",
    left: 20,
  },
  placeholderText: {
    color: "#BDBDBD",
    fontFamily: PoppinsFonts.Regular,
    fontSize: 12,
    marginLeft: 8,
    paddingRight: 20,
  },
  input: {
    flex: 1,
    paddingLeft: 10,

    fontFamily: PoppinsFonts.Regular,
    fontSize: 12,
    color: "#BDBDBD",
  },
  inputIconEmail: {
    height: 15,
    width: 18,
  },
  inputIcon: {
    height: 20,
    width: 20,
  },
  SubmitContainer: {
    paddingTop: 20,
  },
  SubmitButton: {
    width: ScreenWidth - 140,
    height: 46,
    backgroundColor: Colors.white,
    marginTop: 10,
    borderRadius: 23,
    alignItems: "center",
    justifyContent: "center",
  },
  SubmitText: {
    fontSize: 16,
    fontFamily: PoppinsFonts.SemiBold,
  },
  dropdown: {
    height: 46,
    backgroundColor: Colors.white,

    borderRadius: 23,
    marginTop: 15,
    paddingHorizontal: 10,
    width: ScreenWidth - 140,
    justifyContent: "center",
  },
  placeholderStyle: {
    paddingLeft: 14,
    fontFamily: PoppinsFonts.Regular,
    fontSize: 12,
    color: "#BDBDBD",
  },
  itemContainerStyle: {},
  containerStyle: {
    borderRadius: 12,
  },
  itemTextStyle: {
    fontFamily: PoppinsFonts.Regular,
    fontSize: 14,
    color: "#BDBDBD",
  },
  selectedTextStyle: {
    paddingLeft: 14,
    fontFamily: PoppinsFonts.Regular,
    fontSize: 12,
    color: "#BDBDBD",
  },
  socialContainer: {
    paddingTop: 20,
    paddingRight: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  socialTextView: {},
  socialText: {
    fontFamily: PoppinsFonts.Regular,
    fontSize: 16,
    color: Colors.white,
  },
  socialIconView: {
    flexDirection: "row",

    width: "auto",
  },
  socialIcon: {
    width: 32,
    height: 32,
  },
});
