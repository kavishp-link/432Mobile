import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { PoppinsFonts } from '../../assets/fonts';
import { Colors } from '../../assets/colors/Colors';

export const HeaderProfile = ({
  avatar,
  username,
  name,
  score,
  scoreLabel,
}: any) => {
  return (
    <View style={styles.header}>
      <View
        style={{
          flexDirection: 'row',
          //   alignItems: "center",
        }}
      >
        <Image source={avatar} style={styles.avatar} />
        <View>
          <Text style={styles.username}>{username}</Text>
          <Text style={styles.name}>{name}</Text>
        </View>
      </View>

      <View style={styles.scoreContainer}>
        <Text style={styles.score}>{score}</Text>
        <Text style={styles.scoreLabel}>{scoreLabel}</Text>
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
    fontWeight: 'bold',
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
