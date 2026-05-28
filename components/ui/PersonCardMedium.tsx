import { AppColors, Colors } from '@/constants/theme';
import { TPerson } from '@/types/model';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, useColorScheme, View } from 'react-native';
import { IconSymbol } from './icon-symbol';


const PersonCardMedium = ({ person, buttons }: { person: TPerson, buttons: boolean }) => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const styles = createStyles(colors);
  const router = useRouter();

  const imagebgcolor = person.gender === "male" ? colors.pastel_male : colors.pastel_female;
  const imageplaceholder = person.gender === "male"
    ? require('@/assets/images/avatar/male_avatar.svg')
    : require('@/assets/images/avatar/female_avatar.svg');
  const cover = person.photos.filter((ph) => ph.primary)[0]?.url;
  const yob = person.birth.date && new Date(person.birth.date).getFullYear();
  // const yobfull = person.birth.date && `b. ${new Date(person.birth.date).getFullYear()} ${new Date(person.birth.date).getMonth()} ${new Date(person.birth.date).getDate()}`;
  const yod = person.death.date && new Date(person.death.date).getFullYear();
  // const yodfull = person.death.date &&
  // `d. ${new Date(person.death.date).getFullYear()} ${new Date(person.death.date).getMonth()} ${new Date(person.death.date).getDate()}`;

  return (
    <View style={[styles.container, styles.container_vertical, styles.container_spread]}>
      <View style={[styles.container_horizontal, { paddingEnd: 5 }]}>
        <View style={[{ backgroundColor: imagebgcolor }, styles.avatar_container]} >
          <Image source={cover}
            style={styles.avatar_image}
            placeholder={imageplaceholder}
            contentFit='contain'
          ></Image>
        </View>
        <View style={[{ borderColor: imagebgcolor }, styles.content]}>
          <Text style={styles.name}>{person.firstName} {person.lastName}</Text>
          <Text>{yob}-{yod}</Text>
        </View>
      </View>
      {buttons && <View style={[styles.full, styles.container_horizontal, styles.container_even]}>
        {/* buttons */}
        <TouchableOpacity accessibilityLabel="Add New Relation"
          style={styles.button} >
          <IconSymbol name="person.2.badge.plus" color={colors.text} size={20} style={styles.button_text} ></IconSymbol>
        </TouchableOpacity>
        <TouchableOpacity accessibilityLabel="View Person"
          onPress={() => {
            router.push(`/editperson/${person._id}`);
          }}
          style={styles.button} >
          <IconSymbol name="square.and.pencil" color={colors.text} size={20} style={styles.button_text} ></IconSymbol>
        </TouchableOpacity>
      </View>}
    </View >
  )
}

export default PersonCardMedium

const createStyles = (colors: AppColors) => StyleSheet.create({
  full: {
    padding: 0, margin: 0,
  },
  container: {
    height: '100%',
    borderWidth: 2,
    borderRadius: 10,
    overflow: 'hidden',
    borderColor: colors.overlay,
    backgroundColor: colors.pastel_beta,
  },
  container_horizontal: {
    flexDirection: "row",
  },
  container_vertical: {
    flexDirection: "column",
  },
  container_spread: {
    justifyContent: "space-between",
  },
  container_even: {
    justifyContent: "space-evenly",
  },
  avatar_container: {
    width: "30%",
    borderRadius: 500,
    margin: 10,
    aspectRatio: 1,
    justifyContent: 'flex-start',
  },
  avatar_image: {
    flex: 1,
    margin: 5,
    borderRadius: 500,
  },
  content: {
    flexGrow: 1,
    flexShrink: 1,
    borderWidth: 2,
    borderRadius: 10,
    padding: 5,
    backgroundColor: colors.pastel_bg,
  },
  name: {
    fontWeight: "bold",
  },
  dates: {

  },
  button: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: colors.overlay,
  },
  button_text: {
    textAlign: "center",
  },
})