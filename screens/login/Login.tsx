import {
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import LoginAndRegisterCustom from '../../component/customComponent/LoginAndRegisterCustom';
import { Colors } from '../../assets/colors/Colors';
import { icon } from '../../assets/images/Image';
import { PoppinsFonts } from '../../assets/fonts';
import { ScreenWidth } from '../../component/helper/Helper';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../assets/types/Types';

export const Login = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [loginCreditional, setLoginCreditional] = useState({
    email: '',
    password: '',
  });

  const handleChange = (key: string, value: string) => {
    setLoginCreditional((prevForm) => ({ ...prevForm, [key]: value }));
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
              keyboardType='email-address'
              placeholder='Email Address'
              autoCapitalize='none'
              value={loginCreditional.email}
              onChangeText={(text) => handleChange('email', text)}
            />
          </View>
          {/* Password Input */}
          <View style={styles.inputContainer}>
            <View style={styles.placeholderContainer}>
              <Image source={icon.password} style={styles.inputIconPassword} />
            </View>

            <TextInput
              style={styles.input}
              secureTextEntry
              placeholder='Password'
              value={loginCreditional.password}
              onChangeText={(text) => handleChange('password', text)}
            />
          </View>
          <TouchableOpacity
            style={styles.touchablelocksmith}
            onPress={() => navigation.navigate('ForgetPassword')}
          >
            <Text style={styles.textLocksmith}>Need a locksmith?</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.loginContainer}>
          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => navigation.navigate('Home')}
          >
            <Text style={styles.loginText}>Log in</Text>
          </TouchableOpacity>
          <View style={styles.createProfile}>
            <Text style={styles.createProfileText}>Join us?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text style={styles.createProfileText2}> Create a Profile</Text>
            </TouchableOpacity>
          </View>
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
    justifyContent: 'center',
    alignItems: 'center',
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
    position: 'relative',
    height: 46,
    backgroundColor: Colors.white,

    borderRadius: 23,
    marginTop: 15,
    paddingHorizontal: 10,
    width: ScreenWidth - 140,
    justifyContent: 'center',
  },
  placeholderContainer: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    left: 20,
  },
  placeholderText: {
    color: '#BDBDBD',
    fontFamily: PoppinsFonts.Regular,
    fontSize: 12,
    marginLeft: 5,
  },
  input: {
    flex: 1,
    paddingLeft: 35,
    fontFamily: PoppinsFonts.Regular,
    fontSize: 12,
    color: '#BDBDBD',
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginText: {
    fontSize: 16,
    fontFamily: PoppinsFonts.SemiBold,
    fontWeight: '600',
  },
  createProfile: {
    flexDirection: 'row', // Aligns text & button in a row
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  createProfileText: {
    fontSize: 16,

    fontFamily: PoppinsFonts.Medium,
    color: Colors.white,
  },
  createProfileText2: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: PoppinsFonts.Bold,
    color: Colors.white,
    textDecorationLine: 'underline',
  },
});
