import {
  Image,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useRef } from 'react';
import { Colors } from '../../assets/colors/Colors';
import { StatusBar } from 'expo-status-bar';
import { icon } from '../../assets/images/Image';
import { ScreenHeight, ScreenWidth } from '../../component/helper/Helper';
import { PoppinsFonts } from '../../assets/fonts';
import Container from '../../component/customComponent/Container';
import HomeVideo from '../../component/customComponent/HomeVideo';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../assets/types/Types';

export const Home = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  return (
    <Container bottomTexts={['we', 'are', 'the', 'collective']}>
      <StatusBar style='light' />
      <View style={styles.container}>
        <View style={styles.mainHeading}>
          <Image source={icon.Home432} style={styles.homeIcon} />
        </View>

        <TouchableOpacity
          style={styles.userIcon}
          onPress={() => navigation.navigate('Profile')}
        >
          <View style={styles.circle}>
            {/* Half Black View */}
            <View style={styles.halfBlack} />
          </View>
          <Image source={icon.Avatar} style={styles.userImage} />
        </TouchableOpacity>
        <View style={styles.mainHeadingText}>
          <Text style={styles.txet1}>Hey, You</Text>
          <Text style={styles.txet2}>Agora</Text>
        </View>
        <HomeVideo />
        {/* <View style={styles.mainView}>
          <View style={styles.videoTopContainer}>
            <TouchableOpacity style={styles.plaza}>
              <Image source={icon.play} style={styles.playIcon} />
              <Text style={styles.mainContainerTxet}>Plazz</Text>
            </TouchableOpacity>
            <Video
              source={background}
              ref={videoRef}
              repeat={true}
              style={styles.video}
              resizeMode='cover'
            />
          </View>
          <View style={styles.midContainer}></View>
          <View style={styles.videoBottomContainer}>
            <TouchableOpacity style={styles.plaza}>
              <Image source={icon.play} style={styles.playIcon} />
              <Text style={styles.mainContainerTxet2}>Collector's Vault</Text>
            </TouchableOpacity>
            <Video
              source={background}
              ref={videoRef}
              repeat={true}
              style={styles.video}
              resizeMode='cover'
            />
          </View>
        </View> */}
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.black,
  },
  container: { justifyContent: 'center', alignItems: 'center' },
  mainHeading: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: Platform.OS === 'ios' ? ScreenHeight * 0.16 : ScreenHeight * 0.2,
    paddingBottom: 20,

    width: ScreenWidth,
  },
  homeIcon: {
    width: 132,
    height: 72,
  },
  mainHeadingText: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  userIcon: {
    marginTop: 10,
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 55,
  },
  userImage: {
    position: 'absolute',
    width: 76,
    height: 76,
  },
  circle: {
    width: 90,
    height: 90,
    borderRadius: 50,
    backgroundColor: 'transparent',
    overflow: 'hidden', // Hide the overflowing black part
  },
  halfBlack: {
    position: 'absolute',
    width: '50%',
    height: '100%',
    backgroundColor: 'black',
    left: 0, // Covers half of the circle
  },
  txet1: {
    color: Colors.BattleshipGray,
    fontFamily: PoppinsFonts.Regular,
    fontSize: 16,
  },
  txet2: {
    color: Colors.white,
    fontFamily: PoppinsFonts.SemiBold,
    fontSize: 22,
  },
});
