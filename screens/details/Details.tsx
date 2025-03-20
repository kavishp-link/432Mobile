import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useCallback, useState } from 'react';
import Container from '../../component/customComponent/Container';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../assets/types/Types';
import { TopBar } from '../../component/customComponent/TopBar';
import { HeaderProfile } from '../../component/customComponent/HeaderProfile';
import { icon } from '../../assets/images/Image';
import { ScreenWidth, sections } from '../../component/helper/Helper';
import { PoppinsFonts } from '../../assets/fonts';
import { Colors } from '../../assets/colors/Colors';
import SwipeButton from 'rn-swipe-button';
import { Ionicons } from '@expo/vector-icons'; // For dropdown arrow icon
export const Details = ({ route }: any) => {
  const { data } = route?.params;
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [isSwiped, setIsSwiped] = useState(false);

  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [finishSwipeAnimDuration, setFinishSwipeAnimDuration] = useState(400);

  let forceCompleteCallback: any = null;
  let forceResetLastButton: any = null;

  const handleSwipeSuccess = useCallback(() => {
    setIsSwiped(true); // ✅ Change icon after swipe is complete
  }, []);

  const forceResetButtonCallback = useCallback(() => {
    if (forceResetLastButton) {
      forceResetLastButton();
    }
    setTimeout(() => setFinishSwipeAnimDuration(400), 1000);
    setIsSwiped(false); // ✅ Reset icon when resetting
  }, []);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };
  console.log('isSwiped', isSwiped);

  return (
    <Container bottomTexts={['art', 'is', 'wealth']}>
      <TopBar
        isBackButton={true}
        onLeftPress={() => navigation.goBack()}
        midText={'Back'}
      />
      <View style={styles.mainContainer}>
        <HeaderProfile avatar={icon.userAvatar} />
        <Image source={data.image} style={styles.imageStyle} />
        <View style={styles.headingView}>
          <Text style={styles.mainText}>{data.text}</Text>
          <Text style={styles.mainText2}>{data.time} mins</Text>
        </View>
        <View style={styles.headingView}>
          <View style={styles.secondHeadingView}>
            <Text style={styles.text1}>Price</Text>
            <Text style={styles.text2}>{data.price}</Text>
            <Text style={styles.text3}>in {data.vaults} vaults</Text>
          </View>
          <View>
            <SwipeButton
              disableResetOnTap
              forceReset={(reset: any) => {
                forceResetLastButton = reset;
              }}
              onSwipeSuccess={handleSwipeSuccess} // ✅ Set `isSwiped` to true when swipe completes
              onSwipeFail={forceResetButtonCallback}
              finishRemainingSwipeAnimationDuration={finishSwipeAnimDuration}
              forceCompleteSwipe={(forceComplete: any) => {
                //
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
                paddingLeft: 15,
                fontSize: 16,
                fontFamily: PoppinsFonts.SemiBold,
              }}
              width={150}
              height={46}
              thumbIconHeight={40}
              thumbIconWidth={46}
              thumbIconComponent={() => {
                return isSwiped ? (
                  <Ionicons name='checkmark' size={22} color={Colors.black} />
                ) : (
                  <Image
                    source={icon.blackswipe}
                    style={{ width: 18, height: 18, resizeMode: 'contain' }}
                  />
                );
              }}
            />
          </View>
        </View>

        <View style={styles.listContent}>
          <FlatList
            data={sections}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <View style={{ borderBottomWidth: 1, borderBottomColor: '#222' }}>
                <TouchableOpacity
                  onPress={() => toggleExpand(index)}
                  style={styles.listButton}
                >
                  <Text style={styles.listText}>{item}</Text>
                  <Ionicons
                    name={
                      expandedIndex === index ? 'chevron-up' : 'chevron-down'
                    }
                    size={24}
                    color={Colors.BattleshipGray}
                  />
                </TouchableOpacity>
                {expandedIndex === index && (
                  <View style={{ padding: 10 }}>
                    <Text style={{ color: '#ccc' }}>
                      Expanded content for {item}
                    </Text>
                  </View>
                )}
              </View>
            )}
          />
        </View>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    paddingTop: 15,
    flex: 1,
    // marginHorizontal: 10,
  },

  imageStyle: {
    width: ScreenWidth - 50,
    height: 230,
    resizeMode: 'cover',
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  headingView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    width: ScreenWidth,
  },
  mainText: {
    fontSize: 22,
    fontFamily: PoppinsFonts.SemiBold,
    color: Colors.white,
  },
  mainText2: {
    fontSize: 12,
    fontFamily: PoppinsFonts.Regular,
    color: Colors.BattleshipGray,
  },
  secondHeadingView: {},
  text1: {
    marginVertical: 10,
    fontSize: 14,
    color: Colors.BattleshipGray,
    fontFamily: PoppinsFonts.Regular,
  },
  text2: {
    marginBottom: 10,
    fontSize: 18,
    color: Colors.white,
    fontFamily: PoppinsFonts.SemiBold,
  },
  text3: {
    fontSize: 14,
    color: Colors.BattleshipGray,
    fontFamily: PoppinsFonts.Regular,
  },
  listContent: { flex: 1, padding: 16, paddingHorizontal: 30 },
  listButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
  },
  listText: {
    color: Colors.white,
    fontSize: 16,
    fontFamily: PoppinsFonts.Regular,
  },
});
