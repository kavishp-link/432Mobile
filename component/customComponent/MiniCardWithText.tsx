import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { PoppinsFonts } from "../../assets/fonts";
import { Colors } from "../../assets/colors/Colors";

const MiniCardWithText = ({ item }: any) => {
  return (
    <View style={styles.card}>
      <View style={styles.textContainer}>
        <Text style={styles.title} numberOfLines={2} allowFontScaling={false}>
          {item.title}
        </Text>
        <Text
          style={styles.subtitle}
          numberOfLines={2}
          allowFontScaling={false}
        >
          {item.subtitle}
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
    width: "42%",
    height: 200,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
  textContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    paddingHorizontal: 10,
  },
  title: {
    color: Colors.white,
    fontSize: 18,
    fontFamily: PoppinsFonts.SemiBold,
    textAlign: "center",
  },
  subtitle: {
    color: "#aaa",
    fontSize: 15,
    fontFamily: PoppinsFonts.Regular,
    textAlign: "center",
    marginTop: 5,
  },
});

export default MiniCardWithText;
