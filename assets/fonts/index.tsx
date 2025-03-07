// import { useFonts } from 'expo-font';

// export const useFontInit = () => {
//   const [fontsLoaded] = useFonts({
//     PoppinsBlack: require('./Poppins-Black.ttf'),
//     PoppinsRegular: require('./Poppins-Regular.ttf'),
//     PoppinsSemiBold: require('./Poppins-SemiBold.ttf'),
//     PoppinsBold: require('./Poppins-Bold.ttf'),
//     PoppinsThin: require('./Poppins-Thin.ttf'),
//     PoppinsMedium: require('./Poppins-Medium.ttf'),
//   });

//   return fontsLoaded;
// };
import * as Font from 'expo-font';

export const initFonts = async () => {
  await Font.loadAsync({
    'Poppins-Black': require('./Poppins-Black.ttf'),
    'Poppins-Regular': require('./Poppins-Regular.ttf'),
    'Poppins-SemiBold': require('./Poppins-SemiBold.ttf'),
    'Poppins-Bold': require('./Poppins-Bold.ttf'),
    'Poppins-Thin': require('./Poppins-Thin.ttf'),
    'Poppins-Medium': require('./Poppins-Medium.ttf'),
  });
};

export enum PoppinsFonts {
  Black = 'Poppins-Black',
  Regular = 'Poppins-Regular',
  SemiBold = 'Poppins-SemiBold',
  Bold = 'Poppins-Bold',
  Thin = 'Poppins-Thin',
  Medium = 'Poppins-Medium',
}
