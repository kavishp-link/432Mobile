import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Container from '../../component/customComponent/Container';

const Profile = () => {
  return (
    <Container bottomTexts={["it's", 'your', 'world']}>
      <View></View>
    </Container>
  );
};

export default Profile;

const styles = StyleSheet.create({});
