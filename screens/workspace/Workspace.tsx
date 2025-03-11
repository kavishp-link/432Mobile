import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { TopBar } from "../../component/customComponent/TopBar";
import Container from "../../component/customComponent/Container";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { cardMockData, insightsData } from "../../component/helper/Helper";
import { icon } from "../../assets/images/Image";
import { HeaderProfile } from "../../component/customComponent/HeaderProfile";
import { PoppinsFonts } from "../../assets/fonts";
import { Colors } from "../../assets/colors/Colors";
import { RootStackParamList } from "../../assets/types/Types";
import MiniCardWithImage from "../../component/customComponent/MiniCardWithImage";
import MiniCardWithText from "../../component/customComponent/MiniCardWithText";

export const WorkspaceScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  return (
    <Container bottomTexts={["assembly", "of the", "people"]}>
      <TopBar
        midText={"Workspace"}
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

      <Text style={styles.sectionTitle}>Insights</Text>
      <View style={styles.divider} />

      <FlatList
        data={insightsData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <MiniCardWithText
            item={item}
            onPress={() => {
              navigation.navigate("Galleria");
            }}
          />
        )}
        numColumns={2}
        columnWrapperStyle={styles.row}
      />
    </Container>
  );
};

const styles = StyleSheet.create({
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
    fontFamily: PoppinsFonts.SemiBold,
    textAlign: "center",
  },
  row: {
    justifyContent: "space-around",
    marginHorizontal: 20,
  },
  divider: {
    width: "100%",
    height: 1,
    backgroundColor: Colors.borderColor,
    marginVertical: 10,
  },
});
