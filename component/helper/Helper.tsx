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
    key: 'Location',
    placeholder: 'Location',
    keyboardType: 'default',
  },
  {
    key: 'portfolio',
    placeholder: 'Portfolio (Link)',
    keyboardType: 'url',
  },
  {
    key: 'bio',
    placeholder: 'in one word what does music mean to you?',
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
    time: '22:22 mins',
    title: 'Distant Galaxy',
    user: {
      name: 'Animakid',
      avatar: 'https://fastly.picsum.photos/id/1025/50/50.jpg?hmac=abcd1234', // Replace with actual avatar URL
    },
    price: '1.63 ETH',
    vaults: '888 vaults',
    image: 'https://fastly.picsum.photos/id/1035/200/200.jpg?hmac=xyz5678', // Replace with actual image URL
  },
  {
    id: '2',
    time: '18:45 mins',
    title: 'Galactic Waves',
    user: {
      name: 'Animakid',
      avatar: 'https://fastly.picsum.photos/id/1005/50/50.jpg?hmac=wxyz7890', // Replace with actual avatar URL
    },
    price: '2.5 ETH',
    vaults: '650 vaults',
    image: 'https://fastly.picsum.photos/id/1050/200/200.jpg?hmac=abcd5678', // Replace with actual image URL
  },
];
export const themeImage = [
  { id: '1', icon: icon.theme1, url: '' },
  { id: '2', icon: icon.theme2, url: '' },
  { id: '3', icon: icon.theme3, url: '' },
  { id: '4', icon: icon.theme4, url: '' },
  { id: '5', icon: icon.theme5, url: '' },
  { id: '6', icon: icon.theme6, url: '' },
  { id: '7', icon: icon.theme7, url: '' },
  { id: '8', icon: icon.theme8, url: '' },
  { id: '9', icon: icon.theme9, url: '' },
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
