// import React, { useRef, useState, useEffect } from 'react';
// import {
//   View,
//   FlatList,
//   Image,
//   Dimensions,
//   Animated,
//   TouchableOpacity,
//   Text,
// } from 'react-native';
// import { icon } from '../../assets/images/Image';
// import Video, { VideoRef } from 'react-native-video';
// import { ScreenWidth } from '../helper/Helper';

// const { width } = Dimensions.get('window');
// const CAROUSEL_DATA = [
//   { id: '1', image: icon.theme1 },
//   { id: '2', image: icon.theme2 },
//   { id: '3', image: icon.theme3 },
//   { id: '4', image: icon.theme4 },
// ];

// export const Carousel = () => {
//   const flatListRef = useRef<FlatList<any>>(null);
//   const scrollX = useRef(new Animated.Value(0)).current;
//   const [currentIndex, setCurrentIndex] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       if (flatListRef.current) {
//         let nextIndex = (currentIndex + 1) % CAROUSEL_DATA.length;
//         flatListRef.current.scrollToIndex({ index: nextIndex, animated: true });
//         setCurrentIndex(nextIndex);
//       }
//     }, 3000);
//     return () => clearInterval(interval);
//   }, [currentIndex]);
//   // Handles Next and Previous navigation
//   const goToNextItem = () => {
//     if (currentIndex < CAROUSEL_DATA.length - 1) {
//       flatListRef.current?.scrollToIndex({
//         index: currentIndex + 1,
//         animated: true,
//       });
//       setCurrentIndex(currentIndex + 1);
//     }
//   };

//   const goToPrevItem = () => {
//     if (currentIndex > 0) {
//       flatListRef.current?.scrollToIndex({
//         index: currentIndex - 1,
//         animated: true,
//       });
//       setCurrentIndex(currentIndex - 1);
//     }
//   };

//   return (
//     <View style={{ position: 'relative', alignItems: 'center' }}>
//       <View
//         style={{
//           width: '90%',
//           height: 200,
//           position: 'absolute',
//           top: 0,
//           left: 0,
//           marginHorizontal: 20,
//           borderRadius: 15, // Add border radius
//           overflow: 'hidden', // Ensures the radius applies properly
//         }}
//       >
//         <Video
//           source={require('../../assets/demo.mp4')} // Replace with your video file
//           repeat
//           resizeMode='cover'
//           style={{ width: '100%', height: '100%', borderRadius: 15 }} // Apply border radius
//         />
//       </View>
//       <TouchableOpacity
//         onPress={goToPrevItem}
//         style={{
//           position: 'absolute',
//           left: 10,
//           top: '43%',
//           transform: [{ translateY: -20 }],

//           paddingVertical: 15,
//           paddingHorizontal: 20,
//           borderRadius: 20,
//           zIndex: 10,
//         }}
//       >
//         <Image
//           source={icon.leftcarousal}
//           style={{
//             width: 26,
//             height: 26,
//           }}
//         />
//       </TouchableOpacity>

//       <TouchableOpacity
//         onPress={goToNextItem}
//         style={{
//           position: 'absolute',
//           right: 10,
//           top: '43%',
//           transform: [{ translateY: -20 }],

//           paddingVertical: 15,
//           paddingHorizontal: 20,
//           borderRadius: 20,
//           zIndex: 10,
//         }}
//       >
//         <Image
//           source={icon.rightcarousal}
//           style={{
//             width: 26,
//             height: 26,
//           }}
//         />
//       </TouchableOpacity>

//       {/* Carousel (Scrollable Images) */}
//       <FlatList
//         ref={flatListRef}
//         data={CAROUSEL_DATA}
//         horizontal
//         pagingEnabled
//         showsHorizontalScrollIndicator={false}
//         keyExtractor={(item) => item.id}
//         renderItem={({ item }) => (
//           <View style={{ width: width - 20, height: 210, marginHorizontal: 5 }}>
//             <Image
//               source={item.image}
//               style={{
//                 width: 190,
//                 height: 145,
//                 position: 'absolute',
//                 alignSelf: 'center',
//                 top: '50%',
//                 transform: [{ translateY: -75 }],
//                 borderRadius: 10,
//               }}
//             />
//           </View>
//         )}
//         onMomentumScrollEnd={(event) => {
//           const index = Math.round(event.nativeEvent.contentOffset.x / width);
//           setCurrentIndex(index);
//         }}
//       />
//     </View>
//   );
// };
import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  FlatList,
  Image,
  Dimensions,
  Animated,
  TouchableOpacity,
} from 'react-native';
import { icon } from '../../assets/images/Image';
import Video from 'react-native-video';
import { getGlobalStoreState } from '../../redux/globalStore';
import { useSelector } from 'react-redux';
import FastImage from 'react-native-fast-image';

const { width } = Dimensions.get('window');

const CAROUSEL_DATA = [
  { id: '1', image: icon.spaceImageShip },
  { id: '2', image: icon.spaceImageShip },
  { id: '3', image: icon.spaceImageShip },
  { id: '4', image: icon.spaceImageShip },
];

export const Carousel = () => {
  const flatListRef = useRef<FlatList<any>>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { themeUrl } = useSelector((rootState) =>
    getGlobalStoreState(rootState)
  );
  useEffect(() => {
    const interval = setInterval(() => {
      let nextIndex = (currentIndex + 1) % CAROUSEL_DATA.length;
      flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
      setCurrentIndex(nextIndex);
    }, 3000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <View
      style={{ position: 'relative', alignItems: 'center', marginBottom: 15 }}
    >
      {/* Static Video Background */}
      <View
        style={{
          width: width * 0.9,
          height: 200,
          borderRadius: 15,
          overflow: 'hidden',
          position: 'relative',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <FastImage
          source={themeUrl} // Replace with your video file
          resizeMode='cover'
          style={{ width: '100%', height: '100%' }}
        />

        {/* Image Carousel inside Video View */}
        <View
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <FlatList
            ref={flatListRef}
            data={CAROUSEL_DATA}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={{
                  width: width * 0.9, // Match video width
                  height: 200, // Match video height
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Image
                  source={item.image}
                  style={{
                    width: 190,
                    height: 145,
                    borderRadius: 10,
                  }}
                />
              </TouchableOpacity>
            )}
            onMomentumScrollEnd={(event) => {
              const index = Math.round(
                event.nativeEvent.contentOffset.x / (width * 0.9)
              );
              setCurrentIndex(index);
            }}
          />
        </View>
      </View>

      {/* Navigation Buttons */}
      <TouchableOpacity
        onPress={() =>
          flatListRef.current?.scrollToIndex({
            index: Math.max(0, currentIndex - 1),
            animated: true,
          })
        }
        style={{
          position: 'absolute',
          left: 10,
          top: '40%',
          paddingVertical: 15,
          paddingHorizontal: 20,
          borderRadius: 20,
          zIndex: 10,
        }}
      >
        <Image source={icon.leftcarousal} style={{ width: 26, height: 26 }} />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() =>
          flatListRef.current?.scrollToIndex({
            index: Math.min(CAROUSEL_DATA.length - 1, currentIndex + 1),
            animated: true,
          })
        }
        style={{
          position: 'absolute',
          right: 10,
          top: '40%',
          paddingVertical: 15,
          paddingHorizontal: 20,
          borderRadius: 20,
          zIndex: 10,
        }}
      >
        <Image source={icon.rightcarousal} style={{ width: 26, height: 26 }} />
      </TouchableOpacity>
    </View>
  );
};
