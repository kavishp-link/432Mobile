import { Dimensions, KeyboardTypeOptions } from 'react-native';
import { UserDetails } from '../../assets/types/Types';
import { icon } from '../../assets/images/Image';
export const ScreenWidth = Dimensions.get('screen').width;
export const ScreenHeight = Dimensions.get('screen').height;

export const inputFields: {
  key: any;
  placeholder: string;
  keyboardType?: KeyboardTypeOptions;
  type?: 'text';
  options?: string[]; // For dropdown fields
}[] = [
  {
    key: 'location',
    placeholder: 'Location',
    keyboardType: 'default',
  },
  {
    key: 'portfolioLink',
    placeholder: 'Portfolio (Link)',
    keyboardType: 'url',
  },
  {
    key: 'musicInOneWord',
    placeholder: 'in one word what does music mean to you?',
    keyboardType: 'default',
  },
];
export const socialFields: {
  key: any;
  placeholder: string;
  keyboardType?: KeyboardTypeOptions;
  type?: 'text';
  options?: string[]; // For dropdown fields
}[] = [
  {
    key: 'facebookLink',
    placeholder: 'Facebook',
    keyboardType: 'default',
  },
  {
    key: 'instagramLink',
    placeholder: 'Instagram',
    keyboardType: 'url',
  },
  {
    key: 'twitterLink',
    placeholder: 'Twitter',
    keyboardType: 'default',
  },
  {
    key: 'linkedinLin',
    placeholder: 'linkedin',
    keyboardType: 'default',
  },
];
export const ProfileType = [
  { label: 'Connoisseur', value: 'Connoisseur' },
  { label: 'Artist', value: 'Artist' },
];
export const SocialLinkIcon = [
  { key: 'facebook', icon: icon.facebook },
  { key: 'instagram', icon: icon.instagram },
  { key: 'twitter', icon: icon.twitter },
  { key: 'linkdin', icon: icon.linkdin },
];

export const cardMockData = [
  {
    id: '1',
    title: 'Distant Galaxy',
    subtitle: 'Collection',
    image: icon.spaceImageShip,
  },
  {
    id: '2',
    title: 'Artmet',
    subtitle: 'Collection',
    image: icon.spaceImageShip,
  },
  {
    id: '3',
    title: 'Spiritual',
    subtitle: 'Collection',
    image: icon.spaceImageShip,
  },
  {
    id: '4',
    title: 'Lounge House',
    subtitle: 'Collection',
    image: icon.spaceImageShip,
  },
];

export const galleriaMockData = [
  {
    id: '1',
    title: 'I Don’t Know You, But I Love You',
    author: 'Shubhi Shukla',
    collectiblesCount: 11,
    imageUrl: icon.spaceImageShip,
  },
  {
    id: '2',
    title: 'I Don’t Know You, But I Love You',
    author: 'Shubhi Shukla',
    collectiblesCount: 11,
    imageUrl: icon.spaceImageShip,
  },
  {
    id: '3',
    title: 'I Don’t Know You, But I Love You',
    author: 'Shubhi Shukla',
    collectiblesCount: 11,
    imageUrl: icon.spaceImageShip,
  },
];

export const galleriaCardMockData = [
  {
    id: '1',
    title: 'Distant Galaxy',
    author: 'Animakid',
    time: '22:22 mins',
    price: '1.63 ETH',
    vaults: 888,
    imageUrl: icon.spaceImageShip,
    avatar: icon.userAvatar,
  },
  {
    id: '2',
    title: 'Distant Galaxy',
    author: 'Animakid',
    time: '22:22 mins',
    price: '1.63 ETH',
    vaults: 888,
    imageUrl: icon.spaceImageShip,
    avatar: icon.userAvatar,
  },
  {
    id: '3',
    title: 'Distant Galaxy',
    author: 'Animakid',
    time: '22:22 mins',
    price: '1.63 ETH',
    vaults: 888,
    imageUrl: icon.spaceImageShip,
    avatar: icon.userAvatar,
  },
];
export const GifThemes = {
  gif1: require('../../assets/themeGif/Theme1.gif'),
  gif2: require('../../assets/themeGif/Theme2.gif'),
  gif3: require('../../assets/themeGif/Theme3.gif'),
  gif4: require('../../assets/themeGif/Theme4.gif'),
  gif5: require('../../assets/themeGif/Theme5.gif'),
  gif6: require('../../assets/themeGif/Theme6.gif'),
  gif7: require('../../assets/themeGif/Theme7.gif'),
  gif8: require('../../assets/themeGif/Theme8.gif'),
  gif9: require('../../assets/themeGif/Theme9.gif'),
};
export const themeImage = [
  { id: '1', icon: icon.theme1, url: GifThemes.gif1 },
  { id: '2', icon: icon.theme2, url: GifThemes.gif2 },
  { id: '3', icon: icon.theme3, url: GifThemes.gif3 },
  { id: '4', icon: icon.theme4, url: GifThemes.gif4 },
  { id: '5', icon: icon.theme5, url: GifThemes.gif5 },
  { id: '6', icon: icon.theme6, url: GifThemes.gif6 },
  { id: '7', icon: icon.theme7, url: GifThemes.gif7 },
  { id: '8', icon: icon.theme8, url: GifThemes.gif8 },
  { id: '9', icon: icon.theme9, url: GifThemes.gif9 },
];

export const insightsData = [
  {
    id: '1',
    title: 'Frequency baazar',
    subtitle: 'Recorded sets',
  },
  {
    id: '2',
    title: 'Galleria',
    subtitle: 'Digital art exhibitions',
  },
  {
    id: '3',
    title: 'Philosophy & more ',
    subtitle: 'Discussion',
  },
  {
    id: '4',
    title: 'Knowledge center',
    subtitle: 'Assets on blockchain',
  },
];

export const graphMockData = {
  performance: [
    { day: '1', value: 20 },
    { day: '5', value: 50 },
    { day: '10', value: 100 },
    { day: '15', value: 80 },
    { day: '20', value: 120 },
    { day: '25', value: 150 },
    { day: '30', value: 200 },
  ],
  royaltyGrowth: 22, // Percentage growth

  funnelData: [
    {
      name: 'Awareness',
      population: 100,
      color: '#50E3C2',
      legendFontColor: '#fff',
      legendFontSize: 12,
    },
    {
      name: 'Consideration',
      population: 85,
      color: '#38D1EE',
      legendFontColor: '#fff',
      legendFontSize: 12,
    },
    {
      name: 'Preference',
      population: 47,
      color: '#1A91DA',
      legendFontColor: '#fff',
      legendFontSize: 12,
    },
    {
      name: 'Conversion',
      population: 25,
      color: '#1473A2',
      legendFontColor: '#fff',
      legendFontSize: 12,
    },
    {
      name: 'Loyalty',
      population: 15,
      color: '#0F5277',
      legendFontColor: '#fff',
      legendFontSize: 12,
    },
  ],
};
export const genresMockData = [
  {
    id: '1',
    title: 'Hip Hop',
    subtitle: '1234 Artists',
    image: icon.image,
  },
  {
    id: '2',
    title: 'Jazz',
    subtitle: '1234 Artists',
    image: icon.image2,
  },
  {
    id: '3',
    title: 'Spiritual Techno',
    subtitle: '1234 Artists',
    image: icon.image3,
  },
  {
    id: '4',
    title: 'Lounge House',
    subtitle: '1234 Artists',
    image: icon.image4,
  },
  {
    id: '5',
    title: 'R&B',
    subtitle: '1234 Artists',
    image: icon.image5,
  },
  {
    id: '6',
    title: 'Other',
    subtitle: '1234 Artists',
    image: icon.image6,
  },
];

export const musicMockData = [
  {
    id: '1',
    title: 'United States',

    image: icon.city1,
  },
  {
    id: '2',
    title: 'India',

    image: icon.city2,
  },
  {
    id: '3',
    title: 'UAE',

    image: icon.city3,
  },
  {
    id: '4',
    title: 'Italy',

    image: icon.city4,
  },
  {
    id: '5',
    title: 'Indonesia',

    image: icon.city5,
  },
  {
    id: '6',
    title: 'France',

    image: icon.city6,
  },
];
export const sections = [
  'Performance History',
  'Muse of this Creation',
  'Listing Activity',
  'About Shubhi Shukla',
  'Details',
];
