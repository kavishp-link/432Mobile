import React, { ReactNode } from "react";
import { SafeAreaView, StyleSheet, View, Text } from "react-native";
import { PoppinsFonts } from "../../assets/fonts";

interface ContainerProps {
  children: ReactNode;
  bottomTexts?: string[];
}

const Container: React.FC<ContainerProps> = ({
  children,
  bottomTexts = [],
}) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>{children}</View>
      {bottomTexts.length > 0 && (
        <View style={styles.bottomContainer}>
          {bottomTexts.map((text, index) => (
            <Text key={index} style={styles.bottomText}>
              {text}
            </Text>
          ))}
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#14161A",
  },
  container: {
    flex: 1,
  },
  bottomContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 20,
    marginHorizontal: 20,
  },
  bottomText: {
    color: "#fff",
    fontSize: 14,
    fontFamily: PoppinsFonts.Regular,
    letterSpacing: 4,
  },
});

export default Container;
