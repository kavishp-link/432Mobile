import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { PoppinsFonts } from "../../assets/fonts";
import { Colors } from "../../assets/colors/Colors";
import { icon } from "../../assets/images/Image";

interface GalleryCardProps {
  imageUrl: any;
  title: string;
  author: string;
  collectiblesCount: number;
  onPress: any;
  isDisable?: boolean;
}

export const GalleriaCard: React.FC<GalleryCardProps> = ({
  imageUrl,
  title,
  author,
  collectiblesCount,
  onPress,
  isDisable,
}) => {
  return (
    <TouchableOpacity
      style={styles.card}
      disabled={isDisable}
      onPress={onPress}
    >
      <Image source={imageUrl} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={3}>
          {title}
        </Text>
        <View style={styles.authorContainer}>
          <Image source={icon.userAvatar} style={styles.avatar} />
          <Text style={styles.author} numberOfLines={2}>
            {author}
          </Text>
        </View>
        <Text style={styles.collectibles}>
          {collectiblesCount} collectibles
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#1F1F1F",
    borderRadius: 20,
    padding: 15,
    marginBottom: 12,
    alignItems: "center",
    justifyContent: "space-around",
  },
  image: {
    width: 147,
    height: 137,
    borderRadius: 20,
  },
  content: {
    flex: 1,
    marginLeft: 25,
  },
  title: {
    color: Colors.white,
    fontSize: 18,
    fontFamily: PoppinsFonts.Bold,
  },
  authorContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
    paddingRight: 20,
  },
  avatar: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 6,
  },
  author: {
    color: Colors.white,
    fontSize: 14,
    fontFamily: PoppinsFonts.Medium,
    marginVertical: 10,
  },
  collectibles: {
    color: "#858584",
    fontSize: 12,
    marginTop: 4,
    fontFamily: PoppinsFonts.Regular,
  },
});
