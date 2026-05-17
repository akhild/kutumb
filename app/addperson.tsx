import { StyleSheet, Text, View } from "react-native";

const ModalAddPerson = () => {
  return <View className="flex-1 items-center">
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