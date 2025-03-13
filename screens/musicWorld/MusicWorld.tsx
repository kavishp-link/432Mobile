import { FlatList, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Container from '../../component/customComponent/Container';
import { TopBar } from '../../component/customComponent/TopBar';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../assets/types/Types';
import MiniCardWithImage from '../../component/customComponent/MiniCardWithImage';
import { musicMockData } from '../../component/helper/Helper';
export const MusicWorld = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  return (
    <Container>
      <TopBar
        isBackButton={true}
        onLeftPress={() => navigation.goBack()}
        midText={'Music Worldwide'}
      />
      <View style={styles.mainContainer}>
        <FlatList
          data={musicMockData}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <MiniCardWithImage
              item={item}
              onPress={() => {
                navigation.navigate('Galleria');
              }}
            />
          )}
          numColumns={2}
          columnWrapperStyle={styles.row}
        />
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingTop: 20,
  },
  row: {
    justifyContent: 'space-between',
    marginHorizontal: 20,
  },
});
