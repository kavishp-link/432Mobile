import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Pressable,
  Image,
  Platform,
} from 'react-native';
import { Colors } from '../../assets/colors/Colors';
import { PoppinsFonts } from '../../assets/fonts';
import { icon } from '../../assets/images/Image';

interface propsInterface {
  midText?: any;
  onRightLogPress?: any;
  onLeftPress: any;
  isBackButton: any;
  backButtonColor?: any;
  rightIcon?: any;
  textViewStyle?: any;
}

export const TopBar = (props: propsInterface) => {
  const {
    midText,
    onRightLogPress,
    onLeftPress,
    isBackButton,
    backButtonColor,
    rightIcon,
    textViewStyle,
  } = props;

  return (
    <View style={[styles.container]}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {isBackButton && (
          <TouchableOpacity
            onPress={onLeftPress}
            style={{
              width: 42,
              height: 42,
              borderColor: Colors.borderColor,
              borderRadius: 21,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Image source={icon.backButton} style={{ height: 24, width: 20 }} />
          </TouchableOpacity>
        )}
        <View
          style={[
            {
              // width: 150,
              // height: 47,
              alignItems: 'center',
              justifyContent: 'center',
              marginHorizontal: 10,
            },
            textViewStyle,
          ]}
        >
          {midText && (
            <Text style={styles.text} allowFontScaling={false}>
              {midText}
            </Text>
          )}
        </View>
      </View>

      <View
        style={{
          width: 60,
          height: 28,
          justifyContent: 'center',
        }}
      >
        {rightIcon && (
          <TouchableOpacity
            onPress={onRightLogPress}
            style={{ width: 27, height: 27 }}
          >
            <Ionicons name='add' size={27} color={Colors.white} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 16,
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.borderColor,
    paddingTop: Platform.OS === 'ios' ? 0 : 25,
  },
  text: {
    fontSize: 16,
    color: Colors.white,
    fontFamily: PoppinsFonts.Bold,
    textAlign: 'center',
  },
});
