import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useRef } from "react";

import Video, { VideoRef } from "react-native-video";
import { icon } from "../../assets/images/Image";
import { PoppinsFonts } from "../../assets/fonts";
import { Colors } from "../../assets/colors/Colors";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../assets/types/Types";

interface HomeVideoProps {
  children?: React.ReactNode;
}

const HomeVideo: React.FC<HomeVideoProps> = ({ children }) => {
  const videoRef = useRef<VideoRef>(null);
  const background = require("../../assets/demo.mp4");
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <View style={styles.mainView}>
      <View style={styles.videoTopContainer}>
        <TouchableOpacity style={styles.plaza}>
          <Image source={icon.play} style={styles.playIcon} />
          <Text style={styles.mainContainerTxet}>Plazz</Text>
        </TouchableOpacity>
        <Video
          source={background}
          ref={videoRef}
          repeat={true}
          style={styles.video}
          resizeMode="cover"
        />
      </View>

      {/* Dynamically adjust height based on children */}
      <View style={[styles.midContainer, { height: children ? "auto" : 10 }]}>
        {children}
      </View>

      <View style={styles.videoBottomContainer}>
        <TouchableOpacity
          style={styles.plaza}
          onPress={() => {
            navigation.navigate("CollectorsVault");
          }}
        >
          <Image source={icon.play} style={styles.playIcon} />
          <Text style={styles.mainContainerTxet2}>Collector's Vault</Text>
        </TouchableOpacity>
        <Video
          source={background}
          ref={videoRef}
          repeat={true}
          style={styles.video}
          resizeMode="cover"
        />
      </View>
    </View>
  );
};

export default HomeVideo;

const styles = StyleSheet.create({
  mainView: {
    paddingTop: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  videoTopContainer: {
    width: 300,
    height: 160,
    borderTopLeftRadius: 150,
    borderTopRightRadius: 150,
    overflow: "hidden",
  },
  videoBottomContainer: {
    width: 300,
    height: 160,
    borderBottomLeftRadius: 150,
    borderBottomRightRadius: 150,
    overflow: "hidden",
    position: "relative",
  },
  video: {
    width: "100%",
    height: "100%",
  },
  midContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  plaza: {
    position: "absolute",
    top: 35,
    left: "41%",
    zIndex: 2,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
  },
  playIcon: {
    width: 32,
    height: 32,
    left: 5,
  },
  mainContainerTxet: {
    paddingTop: 10,
    fontSize: 16,
    fontFamily: PoppinsFonts.SemiBold,
    color: Colors.white,
  },
  mainContainerTxet2: {
    paddingTop: 10,
    fontSize: 16,
    right: 45,
    fontFamily: PoppinsFonts.SemiBold,
    color: Colors.white,
  },
});
