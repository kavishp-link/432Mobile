import {
  Alert,
  Image,
  Linking,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Colors } from "../../assets/colors/Colors";
import { StatusBar } from "expo-status-bar";
import { icon } from "../../assets/images/Image";
import { ScreenHeight, ScreenWidth } from "../../component/helper/Helper";
import { PoppinsFonts } from "../../assets/fonts";
import Container from "../../component/customComponent/Container";
import HomeVideo from "../../component/customComponent/HomeVideo";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../assets/types/Types";
import { useDispatch, useSelector } from "react-redux";
import { authStoreActions, getAuthStoreState } from "../../redux/authStore";
import { clear, load } from "../../component/helper/storage";
import { getUserByTokenApi } from "../../utils/api";
import { Ionicons } from "@expo/vector-icons";
import FastImage from "react-native-fast-image";

export const Home = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { userDetails } = useSelector((rootState) =>
    getAuthStoreState(rootState)
  );

  const themeBottomTopPress = () => {
    navigation.navigate("Plaza");
  };

  const themeBottomButtonPress = async () => {
    if (userDetails?.userProfile?.profileType === "artist") {
      navigation.navigate("Studio");
    } else {
      navigation.navigate("CollectorsVault");
    }
  };

  const bottomTitleForVideoComponent =
    userDetails?.userProfile?.profileType === "artist"
      ? "Studio"
      : "Collector's Vault";
  console.log("userDetails---->>", userDetails);

  return (
    <Container bottomTexts={["we", "are", "the", "collective"]}>
      <StatusBar style="light" />
      <View style={styles.container}>
        <View style={styles.mainHeading}>
          {userDetails?.userProfile?.profileType === "artist" ? (
            <Image source={icon.artist432} style={styles.homeIcon} />
          ) : (
            <Image source={icon.Home432} style={styles.homeIcon} />
          )}
        </View>

        <TouchableOpacity
          style={styles.userIcon}
          onPress={() => navigation.navigate("Profile")}
        >
          <View style={styles.circle}>
            <View style={styles.halfBlack} />
          </View>
          {userDetails?.userProfile?.profileUrl ? (
            <FastImage
              source={{ uri: userDetails?.userProfile?.profileUrl }}
              style={[styles.userImage, { borderRadius: 38 }]}
            />
          ) : (
            <FastImage source={icon.Avatar} style={styles.userImage} />
          )}
        </TouchableOpacity>

        <View style={styles.mainHeadingText}>
          <Text style={styles.txet1}>Hey, You</Text>
          <Text style={styles.txet2}>{userDetails?.user.name}</Text>
        </View>
        <HomeVideo
          topTitle="Plaza"
          bottomTitle={bottomTitleForVideoComponent}
          onTopPress={themeBottomTopPress}
          onBottomPress={themeBottomButtonPress}
        />
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.black,
  },
  container: { justifyContent: "center", alignItems: "center" },
  mainHeading: {
    justifyContent: "flex-end",
    alignItems: "center",
    height: Platform.OS === "ios" ? ScreenHeight * 0.16 : ScreenHeight * 0.2,
    paddingBottom: 20,

    width: ScreenWidth,
  },
  homeIcon: {
    width: 132,
    height: 72,
  },
  mainHeadingText: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
  },
  userIcon: {
    marginTop: 10,
    width: 100,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.white,
    borderRadius: 55,
  },
  userImage: {
    position: "absolute",
    width: 76,
    height: 76,
  },
  circle: {
    width: 90,
    height: 90,
    borderRadius: 50,
    backgroundColor: "transparent",
    overflow: "hidden", // Hide the overflowing black part
  },
  halfBlack: {
    position: "absolute",
    width: "50%",
    height: "100%",
    backgroundColor: "black",
    left: 0, // Covers half of the circle
  },
  txet1: {
    color: Colors.BattleshipGray,
    fontFamily: PoppinsFonts.Regular,
    fontSize: 16,
  },
  txet2: {
    color: Colors.white,
    fontFamily: PoppinsFonts.SemiBold,
    fontSize: 22,
  },
});
