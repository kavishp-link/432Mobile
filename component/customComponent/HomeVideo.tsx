import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useRef } from 'react';
import Video, { VideoRef } from 'react-native-video';
import { icon } from '../../assets/images/Image';
import { PoppinsFonts } from '../../assets/fonts';
import { Colors } from '../../assets/colors/Colors';
import { ViewStyle } from 'react-native';
import { GifThemes } from '../helper/Helper';
import { getGlobalStoreState } from '../../redux/globalStore';
import { useSelector } from 'react-redux';
import FastImage from 'react-native-fast-image';
interface HomeVideoProps {
  children?: React.ReactNode;
  topTitle?: string; // Title for the top button
  bottomTitle?: string; // Title for the bottom button
  onTopPress?: () => void; // Function for top button press
  onBottomPress?: () => void; // Function for bottom button press
}

const HomeVideo: React.FC<HomeVideoProps> = ({
  children,
  topTitle = 'Plaza',
  bottomTitle = "Collector's Vault",
  onTopPress,
  onBottomPress,
}) => {
  const { themeUrl } = useSelector((rootState) =>
    getGlobalStoreState(rootState)
  );
  // Function to determine dynamic styles

  const getContainerStyle = (title: string): ViewStyle => {
    const isSmallRounded =
      title === 'Frequency Baazaar' || title === 'Galleria';
    const isCollectorVault = title === `Collector's Vault`;
    const isPlaza = title === 'Plaza';
    console.log('isSmallRounded', isSmallRounded);

    return {
      width: isSmallRounded ? 380 : 300,
      height: isSmallRounded ? 310 : 160,

      borderRadius: isSmallRounded ? 12 : 0, // Small rounded for Frequency Bazaar & Galleria

      borderTopLeftRadius: isSmallRounded ? 12 : isPlaza ? 150 : 0,
      borderTopRightRadius: isSmallRounded ? 12 : isPlaza ? 150 : 0,

      borderBottomLeftRadius: isSmallRounded ? 12 : isCollectorVault ? 150 : 0,
      borderBottomRightRadius: isSmallRounded ? 12 : isCollectorVault ? 150 : 0,

      overflow: 'hidden' as 'hidden', // Fix TypeScript error
    };
  };

  return (
    <View style={styles.mainView}>
      {/* Top Video Section */}
      <View style={[styles.videoContainer, getContainerStyle(topTitle)]}>
        <TouchableOpacity
          style={[
            topTitle === 'Plaza' ? styles.plaza : styles.frequencyBaazaar,
          ]}
          onPress={onTopPress}
        >
          {topTitle === 'Plaza' && (
            <Image source={icon.play} style={styles.playIcon} />
          )}

          <Text style={styles.mainContainerText}>{topTitle}</Text>
        </TouchableOpacity>
        <FastImage source={themeUrl} style={styles.video} resizeMode='cover' />
      </View>

      {/* Dynamic Child Content */}
      <View
        style={[
          styles.midContainer,
          {
            height: children
              ? 'auto'
              : topTitle === 'Frequency Baazaar' || bottomTitle === 'Galleria'
              ? 15
              : 10,
          },
        ]}
      >
        {children}
      </View>

      {/* Bottom Video Section */}
      <View style={[styles.videoContainer, getContainerStyle(bottomTitle)]}>
        <TouchableOpacity
          style={[
            topTitle === "Collector's Vault" ? styles.plaza : styles.Galleria,
          ]}
          onPress={onBottomPress}
        >
          {bottomTitle === "Collector's Vault" && (
            <Image source={icon.play} style={styles.playIcon} />
          )}

          <Text style={[styles.mainContainerText]}>{bottomTitle}</Text>
        </TouchableOpacity>
        <FastImage source={themeUrl} style={styles.video} resizeMode='cover' />
      </View>
    </View>
  );
};

export default HomeVideo;

const styles = StyleSheet.create({
  mainView: {
    paddingTop: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  videoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  video: {
    width: '100%',
    height: '100%',
  },
  midContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  plaza: {
    position: 'absolute',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
    paddingVertical: 5,
  },
  playIcon: {
    width: 32,
    height: 32,
  },
  mainContainerText: {
    paddingTop: 10,
    fontSize: 18,
    fontFamily: PoppinsFonts.SemiBold,
    color: Colors.white,
    textAlign: 'center',
    width: 170,
  },
  frequencyBaazaar: {
    position: 'absolute',

    zIndex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingVertical: 5,
  },
  Galleria: {
    position: 'absolute',

    zIndex: 2,
    alignItems: 'center',
    justifyContent: 'center',

    width: '100%',

    paddingVertical: 5,
  },
});
