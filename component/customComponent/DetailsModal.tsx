import React, { useCallback, useState } from 'react';
import {
  Modal,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  Text,
} from 'react-native';
import { icon } from '../../assets/images/Image';
import { Colors } from '../../assets/colors/Colors';
import { PoppinsFonts } from '../../assets/fonts';
import SwipeButton from 'rn-swipe-button';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../assets/types/Types';
interface DetailsModalProps {
  visible: boolean;
  onClose?: () => void;
  setModalVisible: any;
}

export const DetailsModal: React.FC<DetailsModalProps> = ({
  visible,
  onClose,
  setModalVisible,
}) => {
  const [finishSwipeAnimDuration, setFinishSwipeAnimDuration] = useState(400);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  let forceResetLastButton: any;
  let forceCompleteCallback: any;

  const forceCompleteButtonCallback = useCallback(() => {
    setFinishSwipeAnimDuration(0);
    if (forceCompleteCallback) {
      forceCompleteCallback();
    }
  }, []);

  const forceResetButtonCallback = useCallback(() => {
    if (forceResetLastButton) {
      forceResetLastButton();
    }
    setTimeout(() => setFinishSwipeAnimDuration(400), 1000);
  }, []);

  return (
    <Modal
      transparent
      visible={visible}
      animationType='none'
      onRequestClose={onClose} // Handles back button on Android
    >
      <TouchableOpacity
        style={styles.overlay}
        onPress={onClose} // Close modal when clicking outside
      >
        <View style={styles.detailsContainer}>
          <Image source={icon.spaceImageShip} style={styles.imageStyle} />
          <View style={styles.detailsView}>
            <Text style={styles.text1}>22:22 mins</Text>
            <Text style={styles.text2}>Distant Galaxy</Text>
            <SwipeButton
              disableResetOnTap
              forceReset={(reset: any) => {
                forceResetLastButton = reset;
              }}
              finishRemainingSwipeAnimationDuration={finishSwipeAnimDuration}
              forceCompleteSwipe={(forceComplete: any) => {
                forceCompleteCallback = forceComplete;
              }}
              railBackgroundColor='#3B3B3B'
              railStyles={{
                backgroundColor: '#00AF6D',
              }}
              railBorderColor='transparent'
              railFillBorderColor='transparent'
              thumbIconBackgroundColor={Colors.white}
              thumbIconBorderColor='transparent'
              title='Collect'
              titleColor={Colors.white}
              titleStyles={{
                fontSize: 16,
                fontFamily: PoppinsFonts.SemiBold,
              }}
              thumbIconComponent={() => (
                <Image
                  source={icon.blackswipe}
                  style={{ width: 18, height: 18, resizeMode: 'contain' }}
                />
              )}
            />
            <TouchableOpacity
              style={styles.moreDetails}
              onPress={() => {
                setModalVisible(false);
                navigation.navigate('Details', {
                  data: {
                    price: '1.6 ETH',
                    time: '22:22',
                    vaults: '888',
                    text: 'Distant Galaxy',
                    image: icon.spaceImageShip,
                  },
                });
              }}
            >
              <Text style={styles.moreDetailsText}>more details</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  detailsContainer: {
    width: 315,
    backgroundColor: '#1F1F1F',
    borderRadius: 15,
  },
  imageStyle: {
    height: 238,
    width: '100%',
    borderTopEndRadius: 15,
    borderTopStartRadius: 15,
  },
  detailsView: {
    padding: 20,
  },
  text1: {
    color: Colors.BattleshipGray,
    fontSize: 12,
    fontFamily: PoppinsFonts.Regular,
    marginLeft: 5,
  },
  text2: {
    marginLeft: 5,

    color: Colors.white,
    fontSize: 22,
    marginVertical: 10,
    fontFamily: PoppinsFonts.SemiBold,
  },
  moreDetails: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 8,
  },
  moreDetailsText: {
    textDecorationLine: 'underline',
    fontSize: 12,
    fontFamily: PoppinsFonts.Regular,
    color: Colors.BattleshipGray,
  },
});

export default DetailsModal;
