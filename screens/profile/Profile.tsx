import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useRef, useState } from 'react';
import Container from '../../component/customComponent/Container';
import { HeaderProfile } from '../../component/customComponent/HeaderProfile';
import { icon } from '../../assets/images/Image';
import HomeVideo from '../../component/customComponent/HomeVideo';
import { ScreenWidth, themeImage } from '../../component/helper/Helper';
import { PoppinsFonts } from '../../assets/fonts';
import { Colors } from '../../assets/colors/Colors';
import BottomSheet from '../../component/customComponent/BottomSheet';
import { ThemeItem } from '../../assets/types/Types';

const cardSize = ScreenWidth / 3 - 40;
const cardSizeHeight = ScreenWidth / 3 - 25;
export const Profile = () => {
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const refRBSheet = useRef<any>();
  const settingsOptions = [
    {
      title: 'Personal Details',
      onPress: () => console.log('Personal Details Pressed'),
    },
    {
      title: 'Account Security & Privacy',
      onPress: () => console.log('Account Security & Privacy Pressed'),
    },
    {
      title: 'Theme',
      onPress: () => refRBSheet.current.open(),
      icon: icon.rightdrop,
      themeIcon: icon.themeIcon,
    },
  ];

  const GridItem: React.FC<{
    item: ThemeItem;
    onSelect: (url: any) => void;
  }> = ({ item, onSelect }) => {
    return (
      <TouchableOpacity
        style={[styles.card, { width: cardSize, height: cardSizeHeight }]}
        onPress={() => onSelect(item.icon)}
      >
        <Image source={icon.themepen} style={styles.themePen} />
        <Image
          source={
            typeof item.icon === 'string' ? { uri: item.icon } : item.icon
          }
          style={{
            width: cardSize * 1.15,
            height: cardSize * 1.15,
            resizeMode: 'contain',
          }}
        />
      </TouchableOpacity>
    );
  };

  return (
    <Container bottomTexts={["it's", 'your', 'world']}>
      <View style={styles.mainHeader}>
        <HeaderProfile
          avatar={icon.userAvatar}
          username='Hey, You'
          name='Agora'
          score='432'
          scoreLabel='connoisseur'
        />
      </View>
      <HomeVideo>
        <View style={styles.container}>
          {/* First Item */}
          <View style={styles.option}>
            <TouchableOpacity onPress={settingsOptions[0].onPress}>
              <Text style={styles.text}>{settingsOptions[0].title}</Text>
            </TouchableOpacity>
          </View>

          {/* My Directory (Second Item) */}
          <View style={styles.option}>
            <Text style={styles.text}>My Directory</Text>
            <Text style={styles.directoryText}>Coming Soon</Text>
          </View>

          {/* Remaining Items from settingsOptions */}
          {settingsOptions.slice(1).map((item, index) => (
            <View key={index} style={styles.option}>
              <TouchableOpacity onPress={item.onPress}>
                <View style={styles.optionRow}>
                  {item.themeIcon && (
                    <Image source={item.themeIcon} style={styles.icon} />
                  )}
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      width: '90%',
                      alignItems: 'center',
                    }}
                  >
                    <Text style={styles.text}>{item.title}</Text>
                    {item.icon && (
                      <Image source={item.icon} style={styles.icon2} />
                    )}
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </HomeVideo>
      <BottomSheet refRBSheet={refRBSheet}>
        <View style={styles.themeHeader}>
          <Text style={styles.text1}>Theme</Text>
          <Text style={styles.text2}>How are you feeling?</Text>
        </View>
        <View style={styles.cardView}>
          <FlatList
            data={themeImage}
            renderItem={({ item }) => (
              <GridItem item={item} onSelect={setSelectedImage} />
            )}
            keyExtractor={(item) => item.id}
            numColumns={3}
            contentContainerStyle={styles.container}
          />
        </View>
      </BottomSheet>
    </Container>
  );
};

const styles = StyleSheet.create({
  mainHeader: {
    paddingVertical: 20,
  },
  profileDetails: {
    flex: 1,
    alignContent: 'center',
  },
  container: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    width: ScreenWidth - 100,
  },
  option: {
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: Colors.grayBroder,
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 16,
    fontFamily: PoppinsFonts.Regular,
    color: Colors.white,
  },
  directoryText: {
    fontSize: 12,
    color: 'gray',
    paddingVertical: 4,
  },
  icon: {
    width: 20,
    height: 20,
  },
  icon2: {
    width: 10,
    height: 16,
  },
  themeHeader: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
  },
  text1: {
    color: Colors.BattleshipGray,
    fontSize: 16,
  },
  text2: {
    color: Colors.white,
    fontSize: 16,
    fontFamily: PoppinsFonts.SemiBold,
  },
  card: {
    margin: 6,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    elevation: 3,
  },
  cardText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cardView: {
    justifyContent: 'center',
    // alignItems: 'center',
    width: ScreenWidth,
    paddingHorizontal: 25,
  },
  themePen: {
    position: 'absolute',
    zIndex: 2,
    width: 26,
    height: 27,
  },
});
