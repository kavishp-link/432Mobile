import {
  ActivityIndicator,
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import LoginAndRegisterCustom from "../../component/customComponent/LoginAndRegisterCustom";
import { Colors } from "../../assets/colors/Colors";
import { icon } from "../../assets/images/Image";
import { PoppinsFonts } from "../../assets/fonts";
import { ScreenWidth } from "../../component/helper/Helper";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../assets/types/Types";
import { loginApi } from "../../utils/api";
import { load, removeKeys, save } from "../../component/helper/storage";
import { useDispatch, useSelector } from "react-redux";
import { authStoreActions, getAuthStoreState } from "../../redux/authStore";

export const Login = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const dispatch = useDispatch();

  const [loginCreditional, setLoginCreditional] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState<{ email: string; password: string }>({
    email: "",
    password: "",
  });
  const [buttonLoader, setButtonLoader] = useState(false);

  const handleChange = (key: string, value: string) => {
    setLoginCreditional((prevForm) => ({ ...prevForm, [key]: value }));
    setError((prevError) => ({ ...prevError, [key]: "" }));
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogin = async () => {
    let valid = true;
    let newError = { email: "", password: "" };

    if (!loginCreditional.email) {
      newError.email = "Email is required";
      valid = false;
    } else if (!validateEmail(loginCreditional.email)) {
      newError.email = "Enter a valid email address";
      valid = false;
    }

    if (!loginCreditional.password) {
      newError.password = "Password is required";
      valid = false;
    } else if (loginCreditional.password.length < 6) {
      newError.password = "Password must be at least 6 characters";
      valid = false;
    }
    setError(newError);
    if (valid) {
      try {
        setButtonLoader(true);
        const resLogin = await loginApi(
          loginCreditional.email,
          loginCreditional.password
        );
        console.log("resLogin----->>", resLogin);

        if (resLogin.status) {
          const filteredUser = removeKeys(resLogin.data.user, [
            "__v",
            "password",
          ]);
          const filteredUserProfile = resLogin.data.userProfile
            ? removeKeys(resLogin.data.userProfile, ["__v", "_id"])
            : null;

          const filteredData = {
            user: filteredUser,
            ...(filteredUserProfile && { userProfile: filteredUserProfile }),
            ...{ isLoggedIn: true },
          };

          console.log("filteredData----->>", filteredData);

          await save("currentUser", filteredData);
          dispatch(authStoreActions.setUserDetails(filteredData));

          console.log("Logged in successfully!");
          setButtonLoader(false);
          if (resLogin?.data?.userProfile?.profileType) {
            navigation.navigate("Home");
          } else {
            navigation.navigate("CreateProfile");
          }
        } else {
          let invalidCred = { email: "", password: resLogin.message };
          setError(invalidCred);
        }
      } catch (error) {
        setButtonLoader(false);
        console.error("Login failed", error);
      } finally {
        setButtonLoader(false);
      }
    }
  };

  return (
    <LoginAndRegisterCustom>
      <View style={styles.mainContainer}>
        <View style={styles.container}>
          <Image style={styles.logo} source={icon.logo} />
          <Text style={styles.textTunein}>Tunein</Text>
        </View>
        <View style={styles.secondContainer}>
          {/* Email Input */}
          <View style={styles.inputContainer}>
            <View style={styles.placeholderContainer}>
              <Image source={icon.email} style={styles.inputIconEmail} />
            </View>
            <TextInput
              style={styles.input}
              keyboardType="email-address"
              placeholder="Email Address"
              autoCapitalize="none"
              value={loginCreditional.email}
              onChangeText={(text) => handleChange("email", text)}
            />
          </View>
          {error.email ? (
            <Text style={styles.errorText}>{error.email}</Text>
          ) : null}

          {/* Password Input */}
          <View style={styles.inputContainer}>
            <View style={styles.placeholderContainer}>
              <Image source={icon.password} style={styles.inputIconPassword} />
            </View>
            <TextInput
              style={styles.input}
              secureTextEntry
              placeholder="Password"
              value={loginCreditional.password}
              onChangeText={(text) => handleChange("password", text)}
            />
          </View>
          {error.password ? (
            <Text style={styles.errorText}>{error.password}</Text>
          ) : null}

          <TouchableOpacity
            style={styles.touchablelocksmith}
            onPress={() => navigation.navigate("ForgetPassword")}
          >
            <Text style={styles.textLocksmith}>Need a locksmith?</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.loginContainer}>
          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            {buttonLoader ? (
              <ActivityIndicator size={"small"} color={Colors.black} />
            ) : (
              <Text style={styles.loginText}>Log in</Text>
            )}
          </TouchableOpacity>
          <View style={styles.createProfile}>
            <Text style={styles.createProfileText}>Join us?</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Register")}>
              <Text style={styles.createProfileText2}> Create a Profile</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </LoginAndRegisterCustom>
  );
};

const styles = StyleSheet.create({
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 5,
    marginLeft: 10,
    fontFamily: PoppinsFonts.Regular,
  },
  mainContainer: {
    height: 500,
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 40,
  },
  logo: {
    width: 167,
    height: 71,
  },
  textTunein: {
    fontSize: 28,
    fontFamily: PoppinsFonts.Medium,
    color: Colors.white,
    paddingTop: 8,
  },
  secondContainer: {},
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
    marginLeft: 5,
  },
  input: {
    flex: 1,
    paddingLeft: 35,
    fontFamily: PoppinsFonts.Regular,
    fontSize: 12,
    color: "#BDBDBD",
  },
  inputIconEmail: {
    height: 15,
    width: 18,
  },
  inputIconPassword: {
    height: 20,
    width: 20,
  },
  touchablelocksmith: {
    paddingLeft: 15,
    paddingTop: 8,
  },
  textLocksmith: {
    fontFamily: PoppinsFonts.Regular,
    fontSize: 13,
    color: Colors.white,
  },
  loginContainer: {},
  loginButton: {
    width: ScreenWidth - 140,
    height: 46,
    backgroundColor: Colors.white,
    marginTop: 15,
    borderRadius: 23,
    alignItems: "center",
    justifyContent: "center",
  },
  loginText: {
    fontSize: 16,
    fontFamily: PoppinsFonts.SemiBold,
    fontWeight: "600",
  },
  createProfile: {
    flexDirection: "row", // Aligns text & button in a row
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  createProfileText: {
    fontSize: 16,

    fontFamily: PoppinsFonts.Medium,
    color: Colors.white,
  },
  createProfileText2: {
    fontSize: 16,
    fontWeight: "600",
    fontFamily: PoppinsFonts.Bold,
    color: Colors.white,
    textDecorationLine: "underline",
  },
});
