import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Container from '../../component/customComponent/Container';
import { TopBar } from '../../component/customComponent/TopBar';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../assets/types/Types';
import { HeaderProfile } from '../../component/customComponent/HeaderProfile';
import { icon } from '../../assets/images/Image';
import HomeVideo from '../../component/customComponent/HomeVideo';

export const Plaza = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const FrequencyBaazaar = () => {
    navigation.navigate('FrequencyBaazaar');
  };
  const Galleria = () => {
    navigation.navigate('Galleria');
  };
  return (
    <Container bottomTexts={['art', 'is', 'wealth']}>
      <TopBar
        isBackButton={true}
        onLeftPress={() => navigation.goBack()}
        midText={'Plaza'}
      />
      <View style={styles.headerView}>
        <HeaderProfile
          avatar={icon.userAvatar}
          username='Hey, You'
          name='Agora'
          score='432'
          scoreLabel='connoisseur'
        />
      </View>
      <View>
        <HomeVideo
          topTitle='Frequency Baazaar'
          bottomTitle='Galleria'
          onTopPress={FrequencyBaazaar}
          onBottomPress={Galleria}
        />
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  headerView: {
    paddingTop: 15,
  },
});
