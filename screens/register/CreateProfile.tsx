import {
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

export const CreateProfile = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const refRBSheet = useRef<any>();
  const [userDetails, setUserDetails] = useState<any>({
    profileType: '',
    location: '',
    portfolioLink: '',
    musicInOneWord: '',
    facebookLink: '',
    instagramLink: '',
    twitterLink: '',
    linkedinLink: '',
  });

  const handleChange = (key: any, value: string) => {
    console.log('key', key);

    setUserDetails((prev: any) => ({
      ...prev,
      [key]: value,
    }));
  };
  const handleChangeSocialLink = (key: any, value: string) => {
    setUserDetails((prev: any) => ({
      ...prev,
      [key]: value,
    }));
  };
  const handleSave = () => {
    const updatedDetails = { ...userDetails };
    let invalidFields: string[] = [];

    // Friendly field labels for alert
    const fieldLabels: { [key: string]: string } = {
      facebookLink: 'Facebook',
      instagramLink: 'Instagram',
      twitterLink: 'Twitter',
      linkedinLink: 'LinkedIn',
    };

    // Updated regex patterns
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
      const value = userDetails[key]?.trim();

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
      setUserDetails(updatedDetails);
      return;
    }

    // Save the valid data
    setUserDetails(updatedDetails);
    refRBSheet.current.close();
  };
  // const renderItem = (item: { label: string; value: string }) => {
  //   const isSelected = userDetails?.profileType === item.value; // Check if item is selected

  //   return (
  //     <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
  //       <Text
  //         style={{
  //           flex: 1,
  //           color: Colors.black,
  //           fontFamily: PoppinsFonts.Regular,
  //         }}
  //       >
  //         {item.label}
  //       </Text>
  //       {isSelected && (
  //         <Ionicons name='checkmark' size={20} color={Colors.BattleshipGray} />
  //       )}
  //     </View>
  //   );
  // };
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
              onChange={(item) => handleChange('profileType', item.label)}
              data={ProfileType}
              search={false}
              value={userDetails?.profileType} // Ensure this updates
              labelField='label'
              valueField='value'
              activeColor='transparent'
              placeholder='Profile Type'
              // renderItem={renderItem}
            />
          </View>
          {inputFields?.map(
            ({ key, placeholder, keyboardType, type, options }) => (
              <View key={key} style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  keyboardType={keyboardType}
                  placeholder={placeholder}
                  value={userDetails[key]}
                  onChangeText={(text) => handleChange(key, text)}
                />
              </View>
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
          <TouchableOpacity style={styles.SubmitButton} onPress={() => {}}>
            <Text style={styles.SubmitText}>Submit</Text>
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
                value={userDetails[key]}
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
    height: 500,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 40,
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
  linkText: {},
});
