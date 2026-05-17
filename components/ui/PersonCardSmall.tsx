import { AppColors, Colors } from '@/constants/theme';
import { usePerson } from '@/store/hooks';
import { TPersonId } from '@/types/model';
import { Image } from 'expo-image';
import React from 'react';
import { StyleSheet, Text, useColorScheme, View } from 'react-native';

const PersonCardSmall = ({ id, relation }: {
  id: TPersonId;
  relation: string
}) => {
  const person = usePerson(id)
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const styles = createStyles(colors);
  const cover = person.photos.filter((ph) => ph.primary)[0]?.url;
  const imagebgcolor = person.gender === "male" ? colors.pastel_male : colors.pastel_female;
  const imageplaceholder = person.gender === "male"
    ? require('@/assets/images/avatar/male_avatar.svg')
    : require('@/assets/images/avatar/female_avatar.svg');
  const name = [person.firstName, person.middleName, person.lastName].map((w) => w && w[0]).join('');

  return (
    <View style={styles.container}>
      <View style={[{ backgroundColor: imagebgcolor }, styles.avatar_container]} >
        <Image source={cover}
          style={styles.avatar_image}
          placeholder={imageplaceholder}
          contentFit='contain'
        ></Image>
      </View>
      <View style={[{ borderColor: imagebgcolor }, styles.content]}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.relation}>{relation}</Text>
      </View>
    </View >
  )
}

const createStyles = (colors: AppColors) => StyleSheet.create({
  container: {
    width: 42,
    flexDirection: "column",
    alignItems: "center",
    borderWidth: 2,
    borderRadius: 10,
    borderColor: colors.overlay,
    backgroundColor: colors.pastel_alpha,
    flexGrow: 1,
  },
  avatar_container: {
    width: "100%",
    borderRadius: 500,
    aspectRatio: 1,
  },
  avatar_image: {
    flex: 1,
    margin: 5,
    borderRadius: 500,
  },
  content: {
    padding: 1,
    // backgroundColor: colors.pastel_bg,
  },
  name: {
    fontWeight: "bold",
    textAlign: "center",
  },
  relation: {
    fontSize: 11,
    textAlign: "center",
  },
});

export default PersonCardSmall