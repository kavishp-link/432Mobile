import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Container from '../../component/customComponent/Container';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../assets/types/Types';
import { TopBar } from '../../component/customComponent/TopBar';
import { HeaderProfile } from '../../component/customComponent/HeaderProfile';
import { icon } from '../../assets/images/Image';
import { ScreenWidth } from '../../component/helper/Helper';
import { PoppinsFonts } from '../../assets/fonts';
import { Colors } from '../../assets/colors/Colors';

export const Details = ({ route }: any) => {
  const { data } = route?.params;
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  console.log('data', data);

  return (
    <Container bottomTexts={['art', 'is', 'wealth']}>
      <TopBar
        isBackButton={true}
        onLeftPress={() => navigation.goBack()}
        midText={'Back'}
      />
      <View style={styles.mainContainer}>
        <HeaderProfile
          avatar={icon.userAvatar}
          username='Hey, You'
          name='Agora'
          score='432'
          scoreLabel='connoisseur'
        />
        <Image source={data.image} style={styles.imageStyle} />
        <View style={styles.headingView}>
          <Text style={styles.mainText}>{data.text}</Text>
          <Text style={styles.mainText2}>{data.time} mins</Text>
        </View>
        <View style={styles.headingView}>
          <View>
            <Text>Price</Text>
            <Text>{data.price}</Text>
          </View>
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

    backgroundColor: 'red',
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
});
