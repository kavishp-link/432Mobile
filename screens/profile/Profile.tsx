import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useRef, useState } from "react";
import Container from "../../component/customComponent/Container";
import { HeaderProfile } from "../../component/customComponent/HeaderProfile";
import { icon } from "../../assets/images/Image";
import HomeVideo from "../../component/customComponent/HomeVideo";
import { ScreenWidth, themeImage } from "../../component/helper/Helper";
import { PoppinsFonts } from "../../assets/fonts";
import { Colors } from "../../assets/colors/Colors";
import BottomSheet from "../../component/customComponent/BottomSheet";
import { RootStackParamList, ThemeItem } from "../../assets/types/Types";
import { useDispatch, useSelector } from "react-redux";
import {
  getGlobalStoreState,
  globalStoreActions,
} from "../../redux/globalStore";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { clear } from "../../component/helper/storage";

const cardSize = ScreenWidth / 3 - 40;
const cardSizeHeight = ScreenWidth / 3 - 25;
export const Profile = () => {
  const refRBSheet = useRef<any>();
  const dispatch = useDispatch<any>();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const settingsOptions = [
    {
      title: "Personal Details",
      onPress: () => navigation.navigate("PersonalDetails"),
    },
    {
      title: "Account Security & Privacy",
      onPress: () => console.log("Account Security & Privacy Pressed"),
    },
    {
      title: "Theme",
      onPress: () => refRBSheet.current.open(),
      icon: icon.rightdrop,
      themeIcon: icon.themeIcon,
    },
    {
      title: "Logout",
      onPress: async () => {
        await clear();
        navigation.navigate("Login");
      },

      themeIcon: icon.logout,
    },
  ];
  const handleThemeSelect = (url: string) => {
    dispatch(globalStoreActions.setTheme(url));
  };

  const GridItem: React.FC<{
    item: ThemeItem;
    onSelect: (url: any) => void;
  }> = ({ item, onSelect }) => {
    return (
      <TouchableOpacity
        style={[styles.card, { width: cardSize, height: cardSizeHeight }]}
        onPress={() => {
          refRBSheet.current.close();
          navigation.navigate("ThemePreview", { url: item.url });
        }}
      >
        <Image source={icon.themepen} style={styles.themePen} />
        <Image
          source={
            typeof item.icon === "string" ? { uri: item.icon } : item.icon
          }
          style={{
            borderRadius: 10,
            width: cardSize,
            height: cardSize * 1.15,
          }}
        />
      </TouchableOpacity>
    );
  };

  return (
    <Container bottomTexts={["it's", "your", "world"]}>
      <View style={styles.mainHeader}>
        <HeaderProfile avatar={icon.userAvatar} />
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
                      flexDirection: "row",
                      justifyContent: "space-between",
                      width: "90%",
                      alignItems: "center",
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

        <FlatList
          data={themeImage}
          scrollEnabled={false}
          renderItem={({ item }) => (
            <GridItem item={item} onSelect={handleThemeSelect} />
          )}
          keyExtractor={(item) => item.id}
          numColumns={3}
          contentContainerStyle={styles.bottomSheetContainerStyle}
        />
      </BottomSheet>
    </Container>
  );
};

const styles = StyleSheet.create({
  mainHeader: {
    paddingVertical: 15,
  },
  profileDetails: {
    flex: 1,
    alignContent: "center",
  },
  container: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    width: ScreenWidth - 100,
  },
  option: {
    borderBottomWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    borderBottomColor: Colors.grayBroder,
    justifyContent: "space-between",
    paddingVertical: 12,
  },
  optionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  text: {
    fontSize: 16,
    fontFamily: PoppinsFonts.Regular,
    color: Colors.white,
  },
  directoryText: {
    fontSize: 12,
    color: "gray",
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
    justifyContent: "center",
    alignItems: "center",
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
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    elevation: 3,
  },
  cardText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  cardView: {
    justifyContent: "center",
    // alignItems: 'center',
    width: ScreenWidth,
    // paddingHorizontal: 25,
  },
  themePen: {
    position: "absolute",
    zIndex: 2,
    width: 26,
    height: 27,
  },
  bottomSheetContainerStyle: {
    flex: 1,

    alignItems: "center",
  },
});
