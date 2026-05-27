import { Image } from "expo-image";
import React from 'react';
import { View } from 'react-native';

const ProfilePhoto = ({ uri }: {
  uri: string | undefined
}) => {
  return (
    <View className='w-fit h-fit border-2 border-red-50 overflow-hidden rounded-full'>
      <Image
        source={{ uri }}
        style={{ width: 200, height: 200 }}
        className="rounded-full border-0"
      />
    </View>
  )
}

export default ProfilePhoto