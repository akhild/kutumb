import { AppColors, Colors } from '@/constants/theme';
import React, { Dispatch, SetStateAction } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, useColorScheme, View } from 'react-native';
import { IconSymbol } from './icon-symbol';

export type SearchState = "error" | "found" | "none";

const Search = ({ changeHandler, state, search_again }: {
  changeHandler: Dispatch<SetStateAction<string | undefined>>,
  state: SearchState,
  search_again: (direction: number) => void
}) => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const styles = createStyles(colors);

  return (
    <View style={[styles.container, {
      borderColor: state === "error" ?
        colors.error : state === "found" ?
          colors.success : colors.overlay
    }]}>
      <IconSymbol name={'magnifyingglass'} color={colors.overlay} />
      <TextInput
        style={{ flexGrow: 1 }}
        onChangeText={changeHandler}
        placeholder="locate a person"
        keyboardType="default"
      />
      <TouchableOpacity onPress={() => search_again(-1)}>
        <IconSymbol name={'chevron.left'} color={colors.text} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => search_again(+1)}>
        <IconSymbol name={'chevron.right'} color={colors.text} />
      </TouchableOpacity>
    </View>
  )
}

const createStyles = (colors: AppColors) => StyleSheet.create({
  container: {
    flexDirection: "row",
    // paddingVertical: 10,
    alignItems: "center",
    paddingStart: 20,
    paddingEnd: 10,
    gap: 10,
    marginHorizontal: 20,
    marginVertical: 10,
    borderWidth: 1,
    borderRadius: 100,
    backgroundColor: colors.pastel_bg_2,
    borderColor: colors.overlay,
    zIndex: 2,
  },
});

export default Search;

