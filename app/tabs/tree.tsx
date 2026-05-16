import PersonCardMain from "@/components/ui/PersonCardMain";
import { AppColors, Colors } from "@/constants/theme";
import { usePersonIds } from "@/store/hooks";
import { FlatList, StyleSheet, useColorScheme, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

const PersonSeparator = () => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const styles = createStyles(colors);
  return <View style={styles.separator}></View>;
};

export default function FamilyTree() {
  const persons = usePersonIds();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const styles = createStyles(colors);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.home}>
        <FlatList
          data={persons}
          renderItem={({ item }) => <PersonCardMain id={item} />}
          keyExtractor={item => item}
          ItemSeparatorComponent={PersonSeparator}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const createStyles = (colors: AppColors) => StyleSheet.create({
  home: {
    flex: 1,
    paddingHorizontal: 10,
  },
  separator: {
    width: "100%",
    height: 5,
    backgroundColor: colors.pastel_male,
  }
});
