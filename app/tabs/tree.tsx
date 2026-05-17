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
    backgroundColor: colors.background,
  },
  separator: {
    width: "100%",
    backgroundColor: colors.pastel_delta,
    borderColor: colors.overlay,
    borderWidth: 1,
    marginHorizontal: 10,
    borderRadius: 10,
    marginVertical: 3,
  }
});
