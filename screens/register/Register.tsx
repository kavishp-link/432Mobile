import {
  Image,
  KeyboardTypeOptions,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import LoginAndRegisterCustom from '../../component/customComponent/LoginAndRegisterCustom';
import { PoppinsFonts } from '../../assets/fonts';
import { Colors } from '../../assets/colors/Colors';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../assets/types/Types';
import { ScreenWidth } from '../../component/helper/Helper';
import { icon } from '../../assets/images/Image';
import { Dropdown } from 'react-native-element-dropdown';

const Register = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const [registerCreditional, setRegisterCreditional] = useState({
    name: '',
    email: '',
    password: '',
    dob: '',
  });
  const inputFields: {
    key: keyof typeof registerCreditional;
    placeholder: string;
    icon: any;
    keyboardType: KeyboardTypeOptions;
    secureTextEntry?: boolean;
  }[] = [
    {
      key: 'name',
      placeholder: 'Name',
      icon: icon.userIcon,
      keyboardType: 'default',
    },
    {
      key: 'email',
      placeholder: 'Email Address',
      icon: icon.email,
      keyboardType: 'email-address',
    },
    {
      key: 'password',
      placeholder: 'Password',
      icon: icon.password,
      keyboardType: 'default',
      secureTextEntry: true,
    },
    {
      key: 'dob',
      placeholder: 'Date of Birth',
      icon: icon.dob,
      keyboardType: 'numeric',
    },
  ];
  const handleChange = (key: string, value: string) => {
    setRegisterCreditional((prevForm) => ({ ...prevForm, [key]: value }));
  };

  return (
    <LoginAndRegisterCustom>
      <View style={styles.mainContainer}>
        <View style={styles.container}>
          <Text style={styles.firstHeading}>Register New Profile</Text>
          <View style={styles.secondHeading}>
            <Text style={styles.secondHeadingText}>Join us?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.secondHeadingTextTouchable}>
                {' '}
                Log in here
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.secondContainer}>
          {inputFields.map(
            ({ key, placeholder, icon, keyboardType, secureTextEntry }) => (
              <View key={key} style={styles.inputContainer}>
                <View style={styles.placeholderContainer}>
                  <Image source={icon} style={styles.inputIcon} />
                </View>

                <TextInput
                  style={styles.input}
                  keyboardType={keyboardType}
                  placeholder={placeholder}
                  secureTextEntry={secureTextEntry || false}
                  value={registerCreditional[key]}
                  onChangeText={(text) => handleChange(key, text)}
                />
              </View>
            )
          )}
        </View>
        <View style={styles.nextContainer}>
          <TouchableOpacity
            style={styles.nextButton}
            onPress={() => navigation.navigate('CreateProfile')}
          >
            <Text style={styles.nextText}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    </LoginAndRegisterCustom>
  );
};

export default Register;

const styles = StyleSheet.create({
  mainContainer: {
    height: 500,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 40,
  },
  firstHeading: {
    fontFamily: PoppinsFonts.Medium,
    fontSize: 28,
    color: Colors.white,
  },
  secondHeading: {
    flexDirection: 'row', // Aligns text & button in a row
    justifyContent: 'center',
    alignItems: 'center',
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
    textDecorationLine: 'underline',
  },
  secondContainer: {
    paddingTop: 10,
  },
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  nextText: {
    fontSize: 16,
    fontFamily: PoppinsFonts.SemiBold,
  },
});
