import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import Container from '../../component/customComponent/Container';
import { TopBar } from '../../component/customComponent/TopBar';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../assets/types/Types';
import { HeaderProfile } from '../../component/customComponent/HeaderProfile';
import { icon } from '../../assets/images/Image';
import { ScreenWidth } from '../../component/helper/Helper';
import { Colors } from '../../assets/colors/Colors';
import { PoppinsFonts } from '../../assets/fonts';
import ScheduleLaunchSection from './partials/ScheduleLaunchSection';

export const ScheduleLaunch = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [activeTab, setActiveTab] = useState<'Music' | 'Art'>('Music');
  const data = [
    {
      id: '1',
      musicTime: '22:22 mins',
      TrackTitle: "I don't let you",
      descMusic1Line: 'i love music',
      LaunchDate: '12/04/2025',
      musicImage: icon.city1,
    },
    {
      id: '2',
      musicTime: '20:22 mins',
      TrackTitle: 'I want you',
      descMusic1Line: 'i like music',
      LaunchDate: '12/05/2025',
      musicImage: icon.city2,
    },
    {
      id: '3',
      musicTime: '20:22 mins',
      TrackTitle: 'I want you',
      descMusic1Line: 'i like music',
      LaunchDate: '12/05/2025',
      musicImage: icon.city2,
    },
    {
      id: '4',
      musicTime: '20:22 mins',
      TrackTitle: 'I want you',
      descMusic1Line: 'i like music',
      LaunchDate: '12/05/2025',
      musicImage: icon.city2,
    },
  ];
  return (
    <Container>
      <TopBar
        isBackButton={true}
        rightIcon={true}
        onLeftPress={() => navigation.goBack()}
        midText={'Back'}
        onRightLogPress={() => navigation.navigate('UploadArtAndMusic')}
      />
      <View style={styles.mainContainer}>
        <HeaderProfile avatar={icon.Avatar} />
        <View style={styles.tabHeader}>
          <TouchableOpacity onPress={() => setActiveTab('Music')}>
            <Text
              style={[
                styles.text,
                {
                  color:
                    activeTab === 'Music'
                      ? Colors.white
                      : Colors.BattleshipGray,
                },
              ]}
            >
              Music
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setActiveTab('Art')}>
            <Text
              style={[
                styles.text,
                {
                  color:
                    activeTab === 'Art' ? Colors.white : Colors.BattleshipGray,
                },
              ]}
            >
              Art
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.border} />
        <View style={styles.section}>
          {activeTab === 'Music' ? (
            <FlatList
              data={data}
              scrollEnabled
              renderItem={({ item }) => <ScheduleLaunchSection item={item} />}
            />
          ) : (
            <></>
          )}
        </View>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    paddingTop: 15,
    flex: 1,
  },
  tabHeader: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: ScreenWidth - 100,
    alignSelf: 'center',
    paddingTop: 25,
    paddingBottom: 15,
  },
  border: {
    borderBottomWidth: 0.8,
    borderBottomColor: Colors.BattleshipGray,
  },
  text: {
    fontSize: 16,
    fontFamily: PoppinsFonts.SemiBold,
  },
  section: {
    // paddingBottom: 20,
    paddingTop: 10,
    flex: 1,
  },
});
