import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Container from '../../../component/customComponent/Container';
import { TopBar } from '../../../component/customComponent/TopBar';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../../assets/types/Types';

export const UploadArtAndMusic = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  return (
    <Container>
      <TopBar
        isBackButton={true}
        rightIcon={true}
        onLeftPress={() => navigation.goBack()}
        midText={'Schedule Launch'}
      />
    </Container>
  );
};

const styles = StyleSheet.create({});
