import {
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { TopBar } from "../../../component/customComponent/TopBar";
import Container from "../../../component/customComponent/Container";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { icon } from "../../../assets/images/Image";
import { HeaderProfile } from "../../../component/customComponent/HeaderProfile";
import { PoppinsFonts } from "../../../assets/fonts";
import { Colors } from "../../../assets/colors/Colors";
import { GalleriaCard } from "../../../component/customComponent/GalleriaCard";
import {
  cardMockData,
  galleriaMockData,
} from "../../../component/helper/Helper";
import { RootStackParamList } from "../../../assets/types/Types";

export const GalleriaCardDetails = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  return (
    <Container bottomTexts={["art", "is", "wealth"]}>
      <TopBar
        midText={"Shubhi Shukla"}
        onLeftPress={() => {
          navigation.goBack();
        }}
        isBackButton={true}
      />

      <View style={{ marginVertical: 20 }}>
        <HeaderProfile
          avatar={icon.userAvatar}
          username="Hey, You"
          name="Agora"
          score="432"
          scoreLabel="connoisseur"
        />
      </View>
      <ScrollView>
        <View style={styles.card}>
          <Image source={icon.spaceImageShip} style={styles.image} />
          <View
            style={{
              padding: 10,
              alignSelf: "flex-start",
            }}
          >
            <Text
              style={styles.title}
              numberOfLines={2}
              allowFontScaling={false}
            >
              I Don’t Know You, But I Love You
            </Text>
            <Text
              style={styles.subtitle}
              numberOfLines={2}
              allowFontScaling={false}
            >
              11 collectibles
            </Text>
          </View>
        </View>
        <Text style={styles.sectionTitle}>The sun and the moon</Text>
        <View style={styles.divider} />
        <FlatList
          data={galleriaMockData}
          scrollEnabled={false}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <GalleriaCard
              {...item}
              isDisable={false}
              onPress={() => {
                navigation.navigate("WorkspaceScreen");
              }}
            />
          )}
          contentContainerStyle={{ marginHorizontal: 20 }}
        />
      </ScrollView>
    </Container>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#1F1F1F",
    borderRadius: 10,
    marginBottom: 15,
    width: "90%",
    alignItems: "center",
    alignSelf: "center",
  },
  image: {
    width: "100%",
    height: 200,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  title: {
    color: Colors.white,
    fontSize: 22,
    fontFamily: PoppinsFonts.Bold,
    textAlign: "left",
    width: 205,
  },
  subtitle: {
    color: "#aaa",
    fontSize: 12,
    fontFamily: PoppinsFonts.Regular,
    textAlign: "left",
    marginVertical: 5,
  },
  container: {
    flex: 1,
    backgroundColor: "#121212",
    padding: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    marginBottom: 20,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  username: {
    color: "#aaa",
    fontSize: 14,
  },
  name: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  scoreContainer: {
    alignItems: "center",
  },
  score: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
  scoreLabel: {
    color: "#aaa",
    fontSize: 12,
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    // marginBottom: 10,
    fontFamily: PoppinsFonts.Regular,
    textAlign: "center",
  },
  row: {
    justifyContent: "space-between",
    marginHorizontal: 20,
  },
  divider: {
    width: "100%",
    height: 1,
    backgroundColor: Colors.borderColor,
    marginVertical: 10,
  },
});
