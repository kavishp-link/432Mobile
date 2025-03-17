import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Container from '../../component/customComponent/Container';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../assets/types/Types';
import { TopBar } from '../../component/customComponent/TopBar';

export const Details = ({ route }: any) => {
  const { data } = route?.params;
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  return (
    <Container bottomTexts={['art', 'is', 'wealth']}>
      <TopBar
        isBackButton={true}
        onLeftPress={() => navigation.goBack()}
        midText={'Back'}
      />
    </Container>
  );
};

const styles = StyleSheet.create({});
