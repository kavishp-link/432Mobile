import {
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import { ScreenHeight, ScreenWidth } from '../../../component/helper/Helper';
import { Colors } from '../../../assets/colors/Colors';
import { PoppinsFonts } from '../../../assets/fonts';
import { Feather } from '@expo/vector-icons';
const { width, height } = Dimensions.get('window'); // Get full screen dimensions

const ScheduleLaunchSection = (props: any) => {
  const { item } = props;

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <TouchableOpacity
          onPress={() => console.log('Edit Pressed')}
          style={styles.editButton}
        >
          <Feather name='edit' size={20} color='white' />
        </TouchableOpacity>
        <View style={styles.containView}>
          {/* Music Image */}

          <Image source={item.musicImage} style={styles.image} />

          {/* Details Section */}
          <View style={styles.itemDetails}>
            <Text style={styles.timeText}>{item.musicTime}</Text>
            <Text style={styles.trackTitle}>{item.TrackTitle}</Text>

            {/* Heading for Description */}
            <Text style={styles.heading}>
              Describe Your Music in 1 Sentence:
            </Text>

            {/* Music Description */}
            <Text style={styles.description}>{item.descMusic1Line}</Text>

            <Text style={styles.launchDate}>
              {`Scheduled Launch:${'\n'}${item.LaunchDate}`}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ScheduleLaunchSection;

const styles = StyleSheet.create({
  container: {},
  card: {
    width: ScreenWidth - 30, // Make card full width
    height: 176, // Fixed height
    backgroundColor: '#1F1F1F',
    borderRadius: 12,
    marginVertical: 8,
    alignSelf: 'center',
  },
  containView: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  image: {
    height: 147,
    width: 137,
    borderRadius: 10,
  },
  itemDetails: {
    flex: 1,

    padding: 12,
    borderRadius: 8,
    marginLeft: 10,
  },
  timeText: {
    color: Colors.BattleshipGray,
    fontSize: 12,
    fontFamily: PoppinsFonts.Regular,
  },
  trackTitle: {
    color: Colors.white,
    fontSize: 16,
    fontFamily: PoppinsFonts.SemiBold,
    paddingBottom: 15,
  },
  heading: {
    color: Colors.white,
    fontSize: 12,
    fontFamily: PoppinsFonts.Regular,
  },
  description: {
    color: Colors.white,
    fontSize: 12,
    fontFamily: PoppinsFonts.Regular,
    paddingBottom: 15,
  },
  launchDate: {
    color: Colors.BattleshipGray,
    fontSize: 12,
    fontFamily: PoppinsFonts.Regular,
  },

  editButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1, // Ensure it's above other components
    // Increase touch area
    // Optional for visibility
    borderRadius: 10, // Optional for aesthetics
  },
});
