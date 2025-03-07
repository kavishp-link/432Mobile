import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React from 'react';
import { Colors } from '../../assets/colors/Colors';
import { ScreenWidth } from '../../component/helper/Helper';
import { PoppinsFonts } from '../../assets/fonts';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { icon } from '../../assets/images/Image';

const ForgetPassword = () => {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.mainContainer, { paddingBottom: insets.bottom - 7 }]}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.boxContainer}>
          <Image source={icon.locoksmithIcon} style={styles.mainIcon} />
          <View style={styles.heading}>
            <Text style={styles.LocksmithText}>Locksmith</Text>
            <Text style={styles.newKeyText}>Let’s Get You a New Key</Text>
          </View>
          <View style={styles.inputContainer}>
            <View style={styles.placeholderContainer}>
              <Image source={icon.email} style={styles.inputIconEmail} />
            </View>
            <TextInput
              style={styles.input}
              keyboardType='email-address'
              placeholder='Email Address'
              autoCapitalize='none'
              //  value={loginCreditional.email}
              //  onChangeText={(text) => handleChange('email', text)}
            />
          </View>
        </View>
      </SafeAreaView>
      <View style={styles.bottomContainer}>
        <Text style={styles.icon432}>432</Text>
        <Text style={styles.iconCollective}>Collective</Text>
      </View>
    </View>
  );
};

export default ForgetPassword;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  safeArea: {
    flex: 1,
    justifyContent: 'center',
  },
  boxContainer: {
    alignItems: 'center',
    alignSelf: 'center',
  },
  bottomContainer: {
    flexDirection: 'row',
    width: ScreenWidth - 50,
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'center',
    // Add margin instead of absolute positioning
  },
  icon432: {
    fontSize: 21,
    letterSpacing: 1.5,
    fontWeight: '700',
  },
  iconCollective: {
    fontFamily: PoppinsFonts.Regular,
  },
  mainIcon: {
    width: 169,
    height: 167,
  },
  heading: {
    marginVertical: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  LocksmithText: {
    fontFamily: PoppinsFonts.SemiBold,
    color: Colors.black,
    fontSize: 38,
  },
  newKeyText: {
    paddingTop: 20,
    fontFamily: PoppinsFonts.Regular,
    color: Colors.black,
    fontSize: 16,
  },
  inputContainer: {
    position: 'relative',
    height: 46,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderRadius: 23,
    marginTop: 15,
    paddingHorizontal: 10,
    width: ScreenWidth - 140,
    justifyContent: 'center',
    borderColor: '#BDBDBD',
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
});
