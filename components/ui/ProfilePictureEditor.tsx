import { Colors } from "@/constants/theme";
import { usePerson } from "@/store/hooks";
import { addProfilePicture, removeProfilePicture } from "@/store/newpersonslice";
import { updatePerson } from "@/store/personslice";
import { useDispatch } from "@/store/store";
import { Directory, File, Paths } from 'expo-file-system';
import React, { useState } from 'react';
import { Text, TouchableOpacity, useColorScheme, View } from 'react-native';
import { IconSymbol } from "./icon-symbol";
import { CameraComponent, ImagePickerComponent } from "./ImagePickerComponent";
import ProfilePhoto from "./ProfilePhoto";

const saveBase64ToJpeg = async (base64String: string, fileName: string) => {
  // 1. Strip the data URL prefix if it exists (e.g., "data:image/jpeg;base64,")
  const base64Data = base64String.replace(/^data:image\/\w+;base64,/, "");

  // 2. Define the path where the image will be stored in the app's document directory
  const fileUri = `${Paths.document}${fileName}`;

  try {
    // 3. Write the base64 string to the file system as a binary file
    let file = new File(Paths.document, fileName);
    file.write(base64Data, { encoding: "base64" });

    console.log('Image saved successfully at:', fileUri);
    return fileUri;
  } catch (error) {
    console.error('Failed to save image:', error);
    throw error;
  }
};

/**
 * Allows option to open camera/gallery to select the profile picture
 * If already set, allows to remove it, and even move the photo to Gallery
 * 
 * When using the camera, the picture captured is stored in app document location
 * While base64 is stored with the filename key value in Async store. 
 * 
 * The app document location url is stored in Person's Media info.
 * 
 * In case of downloaded media from Server, this app will store the base64 encoding
 * instead, as uri is not available from server
 * 
 * @returns View for profile picture editing
 */
const ProfilePictureEditor = ({ personId }: {
  personId?: string;
}) => {
  const scheme = useColorScheme();
  const colors = Colors[scheme ?? 'light'];

  const [base64, setBase64] = useState<string>();
  const [uri, setUri] = useState<string>();
  const [cameraTrigger, triggerCamera] = useState<boolean>(false);
  const [mediaTrigger, triggerMedia] = useState<boolean>(false);
  const [saveTrigger, triggerSave] = useState<boolean>(false);

  const person = personId && usePerson(personId);

  const dispatch = useDispatch();

  // helper functions
  const setProfilePicture = (uri: string, base64?: string | null) => {
    // this assumes the uri is from app document location
    if (personId !== undefined && person) {
      person.photos.push({
        url: uri,
        primary: false
      });
      dispatch(updatePerson({ person }));
    }
    else {
      // set the same to newperson slice
      dispatch(addProfilePicture({ value: uri }));
    }

    setUri(uri);
  }

  const usePickedImage = async (uri: string, base64?: string | null) => {
    // move the file to app docs
    const permanentFile = new File(uri);

    const profilePicturesPath = new Directory(Paths.document, "profilepictures");
    if (!profilePicturesPath.exists) {
      profilePicturesPath.create({ idempotent: true });
    }

    permanentFile.move(profilePicturesPath);

    setProfilePicture(permanentFile.uri, base64);
  }

  const removeProfilePictureHelper = () => {
    if (personId !== undefined && person) {
      person.photos = [];
      dispatch(updatePerson({ person }));
    }
    else {
      dispatch(removeProfilePicture());
    }
    setUri(undefined);
  }

  return (
    <View className='w-10/12 items-center'>
      {uri && <ProfilePhoto uri={uri} />}
      {!uri && <IconSymbol name="person.crop.circle.badge.plus" color={colors.text} size={200} className="" />}
      <TouchableOpacity className="rounded-full bg-blue-200 p-4 my-2 items-center w-full"
        onPress={() => triggerCamera(prev => !prev)}
      >
        <Text>Open Camera</Text>
      </TouchableOpacity>
      <TouchableOpacity className="rounded-full bg-blue-200 p-4 my-2 items-center w-full"
        onPress={() => triggerMedia(prev => !prev)}
      >
        <Text>Open Gallery</Text>
      </TouchableOpacity>
      {/* {uri && <TouchableOpacity className="rounded-full bg-blue-200 p-4 my-2 items-center w-full"
          onPress={() => triggerSave(prev => !prev)}
        >
          <Text>Save to Gallery</Text>
        </TouchableOpacity>} */}
      <TouchableOpacity className="rounded-full bg-blue-200 p-4 my-2 items-center w-full"
        onPress={() => removeProfilePictureHelper()}
      >
        <Text>Remove</Text>
      </TouchableOpacity>
      <CameraComponent setImage={usePickedImage} camera={cameraTrigger} close={() => triggerCamera(false)} />
      <ImagePickerComponent setImage={usePickedImage} library={mediaTrigger} close={() => triggerMedia(false)} />
      {/* {uri && <SaveToMediaLibrary uri={uri} saveToMedia={saveTrigger} close={() => triggerSave(false)} />} */}
    </View>
  )
}

export default ProfilePictureEditor;