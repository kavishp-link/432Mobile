export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Register: undefined;
  CreateProfile: undefined;
  ForgetPassword: undefined;
  Profile: undefined;
  CollectorsVault: undefined;
  Galleria: undefined;
  GalleriaCardDetails: undefined;
  WorkspaceScreen: undefined;
  WorkspaceGraph: undefined;
  Plaza: undefined;
  FrequencyBaazaar: undefined;
};
export type UserDetails = {
  profileType: string;
  location: string;
  portfolio: string;
  bio: string;
};
export type ThemeItem = {
  id: string;
  icon: any; // Can be a require() or URI string
  url: string;
};
