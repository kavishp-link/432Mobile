import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { PoppinsFonts } from '../../assets/fonts';
import { Colors } from '../../assets/colors/Colors';
import { getAuthStoreState } from '../../redux/authStore';
import { useSelector } from 'react-redux';

interface HeaderProfileProps {
  avatar?: any;
  username?: string;
  name?: string;
  score?: number | string;
  scoreLabel?: string;
}

export const HeaderProfile: React.FC<HeaderProfileProps> = ({ avatar }) => {
  const { userDetails } = useSelector((rootState) =>
    getAuthStoreState(rootState)
  );
  return (
    <View style={styles.header}>
      <View style={{ flexDirection: 'row' }}>
        {avatar && <Image source={avatar} style={styles.avatar} />}
        <View>
          <Text style={styles.username}>Hey, You</Text>
          <Text style={styles.name}>{userDetails?.user?.name}</Text>
        </View>
      </View>

      <View style={styles.scoreContainer}>
        <Text style={styles.score}>432</Text>
        <Text style={styles.scoreLabel}>
          {userDetails?.userProfile?.profileType}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 35,
  },
  avatar: {
    width: 59,
    height: 59,
    borderRadius: 25,
    marginRight: 15,
  },
  username: {
    color: Colors.BattleshipGray,
    fontSize: 16,
    fontFamily: PoppinsFonts.Regular,
  },
  name: {
    color: '#fff',
    fontSize: 18,
    fontFamily: PoppinsFonts.SemiBold,
  },
  scoreContainer: {
    alignItems: 'center',
  },
  score: {
    color: Colors.white,
    fontSize: 35,

    fontFamily: PoppinsFonts.Bold,
    letterSpacing: 10,
  },
  scoreLabel: {
    color: Colors.white,
    fontSize: 12,
    fontFamily: PoppinsFonts.Light,
    letterSpacing: 4,
  },
});
