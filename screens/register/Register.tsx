import {
  Image,
  KeyboardTypeOptions,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Platform,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import DatePicker from "react-native-date-picker";
import LoginAndRegisterCustom from "../../component/customComponent/LoginAndRegisterCustom";
import { PoppinsFonts } from "../../assets/fonts";
import { Colors } from "../../assets/colors/Colors";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../assets/types/Types";
import { ScreenWidth } from "../../component/helper/Helper";
import { icon } from "../../assets/images/Image";
import { signupApi } from "../../utils/api";
import CustomPopup from "../../component/customComponent/CustomPopup";

export const Register = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const [registerCreditional, setRegisterCreditional] = useState({
    name: "",
    email: "",
    password: "",
    dateOfBirth: "",
  });
  console.log("registerCreditional---->>>", registerCreditional);

  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [buttonLoader, setButtonLoader] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [popupTitle, setPopupTitle] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [onConfirmAction, setOnConfirmAction] = useState<() => void>(
    () => () => setModalVisible(false)
  );

  const [error, setError] = useState({
    name: "",
    email: "",
    password: "",
    dateOfBirth: "",
  });

  const handleChange = (key: string, value: string) => {
    setRegisterCreditional((prevForm) => ({ ...prevForm, [key]: value }));
    setError((prevError) => ({ ...prevError, [key]: "" }));
  };

  const handleDateConfirm = (date: Date) => {
    console.log("date---->>", date);
    setOpenDatePicker(false);
    setSelectedDate(date);
    const formattedDate = `${date.getDate().toString().padStart(2, "0")}-${(
      date.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}-${date.getFullYear()}`;
    handleChange("dateOfBirth", formattedDate);
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleRegister = async () => {
    let valid = true;
    let newError = { name: "", email: "", password: "", dateOfBirth: "" };

    // Name validation
    if (!registerCreditional.name.trim()) {
      newError.name = "Name is required";
      valid = false;
    }

    // Email validation
    if (!registerCreditional.email.trim()) {
      newError.email = "Email is required";
      valid = false;
    } else if (!validateEmail(registerCreditional.email)) {
      newError.email = "Enter a valid email address";
      valid = false;
    }

    // Password validation
    if (!registerCreditional.password.trim()) {
      newError.password = "Password is required";
      valid = false;
    } else if (registerCreditional.password.length < 6) {
      newError.password = "Password must be at least 6 characters";
      valid = false;
    }

    // DOB validation
    if (!registerCreditional.dateOfBirth.trim()) {
      newError.dateOfBirth = "Date of Birth is required";
      valid = false;
    }

    setError(newError);

    if (valid) {
      console.log("Form submitted successfully:", registerCreditional);
      try {
        setButtonLoader(true);
        const signUpRes = await signupApi(registerCreditional);
        console.log("signUpRes---->>", signUpRes);
        if (signUpRes.status) {
          setButtonLoader(false);
          setPopupTitle("Verfication");
          setPopupMessage(signUpRes?.message);
          setOnConfirmAction(() => () => {
            setModalVisible(false);
            navigation.navigate("Login");
          });
          setModalVisible(true);
        } else {
          setButtonLoader(false);
          setPopupTitle("Email Exists");
          setPopupMessage(signUpRes?.message);
          setOnConfirmAction(() => () => setModalVisible(false));
          setModalVisible(true);
        }
      } catch (error) {
        setButtonLoader(false);
        console.log("Error SignUp--->>", error);
      } finally {
        setButtonLoader(false);
      }
    }
  };

  const inputFields: {
    key: keyof typeof registerCreditional;
    placeholder: string;
    icon: any;
    keyboardType: KeyboardTypeOptions;
    secureTextEntry?: boolean;
  }[] = [
    {
      key: "name",
      placeholder: "Name",
      icon: icon.userIcon,
      keyboardType: "default",
    },
    {
      key: "email",
      placeholder: "Email Address",
      icon: icon.email,
      keyboardType: "email-address",
    },
    {
      key: "password",
      placeholder: "Password",
      icon: icon.password,
      keyboardType: "default",
      secureTextEntry: true,
    },
    {
      key: "dateOfBirth",
      placeholder: "Date of Birth",
      icon: icon.dob,
      keyboardType: "default",
    },
  ];

  return (
    <LoginAndRegisterCustom>
      <View style={styles.mainContainer}>
        <View style={styles.container}>
          <Text style={styles.firstHeading}>Register New Profile</Text>
          <View style={styles.secondHeading}>
            <Text style={styles.secondHeadingText}>Join us?</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text style={styles.secondHeadingTextTouchable}>
                {" "}
                Log in here
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.secondContainer}>
          {inputFields.map(
            ({ key, placeholder, icon, keyboardType, secureTextEntry }) => (
              <>
                <View key={key} style={styles.inputContainer}>
                  <View style={styles.placeholderContainer}>
                    <Image source={icon} style={styles.inputIcon} />
                  </View>

                  {key === "dateOfBirth" ? (
                    <TouchableOpacity
                      style={styles.dobInput}
                      onPress={() => setOpenDatePicker(true)}
                    >
                      <Text style={styles.dobText}>
                        {registerCreditional.dateOfBirth || placeholder}
                      </Text>
                    </TouchableOpacity>
                  ) : (
                    <TextInput
                      style={styles.input}
                      keyboardType={keyboardType}
                      placeholder={placeholder}
                      secureTextEntry={secureTextEntry || false}
                      value={registerCreditional[key]}
                      onChangeText={(text) => handleChange(key, text)}
                      autoCapitalize="none"
                    />
                  )}
                </View>

                {/* Show error message if validation fails */}
                {error[key] ? (
                  <Text style={styles.errorText}>{error[key]}</Text>
                ) : null}
              </>
            )
          )}
        </View>

        <View style={styles.nextContainer}>
          <TouchableOpacity style={styles.nextButton} onPress={handleRegister}>
            {buttonLoader ? (
              <ActivityIndicator size={"small"} color={Colors.black} />
            ) : (
              <Text style={styles.nextText}>Next</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>

      <DatePicker
        modal
        open={openDatePicker}
        date={selectedDate}
        mode="date"
        maximumDate={new Date()}
        onConfirm={handleDateConfirm}
        onCancel={() => setOpenDatePicker(false)}
      />
      <CustomPopup
        visible={modalVisible}
        title={popupTitle}
        message={popupMessage}
        confirmText="Ok"
        cancelText="Cancel"
        onConfirm={onConfirmAction}
        // onCancel={() => {
        //   setModalVisible(false);
        // }}
      />
    </LoginAndRegisterCustom>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    // height: 600,
    paddingVertical: 30,
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
  secondHeading: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
  },
  secondHeadingText: {
    fontFamily: PoppinsFonts.Regular,
    fontSize: 16,
    color: Colors.white,
  },
  secondHeadingTextTouchable: {
    fontFamily: PoppinsFonts.Regular,
    fontSize: 16,
    color: Colors.white,
    textDecorationLine: "underline",
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
  dobInput: {
    height: "100%",
    justifyContent: "center",
    paddingLeft: 35,
  },
  dobText: {
    fontFamily: PoppinsFonts.Regular,
    fontSize: 12,
    color: "#BDBDBD",
    paddingTop: 5,
  },
  input: {
    flex: 1,
    paddingLeft: 35,
    fontFamily: PoppinsFonts.Regular,
    fontSize: 12,
    color: "#BDBDBD",
  },
  inputIcon: {
    height: 20,
    width: 20,
  },
  nextContainer: {
    paddingTop: 20,
  },
  nextButton: {
    width: ScreenWidth - 140,
    height: 46,
    backgroundColor: Colors.white,
    marginTop: 15,
    borderRadius: 23,
    alignItems: "center",
    justifyContent: "center",
  },
  nextText: {
    fontSize: 16,
    fontFamily: PoppinsFonts.SemiBold,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 3,
    paddingLeft: 15,
    textAlign: "left",
  },
});
