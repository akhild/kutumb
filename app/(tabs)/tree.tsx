import PersonCardMain from "@/components/ui/PersonCardMain";
import Search, { SearchState } from "@/components/ui/Search";
import { AppColors, Colors } from "@/constants/theme";
import { usePersonIds, usePersons } from "@/store/hooks";
import { useEffect, useRef, useState } from "react";
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

  const [search_substring, setSearchSubstring] = useState<string>();
  const [debounced_search, setDebouncedSearch] = useState<string>();
  const [search_index, setCardIndex] = useState<number>(-1);
  const [search_start_index, setStartIndex] = useState<number>(0);
  const [search_state, setSearchState] = useState<SearchState>("none");

  const flatlistRef = useRef<FlatList<string>>(null);

  // Purely for search, and not UI
  const persons_map = usePersons();

  // On Change Handlers
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search_substring);
    }, 500);

    // Cleanup: Clear the timer if the user types again before 500ms
    return () => clearTimeout(timer);
  }, [search_substring]);

  useEffect(() => {
    handleSearch(1);
  }, [debounced_search]);

  useEffect(() => {
    if (!flatlistRef || search_index == -1) return;
    flatlistRef.current?.scrollToIndex({ index: search_index, viewPosition: 0.5, animated: true });
    setCardIndex(-1);
  }, [search_index]);

  const handleSearch = (direction: number) => {
    if (!debounced_search) return;

    setStartIndex((prev) => prev % persons.length);

    if (direction > 0) {
      // search forward
      const index = persons.findIndex((p, i) => i >= search_start_index
        && (persons_map[p].firstName.toLowerCase().includes(debounced_search.toLowerCase())
          || persons_map[p].lastName.toLowerCase().includes(debounced_search.toLowerCase())));

      if (index != -1) {
        setCardIndex(index);
        setStartIndex((index + 1) % persons.length);
        setSearchState("found")
        return;
      }
    }
    else {
      const index = persons.findLastIndex((p, i) => {

        return i <= search_start_index
          && (persons_map[p].firstName.toLowerCase().includes(debounced_search.toLowerCase())
            || persons_map[p].lastName.toLowerCase().includes(debounced_search.toLowerCase()))

      });

      if (index != -1) {
        setCardIndex(index);
        setStartIndex((index - 1) % persons.length);
        setSearchState("found")
        return;
      }
    }

    // check and set error
    if (persons.some((p, i) => persons_map[p].firstName.toLowerCase().includes(debounced_search.toLowerCase())
      || persons_map[p].lastName.toLowerCase().includes(debounced_search.toLowerCase()))) {
      setSearchState("none");
    } else {
      setSearchState("error");
    }

  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.home}>
        <Search changeHandler={setSearchSubstring} state={search_state} search_again={handleSearch} />
        <FlatList
          ref={flatlistRef}
          data={persons}
          renderItem={({ item, index }) => <PersonCardMain id={item} active={index === search_index} />}
          keyExtractor={item => item}
          ItemSeparatorComponent={PersonSeparator}
          onScrollToIndexFailed={(error) => {
            flatlistRef.current?.scrollToOffset({ animated: false, offset: 0 });
          }}
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
