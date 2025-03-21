import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import Container from '../../component/customComponent/Container';
import { TopBar } from '../../component/customComponent/TopBar';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../assets/types/Types';
import { HeaderProfile } from '../../component/customComponent/HeaderProfile';
import { icon } from '../../assets/images/Image';
import { Colors } from '../../assets/colors/Colors';
import { PoppinsFonts } from '../../assets/fonts';

export const Studio = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const handleWorkspacePress = () => {
    navigation.navigate('WorkspaceScreen');
    // Add navigation or functionality here
  };

  const handleScheduleLaunchPress = () => {
    navigation.navigate('ScheduleLaunch');
    // Add navigation or functionality here
  };
  return (
    <Container>
      <TopBar
        isBackButton={true}
        onLeftPress={() => navigation.goBack()}
        midText={'Studio'}
      />
      <View style={styles.mainContainer}>
        <HeaderProfile avatar={icon.Avatar} />
      </View>

      {/* Circle & Lines */}
      <View style={styles.container}>
        {/* Top Line */}
        <View style={styles.verticalLineTop} />

        {/* Circle */}
        <View style={styles.circle}>
          <View
            style={{
              height: 120,
              alignItems: 'center',
              justifyContent: 'flex-end',
            }}
          >
            <TouchableOpacity onPress={handleWorkspacePress}>
              <Text style={styles.text}>Workspace</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.horizontalLine} />

          <View
            style={{
              height: 120,
              alignItems: 'center',
              justifyContent: 'flex-start',
            }}
          >
            <TouchableOpacity onPress={handleScheduleLaunchPress}>
              <Text style={styles.text}>Schedule{'\n'}Launch</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Bottom Line */}
        <View style={styles.verticalLineBottom} />
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    paddingTop: 15,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    width: 280, // Adjust size as needed
    height: 280, // Adjust size as needed
    borderRadius: 140, // Makes it a circle
    borderWidth: 2,
    borderColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  verticalLineTop: {
    width: 2,
    height: 150, // Adjust length
    backgroundColor: Colors.white,
    position: 'absolute',
    top: Platform.OS === 'ios' ? 60 : 65,
  },
  verticalLineBottom: {
    width: 2,
    height: 150, // Adjust length
    backgroundColor: Colors.white,
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 60 : 65,
  },
  horizontalLine: {
    width: '60%', // Covers most of the circle
    height: 1,
    backgroundColor: Colors.white,
    marginVertical: 20, // Spacing between text
  },
  text: {
    color: Colors.white,
    fontSize: 18,
    paddingVertical: 10,
    fontFamily: PoppinsFonts.SemiBold,
    textAlign: 'center',
  },
});

export default Studio;
