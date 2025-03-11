// components/CollectionCard.js
import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { PoppinsFonts } from "../../assets/fonts";
import { Colors } from "../../assets/colors/Colors";

const MiniCardWithImage = ({ item, onPress }: any) => {
  return (
    <View style={styles.card}>
      <TouchableOpacity onPress={onPress} style={styles.image}>
        <Image source={item.image} style={styles.image} />
      </TouchableOpacity>
      <View
        style={{
          padding: 10,
          alignSelf: "flex-start",
        }}
      >
        <Text style={styles.title} numberOfLines={2} allowFontScaling={false}>
          {item.title}
        </Text>
        <Text
          style={styles.subtitle}
          numberOfLines={2}
          allowFontScaling={false}
        >
          {item.subtitle}{" "}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#1F1F1F",
    borderRadius: 10,
    marginBottom: 15,
    width: "45%",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 123,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  title: {
    color: Colors.white,
    fontSize: 16,
    fontFamily: PoppinsFonts.SemiBold,
    textAlign: "left",
  },
  subtitle: {
    color: "#aaa",
    fontSize: 12,
    fontFamily: PoppinsFonts.Regular,
    textAlign: "left",
    marginVertical: 5,
  },
});

export default MiniCardWithImage;
