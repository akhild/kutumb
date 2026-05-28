import { Colors } from "@/constants/theme";
import { TGender } from "@/types/model";
import { Image } from "expo-image";
import React from 'react';
import { useColorScheme, View } from 'react-native';

const ProfilePhoto = ({ uri, gender }: {
  uri: string | undefined
  gender?: TGender
}) => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const imagebgcolor = gender === "female" ? colors.pastel_female : colors.pastel_male;
  const imageplaceholder = gender === "female"
    ? require('@/assets/images/avatar/female_avatar.svg')
    : require('@/assets/images/avatar/male_avatar.svg');

  return (
    <View className='w-52 h-52 overflow-hidden rounded-full'
      style={{ backgroundColor: imagebgcolor, borderWidth: 12, borderColor: imagebgcolor }}
    >
      <Image
        source={{ uri }}
        style={{ width: "100%", height: "100%" }}
        className="w-full h-full bg-red-600"
        placeholder={imageplaceholder}
        contentFit='contain'
      />
    </View>
  )
}

export default ProfilePhoto