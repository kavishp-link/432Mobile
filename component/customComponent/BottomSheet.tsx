import { StyleSheet, View } from 'react-native';
import React from 'react';
import { Colors } from '../../assets/colors/Colors';
import RBSheet from 'react-native-raw-bottom-sheet';

const BottomSheet = (props: any) => {
  return (
    <RBSheet
      ref={props.refRBSheet}
      useNativeDriver={false}
      draggable
      customStyles={{
        wrapper: {
          backgroundColor: 'transparent',
        },
        draggableIcon: {
          backgroundColor: Colors.white,
          width: 55,
          marginTop: 15,
        },
        container: {
          backgroundColor: '#1F1F1F',
          borderTopLeftRadius: 40,
          borderTopRightRadius: 40,
        },
      }}
      customModalProps={{
        animationType: 'slide',
        statusBarTranslucent: true,
      }}
      customAvoidingViewProps={{
        enabled: false,
      }}
      height={550}
    >
      {props.children}
    </RBSheet>
  );
};

export default BottomSheet;

const styles = StyleSheet.create({});
