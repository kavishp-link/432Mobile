import { Dimensions, KeyboardTypeOptions } from "react-native";
import { UserDetails } from "../../assets/types/Types";
import { icon } from "../../assets/images/Image";
export const ScreenWidth = Dimensions.get("screen").width;
export const ScreenHeight = Dimensions.get("screen").height;

export const inputFields: {
  key: any;
  placeholder: string;
  keyboardType?: KeyboardTypeOptions;
  type?: "text";
  options?: string[]; // For dropdown fields
}[] = [
  {
    key: "portfolio",
    placeholder: "Portfolio (Link)",
    keyboardType: "url",
  },
  {
    key: "bio",
    placeholder: "in one word what does music mean to you?",
    keyboardType: "default",
  },
];

export const ProfileType = [
  { label: "Connoisseur", value: "Connoisseur" },
  { label: "Artist", value: "Artist" },
];
export const SocialLinkIcon = [
  { key: "facebook", icon: icon.facebook },
  { key: "instagram", icon: icon.instagram },
  { key: "twitter", icon: icon.twitter },
  { key: "linkdin", icon: icon.linkdin },
];

export const cardMockData = [
  {
    id: "1",
    title: "Distant Galaxy",
    subtitle: "Collection",
    image: icon.spaceImageShip,
  },
  {
    id: "2",
    title: "Artmet",
    subtitle: "Collection",
    image: icon.spaceImageShip,
  },
  {
    id: "3",
    title: "Spiritual",
    subtitle: "Collection",
    image: icon.spaceImageShip,
  },
  {
    id: "4",
    title: "Lounge House",
    subtitle: "Collection",
    image: icon.spaceImageShip,
  },
];

export const galleriaMockData = [
  {
    id: "1",
    title: "I Don’t Know You, But I Love You",
    author: "Shubhi Shukla",
    collectiblesCount: 11,
    imageUrl: icon.spaceImageShip,
  },
  {
    id: "2",
    title: "I Don’t Know You, But I Love You",
    author: "Shubhi Shukla",
    collectiblesCount: 11,
    imageUrl: icon.spaceImageShip,
  },
  {
    id: "3",
    title: "I Don’t Know You, But I Love You",
    author: "Shubhi Shukla",
    collectiblesCount: 11,
    imageUrl: icon.spaceImageShip,
  },
];

export const galleriaCardMockData = [
  {
    id: "1",
    time: "22:22 mins",
    title: "Distant Galaxy",
    user: {
      name: "Animakid",
      avatar: "https://fastly.picsum.photos/id/1025/50/50.jpg?hmac=abcd1234", // Replace with actual avatar URL
    },
    price: "1.63 ETH",
    vaults: "888 vaults",
    image: "https://fastly.picsum.photos/id/1035/200/200.jpg?hmac=xyz5678", // Replace with actual image URL
  },
  {
    id: "2",
    time: "18:45 mins",
    title: "Galactic Waves",
    user: {
      name: "Animakid",
      avatar: "https://fastly.picsum.photos/id/1005/50/50.jpg?hmac=wxyz7890", // Replace with actual avatar URL
    },
    price: "2.5 ETH",
    vaults: "650 vaults",
    image: "https://fastly.picsum.photos/id/1050/200/200.jpg?hmac=abcd5678", // Replace with actual image URL
  },
];
