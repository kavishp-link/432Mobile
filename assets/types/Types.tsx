export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Register: undefined;
  CreateProfile: undefined;
  ForgetPassword: undefined;
  Profile: { userId: string };
  CollectorsVault: undefined;
};
export type UserDetails = {
  profileType: string;
  location: string;
  portfolio: string;
  bio: string;
};
