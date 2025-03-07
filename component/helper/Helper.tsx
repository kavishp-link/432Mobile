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
