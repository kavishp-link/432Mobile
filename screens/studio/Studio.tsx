import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Container from '../../component/customComponent/Container';
import { TopBar } from '../../component/customComponent/TopBar';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../assets/types/Types';
import { HeaderProfile } from '../../component/customComponent/HeaderProfile';
import { icon } from '../../assets/images/Image';

export const Studio = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  return (
    <Container>
      <TopBar
        isBackButton={true}
        onLeftPress={() => navigation.goBack()}
        midText={'Studio'}
      />
      <View style={styles.mainContainer}>
        <HeaderProfile avatar={icon.Avatar} />
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    paddingTop: 15,
  },
});
