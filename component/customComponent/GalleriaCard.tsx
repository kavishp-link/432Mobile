import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { PoppinsFonts } from '../../assets/fonts';
import { Colors } from '../../assets/colors/Colors';
import { icon } from '../../assets/images/Image';
import { DetailsModal } from './DetailsModal';

interface GalleryCardProps {
  imageUrl: any;
  title: string;
  author: string;
  collectiblesCount?: number;
  price?: string;
  vaults?: number;
  time?: string;
  onPress?: () => void;
  isDisable?: boolean;
  prevPage?: string;
}

export const GalleriaCard: React.FC<GalleryCardProps> = ({
  imageUrl,
  title,
  author,
  collectiblesCount,
  price,
  vaults,
  time,
  onPress,
  isDisable,
  prevPage,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const onCardPress = () => {
    setModalVisible(true);
  };
  const closeModal = () => {
    setModalVisible(false);
  };
  return (
    <>
      <TouchableOpacity
        style={styles.card}
        disabled={isDisable}
        onPress={prevPage === 'Galleria' ? onPress : onCardPress}
      >
        <Image source={imageUrl} style={styles.image} />
        <View style={styles.content}>
          {time && (
            <Text style={styles.time} numberOfLines={2}>
              {time}
            </Text>
          )}
          <Text style={styles.title} numberOfLines={2}>
            {title}
          </Text>
          <View style={styles.authorContainer}>
            <Image source={icon.userAvatar} style={styles.avatar} />
            <Text style={styles.author} numberOfLines={1}>
              {author}
            </Text>
          </View>
          {collectiblesCount !== undefined ? (
            <Text style={styles.collectibles}>
              {collectiblesCount} collectibles
            </Text>
          ) : (
            <View style={{ marginVertical: 10 }}>
              {price && (
                <>
                  <Text
                    style={{
                      fontFamily: PoppinsFonts.Regular,
                      color: Colors.BattleshipGray,
                      marginVertical: 2,
                    }}
                    numberOfLines={2}
                  >
                    Price
                  </Text>
                  <Text style={styles.price} numberOfLines={2}>
                    {price} ETH
                  </Text>
                </>
              )}
              {vaults !== undefined && (
                <Text style={styles.vaults}>in {vaults} vaults</Text>
              )}
            </View>
          )}
        </View>
      </TouchableOpacity>
      <DetailsModal
        visible={modalVisible}
        onClose={closeModal}
        setModalVisible={setModalVisible}
      />
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#1F1F1F',
    borderRadius: 20,
    padding: 15,
    marginBottom: 12,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  image: {
    width: 147,
    height: 147,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  content: {
    flex: 1,
    marginLeft: 20,
  },
  time: {
    color: '#858584',
    fontSize: 12,
    fontFamily: PoppinsFonts.Regular,
    marginBottom: 2,
  },
  title: {
    color: Colors.white,
    fontSize: 18,
    fontFamily: PoppinsFonts.Bold,
  },
  authorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  avatar: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 6,
  },
  author: {
    color: Colors.white,
    fontSize: 14,
    fontFamily: PoppinsFonts.Medium,
  },
  collectibles: {
    color: '#858584',
    fontSize: 12,
    marginVertical: 4,
    fontFamily: PoppinsFonts.Regular,
  },
  price: {
    color: Colors.white,
    fontSize: 16,
    fontFamily: PoppinsFonts.SemiBold,
    marginBottom: 5,
  },
  vaults: {
    color: Colors.BattleshipGray,
    fontSize: 12,
    fontFamily: PoppinsFonts.Regular,
  },
});
