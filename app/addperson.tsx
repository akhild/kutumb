import { StyleSheet, Text, View } from "react-native";

const ModalAddPerson = () => {
  return <View style={styles.container}>
    <Text>This is Modal New Person Form</Text>
  </View>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ModalAddPerson;