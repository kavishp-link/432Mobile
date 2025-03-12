import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useRef } from 'react';
import Container from '../../component/customComponent/Container';
import { TopBar } from '../../component/customComponent/TopBar';
import { HeaderProfile } from '../../component/customComponent/HeaderProfile';
import HomeVideo from '../../component/customComponent/HomeVideo';
import { icon } from '../../assets/images/Image';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../assets/types/Types';
import { Carousel } from '../../component/customComponent/CarousalItem';
import Video, { VideoRef } from 'react-native-video';
import { ScreenWidth } from '../../component/helper/Helper';
import { Colors } from '../../assets/colors/Colors';
import { PoppinsFonts } from '../../assets/fonts';

export const FrequencyBaazaar = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const background = require('../../assets/demo.mp4');
  const videoRef = useRef<VideoRef>(null);
  return (
    <Container bottomTexts={['art', 'is', 'wealth']}>
      <TopBar
        isBackButton={true}
        onLeftPress={() => navigation.goBack()}
        midText={'Frequency Baazaar'}
      />
      <View style={styles.headerView}>
        <HeaderProfile
          avatar={icon.userAvatar}
          username='Hey, You'
          name='Agora'
          score='432'
          scoreLabel='connoisseur'
        />
        <View style={styles.tabContainer}>
          <TouchableOpacity>
            <Text style={styles.tabText}>Genres</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.tabText}>Music Worldwide</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.carouselMainView}>
        <Text style={styles.carouselText}>Recommendations for You</Text>

        <Carousel />
        <Text style={styles.exploreMarket}>Explore the Market</Text>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  headerView: {
    paddingTop: 15,
  },
  carouselView: {
    position: 'absolute',
  },
  carouselMainView: {
    borderBottomWidth: 0.5,
    borderTopWidth: 0.5,
    borderBottomColor: '#3B3B3B',
    paddingVertical: 10,
    borderTopColor: '#3B3B3B',
  },
  tabContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    width: '80%',
    alignSelf: 'center',
    paddingHorizontal: 20,
    paddingTop: 25,
    paddingBottom: 15,
  },
  tabText: {
    fontFamily: PoppinsFonts.SemiBold,
    fontSize: 16,
    color: Colors.white,
  },
  carouselText: {
    fontFamily: PoppinsFonts.Regular,
    fontSize: 15,
    color: Colors.white,

    paddingBottom: 10,
    paddingLeft: 25,
    paddingTop: 10,
  },
  exploreMarket: {
    fontFamily: PoppinsFonts.Regular,
    fontSize: 15,
    color: Colors.white,

    alignSelf: 'center',
  },
});
