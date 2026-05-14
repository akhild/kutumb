import { StyleSheet, Text, View } from "react-native";

export default function FamilyTree() {
  return (
    <View style={styles.home}>
      <Text>Welcome to my Tree.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  home: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  }
});
