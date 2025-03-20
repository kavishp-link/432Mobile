import {
  ActivityIndicator,
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useRef, useState } from 'react';
import { PoppinsFonts } from '../../assets/fonts';
import {
  inputFields,
  ProfileType,
  ScreenWidth,
  socialFields,
  SocialLinkIcon,
} from '../../component/helper/Helper';
import { Colors } from '../../assets/colors/Colors';
import LoginAndRegisterCustom from '../../component/customComponent/LoginAndRegisterCustom';
import { RootStackParamList } from '../../assets/types/Types';
import { Dropdown } from 'react-native-element-dropdown';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import BottomSheet from '../../component/customComponent/BottomSheet';
import { Ionicons } from '@expo/vector-icons';
import { authStoreActions, getAuthStoreState } from '../../redux/authStore';
import { useDispatch, useSelector } from 'react-redux';
import { createProfileApi } from '../../utils/api';
import { clear, load, removeKeys, save } from '../../component/helper/storage';

export const CreateProfile = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const refRBSheet = useRef<any>();
  const [userProfileDetails, setUserProfileDetails] = useState<any>({
    profileType: '',
    location: '',
    portfolioLink: '',
    musicInOneWord: '',
    facebookLink: '',
    instagramLink: '',
    twitterLink: '',
    linkedinLink: '',
  });
  const [error, setError] = useState<any>({ profileType: '', location: '' });
  const [buttonLoader, setButtonLoader] = useState(false);

  const handleChange = (key: any, value: string) => {
    setUserProfileDetails((prev: any) => ({
      ...prev,
      [key]: value,
    }));
    setError((prevError: any) => ({ ...prevError, [key]: '' }));
  };

  const handleChangeSocialLink = (key: any, value: string) => {
    setUserProfileDetails((prev: any) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSave = () => {
    const updatedDetails = { ...userProfileDetails };
    let invalidFields: string[] = [];

    // Friendly field labels for alert
    const fieldLabels: { [key: string]: string } = {
      facebookLink: 'Facebook',
      instagramLink: 'Instagram',
      twitterLink: 'Twitter',
      linkedinLink: 'LinkedIn',
    };

    const urlPatterns: { [key: string]: RegExp } = {
      facebookLink:
        /^(https?:\/\/)?(www\.)?facebook\.com\/(profile\.php\?id=\d+|[a-zA-Z0-9_.-]+)(\/.*)?(\?.*)?$/,
      instagramLink:
        /^(https?:\/\/)?(www\.)?instagram\.com\/[a-zA-Z0-9_.-]+(\/.*)?(\?.*)?$/,
      twitterLink:
        /^(https?:\/\/)?(www\.)?twitter\.com\/[a-zA-Z0-9_.-]+(\/.*)?(\?.*)?$/,
      linkedinLink:
        /^(https?:\/\/)?(www\.)?linkedin\.com\/(in|company)\/[a-zA-Z0-9_-]+(\/.*)?(\?.*)?$/,
    };

    for (const { key } of socialFields) {
      const value = userProfileDetails[key]?.trim();

      if (value) {
        if (urlPatterns[key] && !urlPatterns[key].test(value)) {
          invalidFields.push(fieldLabels[key]); // Store readable field names
          updatedDetails[key] = ''; // Clear invalid field
        }
      } else {
        updatedDetails[key] = ''; // Set empty string if field is empty
      }
    }

    if (invalidFields.length > 0) {
      Alert.alert(
        'Invalid URL',
        `Please enter a valid ${invalidFields.join(', ')} URL${
          invalidFields.length > 1 ? 's' : ''
        }`
      );
      setUserProfileDetails(updatedDetails);
      return;
    }

    // Save the valid data
    setUserProfileDetails(updatedDetails);
    refRBSheet.current.close();
  };

  const handleSubmit = async () => {
    // await clear();
    let newError = { profileType: '', location: '' };
    let isValid = true;

    if (!userProfileDetails.profileType.trim()) {
      newError.profileType = 'Profile Type is required';
      isValid = false;
    }
    if (!userProfileDetails.location.trim()) {
      newError.location = 'Location is required';
      isValid = false;
    }

    setError(newError);

    if (isValid) {
      const currentUser: any = await load('currentUser');
      try {
        setButtonLoader(true);
        const createProRes = await createProfileApi(
          currentUser.user.accessToken,
          userProfileDetails
        );

        if (createProRes.status) {
          const filteredData = {
            user: removeKeys(createProRes.data.user, ['__v', 'password']),
            userProfile: removeKeys(createProRes.data.userProfile, [
              '__v',
              '_id',
            ]),
            ...{ isLoggedIn: true },
          };
          await save('currentUser', filteredData);
          dispatch(
            authStoreActions.setUserDetails({
              ...filteredData,
              ...{ isLoggedIn: true },
            })
          );
          setButtonLoader(false);
          navigation.navigate('Home');
        } else {
          setButtonLoader(false);
        }
      } catch (error) {
        setButtonLoader(false);
        console.log('Error createProfileApi--->>', error);
      } finally {
        setButtonLoader(false);
      }
    }
  };

  return (
    <LoginAndRegisterCustom>
      <View style={styles.mainContainer}>
        <View style={styles.container}>
          <Text style={styles.firstHeading}>Create New Profile</Text>
        </View>

        <View style={styles.secondContainer}>
          <View>
            <Dropdown
              style={styles.dropdown}
              selectedTextStyle={styles.selectedTextStyle}
              containerStyle={styles.containerStyle}
              itemTextStyle={styles.itemTextStyle}
              placeholderStyle={styles.placeholderStyle}
              onChange={(item) =>
                handleChange('profileType', item.label.toLowerCase())
              }
              data={ProfileType}
              search={false}
              value={userProfileDetails?.profileType}
              labelField='label'
              valueField='value'
              activeColor='transparent'
              placeholder='Profile Type'
              // renderItem={renderItem}
            />
            {error.profileType ? (
              <Text style={styles.errorText}>{error.profileType}</Text>
            ) : null}
          </View>
          {inputFields?.map(
            ({ key, placeholder, keyboardType, type, options }) => (
              <>
                <View key={key} style={styles.inputContainer}>
                  <TextInput
                    style={styles.input}
                    keyboardType={keyboardType}
                    placeholder={placeholder}
                    value={userProfileDetails[key]}
                    onChangeText={(text) => handleChange(key, text)}
                  />
                </View>
                {error[key] ? (
                  <Text style={styles.errorText}>{error[key]}</Text>
                ) : null}
              </>
            )
          )}
        </View>
        <View style={styles.socialContainer}>
          <View style={styles.socialTextView}>
            <Text style={styles.socialText}>Link socials:</Text>
          </View>
          <View style={styles.socialIconView}>
            {SocialLinkIcon.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => refRBSheet.current.open()}
              >
                <Image
                  source={item.icon}
                  style={[
                    styles.socialIcon,
                    index !== SocialLinkIcon.length - 1 && { marginRight: 10 }, // Add margin except for the last icon
                  ]}
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <View style={styles.SubmitContainer}>
          <TouchableOpacity
            style={styles.SubmitButton}
            onPress={() => {
              handleSubmit();
            }}
          >
            {buttonLoader ? (
              <ActivityIndicator size={'small'} color={Colors.black} />
            ) : (
              <Text style={styles.SubmitText}>Submit</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
      <BottomSheet
        refRBSheet={refRBSheet}
        bgColor={Colors.white}
        draggableColor={Colors.black}
        height={450}
      >
        <View style={styles.modalContainer}>
          {socialFields?.map(({ key, placeholder, keyboardType }) => (
            <View
              key={key}
              style={[styles.inputContainer, { width: '100%', height: 65 }]}
            >
              <Text
                style={{
                  marginBottom: 5,
                  marginLeft: 10,
                  fontFamily: PoppinsFonts.Medium,
                }}
              >
                {placeholder}
              </Text>
              <TextInput
                style={[
                  styles.input,
                  {
                    borderWidth: 0.5,
                    borderRadius: 40,
                    width: '100%',

                    borderColor: Colors.BattleshipGray,
                    paddingHorizontal: 15, // Padding for placeholder
                  },
                ]}
                keyboardType={keyboardType}
                placeholder={`Enter Your ${placeholder} Url`}
                value={userProfileDetails[key]}
                onChangeText={(text) => handleChangeSocialLink(key, text)}
              />
            </View>
          ))}

          <TouchableOpacity
            style={[
              styles.SubmitButton,
              {
                width: '95%',
                backgroundColor: Colors.black,
                marginTop: 20,
                alignSelf: 'center',
              },
            ]}
            onPress={handleSave}
          >
            <Text style={[styles.SubmitText, { color: Colors.white }]}>
              Save
            </Text>
          </TouchableOpacity>
        </View>
      </BottomSheet>
    </LoginAndRegisterCustom>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    paddingVertical: 30,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  firstHeading: {
    fontFamily: PoppinsFonts.Medium,
    fontSize: 28,
    color: Colors.white,
  },
  secondContainer: {
    paddingTop: 10,
  },
  inputContainer: {
    position: 'relative',
    height: 46,
    backgroundColor: Colors.white,

    borderRadius: 23,
    marginTop: 15,
    paddingHorizontal: 10,
    width: ScreenWidth - 140,
    justifyContent: 'center',
  },
  placeholderContainer: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    left: 20,
  },
  placeholderText: {
    color: '#BDBDBD',
    fontFamily: PoppinsFonts.Regular,
    fontSize: 12,
    marginLeft: 8,
    paddingRight: 20,
  },
  input: {
    flex: 1,
    paddingLeft: 10,

    fontFamily: PoppinsFonts.Regular,
    fontSize: 12,
    color: '#BDBDBD',
  },
  inputIconEmail: {
    height: 15,
    width: 18,
  },
  inputIcon: {
    height: 20,
    width: 20,
  },
  SubmitContainer: {
    paddingTop: 20,
  },
  SubmitButton: {
    width: ScreenWidth - 140,
    height: 46,
    backgroundColor: Colors.white,
    marginTop: 10,
    borderRadius: 23,
    alignItems: 'center',
    justifyContent: 'center',
  },
  SubmitText: {
    fontSize: 16,
    fontFamily: PoppinsFonts.SemiBold,
  },
  dropdown: {
    height: 46,
    backgroundColor: Colors.white,

    borderRadius: 23,
    marginTop: 15,
    paddingHorizontal: 10,
    width: ScreenWidth - 140,
    justifyContent: 'center',
  },
  placeholderStyle: {
    paddingLeft: 14,
    fontFamily: PoppinsFonts.Regular,
    fontSize: 12,
    color: '#BDBDBD',
  },
  itemContainerStyle: {},
  containerStyle: {
    borderRadius: 12,
  },
  itemTextStyle: {
    fontFamily: PoppinsFonts.Regular,
    fontSize: 14,
    color: '#BDBDBD',
  },
  selectedTextStyle: {
    paddingLeft: 14,
    fontFamily: PoppinsFonts.Regular,
    fontSize: 12,
    color: '#BDBDBD',
    backgroundColor: 'transparent',
  },
  socialContainer: {
    paddingTop: 20,
    paddingRight: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  socialTextView: {},
  socialText: {
    fontFamily: PoppinsFonts.Regular,
    fontSize: 16,
    color: Colors.white,
  },
  socialIconView: {
    flexDirection: 'row',

    width: 'auto',
  },
  socialIcon: {
    width: 32,
    height: 32,
  },
  modalContainer: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    backgroundColor: Colors.white,
  },
  modalContent: {
    width: ScreenWidth - 80,
    padding: 20,
    backgroundColor: Colors.white,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontFamily: PoppinsFonts.Medium,
    fontSize: 18,
    marginBottom: 10,
  },
  input1: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  cancelButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: 'red',
    borderRadius: 5,
    marginRight: 10,
  },
  saveButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: 'green',
    borderRadius: 5,
  },
  buttonText: {
    color: Colors.white,
    fontFamily: PoppinsFonts.Medium,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 3,
    paddingLeft: 15,
    textAlign: 'left',
  },
});
