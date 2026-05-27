import { launchCameraAsync, launchImageLibraryAsync, requestCameraPermissionsAsync, requestMediaLibraryPermissionsAsync } from 'expo-image-picker';
import React, { useEffect, useState } from 'react';
import { Alert, View } from 'react-native';

/**
 * Image Picker Component that just opens the camera to capture a photo
 * @param setImage: The callback to set/save the photo by caller, needs the base54 string and the local_uri temp path
 * @returns 
 */
export const ImagePickerComponent = ({ setImage, library, close }: {
  setImage: (uri: string, base64?: string | null) => void;
  library: boolean;
  close: () => void;
}) => {
  const [local_uris, setLocalUri] = useState<string[]>([]);

  const openLibrary = async () => {
    const permissionResult = await requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert('Permission required', 'Permission to access the media library/camera is required.');
      return;
    }

    const result = await launchImageLibraryAsync({
      mediaTypes: ['images'],
      quality: 1,
      allowsEditing: true,
      aspect: [1, 1],
      base64: true,
      selectionLimit: 1,
      shape: 'oval',
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri, result.assets[0].base64);
      setLocalUri(prev => [...prev, result.assets[0].uri]);
    }
    close();
  };

  useEffect(() => {
    // cleanup
    return () => {
      for (const uri of local_uris) {
        URL.revokeObjectURL(uri)
      }
    }
  }, [local_uris]);

  useEffect(() => {
    if (library)
      openLibrary();
  }, [library])
  return <View />
};

export const CameraComponent = ({ setImage, camera, close }: {
  setImage: (uri: string, base64?: string | null) => void;
  camera: boolean;
  close: () => void;
}) => {
  const [local_uris, setLocalUri] = useState<string[]>([]);

  const openCamera = async () => {
    // No permissions request is necessary for launching the image library.
    // Manually request permissions for videos on iOS when `allowsEditing` is set to `false`
    // and `videoExportPreset` is `'Passthrough'` (the default), ideally before launching the picker
    // so the app users aren't surprised by a system dialog after picking a video.
    // See "Invoke permissions for videos" sub section for more details.
    const cameraPermissionResult = await requestCameraPermissionsAsync();

    if (!cameraPermissionResult.granted) {
      Alert.alert('Permission required', 'Permission to access the media library/camera is required.');
      return;
    }

    let result = await launchCameraAsync({
      mediaTypes: ['images'],
      quality: 1,
      allowsEditing: true,
      aspect: [1, 1],
      base64: true,
      selectionLimit: 1,
      shape: 'oval',
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri, result.assets[0].base64);
      setLocalUri(prev => [...prev, result.assets[0].uri]);
    }
    close();
  };

  useEffect(() => {
    // cleanup
    return () => {
      for (const uri of local_uris) {
        URL.revokeObjectURL(uri)
      }
    }
  }, [local_uris]);

  useEffect(() => {
    if (camera)
      openCamera();
  }, [camera]);

  return <View />
};

// export const SaveToMediaLibrary = ({ uri, saveToMedia, close }: {
//   uri: string;
//   saveToMedia: boolean;
//   close: () => void;
// }) => {
//   const save = async (uri: string) => {
//     const mediaPermission = await MediaLibrary.requestPermissionsAsync(false, ["photo"]);

//     if (!mediaPermission.granted) {
//       Alert.alert('Permission required', 'Permission to access the media library/camera is required.');
//       return;
//     }

//     const result = await MediaLibrary.saveToLibraryAsync(uri);  // result is none mostly
//     close();
//   }

//   useEffect(() => {
//     if (saveToMedia)
//       save(uri)
//   }, [saveToMedia]);

//   return <View />
// }