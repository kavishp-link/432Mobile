import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image } from 'react-native';
import { PoppinsFonts } from '../../assets/fonts';
import { Colors } from '../../assets/colors/Colors';
import { ScreenWidth } from '../helper/Helper';
import { icon } from '../../assets/images/Image';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface LoginAndRegisterCustom {
  children: React.ReactNode;
}

const LoginAndRegisterCustom: React.FC<LoginAndRegisterCustom> = ({
  children,
}) => {
  const insets = useSafeAreaInsets(); // Get safe area insets

  return (
    <View style={[styles.mainContainer, { paddingBottom: insets.bottom - 7 }]}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.boxContainer}>{children}</View>
      </SafeAreaView>
      <View style={styles.bottomContainer}>
        <Text style={styles.icon432}>432</Text>
        <Text style={styles.iconCollective}>Collective</Text>
      </View>
    </View>
  );
};

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
    width: '80%',
    backgroundColor: Colors.black,
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 20,
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
});

export default LoginAndRegisterCustom;
