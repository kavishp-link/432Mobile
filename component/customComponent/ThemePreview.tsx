import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useRef } from 'react';
import Video, { VideoRef } from 'react-native-video';
import { useDispatch, useSelector } from 'react-redux';
import {
  getGlobalStoreState,
  globalStoreActions,
} from '../../redux/globalStore';
import { Colors } from '../../assets/colors/Colors';
import { ScreenHeight, ScreenWidth } from '../helper/Helper';
import { icon } from '../../assets/images/Image';
import { PoppinsFonts } from '../../assets/fonts';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../assets/types/Types';
import FastImage from 'react-native-fast-image';

const ThemePreview = ({ route }: any) => {
  const { url } = route?.params;
  console.log('oute?.params', route?.params);

  const videoRef = useRef<VideoRef>(null);
  const dispatch = useDispatch<any>();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  return (
    <>
      <View style={{ flex: 1 }}>
        <Image source={url} style={styles.video} resizeMode='cover' />
      </View>
      <View style={styles.bottomView}>
        <TouchableOpacity
          onPress={() => {
            dispatch(globalStoreActions.setTheme(url));
            navigation.goBack();
          }}
        >
          <FastImage source={icon.themeSelect} style={styles.selectButton} />
        </TouchableOpacity>
        <View style={styles.bottomText}>
          <Text style={styles.text}>art</Text>
          <Text style={styles.text}>is</Text>
          <Text style={styles.text}>wealth</Text>
        </View>
      </View>
    </>
  );
};

export default ThemePreview;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.black,
  },
  video: {
    width: '100%',
    height: ScreenHeight,
  },
  bottomView: {
    alignItems: 'center',

    height: 120,
    backgroundColor: 'rgba(20, 22, 26, 0.6)',
  },
  selectButton: {
    marginTop: 20,
    width: 41,
    height: 41,
  },
  bottomText: {
    width: ScreenWidth - 40,
    position: 'absolute',
    bottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    color: '#fff',
    fontSize: 10,
    fontFamily: PoppinsFonts.Regular,
    letterSpacing: 4,
  },
});
