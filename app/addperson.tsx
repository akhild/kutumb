import { IconSymbol } from "@/components/ui/icon-symbol";
import { Colors } from "@/constants/theme";
import { useNewPerson } from "@/store/hooks";
import { reset, setDoBirth, setDoDeath, setString } from "@/store/newpersonslice";
import { useDispatch } from "@/store/store";
import { TGender } from "@/types/model";
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { useEffect, useState } from "react";
import { KeyboardAvoidingView, Platform, Text, TextInput, TouchableHighlight, TouchableOpacity, useColorScheme, View } from "react-native";


const ModalAddPerson = () => {
  const scheme = useColorScheme();
  const colors = Colors[scheme ?? 'light'];

  const [name_details, setDetails] = useState<boolean>(false);
  const [selected_gender, setSelectedGender] = useState<TGender>("na");
  const [dob, setdob] = useState<Date>();
  const [dod, setdod] = useState<Date>();

  const person = useNewPerson();
  const dispatch = useDispatch();

  // useEffects
  useEffect(() => {
    return () => {
      dispatch(reset());
    }
  }, []);

  // helper functions
  const showDateTimePickerDob = () => {
    DateTimePickerAndroid.open({
      value: dob ?? new Date(),
      mode: "date",
      onChange: (event, date) => {
        if (date) {
          dispatch(setDoBirth({ value: date.getTime() }))
          setdob(date);
        }
      }
    });
  }

  const showDateTimePickerDoD = () => {
    DateTimePickerAndroid.open({
      value: dod ?? new Date(),
      mode: "date",
      onChange: (event, date) => {
        if (date) {
          dispatch(setDoDeath({ value: date.getTime() }))
          setdod(date);
        }
      }
    });
  }

  return <KeyboardAvoidingView>
    <View className="flex-1 items-center w-full">
      {/* profile photo */}
      <View className="h-60 relative aspect-square">
        {/* open gallery/camera mode */}
        <TouchableHighlight underlayColor={colors.background}>
          <View>
            <IconSymbol name="person.crop.circle.badge.plus" color={colors.text} size={200} className="" />
            {Platform.OS === 'android' &&
              <IconSymbol className="absolute right-5 bottom-5 bg-white rounded-2xl"
                name="camera" color={colors.text} size={50} />}
          </View>
        </TouchableHighlight>
      </View>

      {/* Form layout */}
      <View style={{ flex: 1, alignItems: "center", gap: 5, margin: 10 }}>
        <View className="mx-4 px-6 bg-gray-300 rounded-full flex-row items-center" >
          <TextInput placeholder="Name" className="flex-grow flex-shrink h-10" id="firstName"
            onChangeText={(text) => dispatch(setString({ value: text, label: "firstName" }))} />
          <TouchableOpacity onPress={() => setDetails(prev => !prev)}>
            <IconSymbol name={name_details ? "chevron.up" : "chevron.down"} color={colors.overlay} size={20} />
          </TouchableOpacity>
        </View>

        {name_details &&
          <View className="mx-4 px-6 bg-gray-300 rounded-full flex-row items-center" >
            <TextInput placeholder="Name" className="flex-grow flex-shrink" id="middleName"
              onChangeText={(text) => dispatch(setString({ value: text, label: "middleName" }))} />
          </View>}

        {name_details &&
          <View className="mx-4 px-6 bg-gray-300 rounded-full flex-row items-center" >
            <TextInput placeholder="Name" className="flex-grow flex-shrink" id="lastName"
              onChangeText={(text) => dispatch(setString({ value: text, label: "lastName" }))} />
          </View>}

        <View className="mx-4 px-6 bg-gray-300 rounded-full flex-row items-center">
          <Picker className="flex-grow flex-shrink" placeholder="Gender"
            selectedValue={selected_gender} onValueChange={(value) => {
              setSelectedGender(value);
              dispatch(setString({ value, label: "gender" }));
            }}>
            <Picker.Item label="Male" value="male" />
            <Picker.Item label="Female" value="female" />
            <Picker.Item label="N/A" value="na" />
          </Picker>
        </View>

        <View className="mx-4 px-6 bg-gray-300 rounded-full flex-row items-center">
          <Text className="flex-1 py-3">{dob && <Text>{dob.getFullYear()} - {dob.getMonth()} - {dob.getDate()}</Text>}
            {!dob && <Text>Date of birth</Text>}</Text>
          <TouchableOpacity onPress={showDateTimePickerDob}>
            <IconSymbol name="calendar" color={colors.text} />
          </TouchableOpacity>
        </View>

        <View className="mx-4 px-6 bg-gray-300 rounded-full flex-row items-center">
          <Text className="flex-1 py-3">
            {dod && <Text>{dod.getFullYear()} - {dod.getMonth()} - {dod.getDate()}</Text>}
            {!dod && <Text>Date of death</Text>}
          </Text>
          <TouchableOpacity onPress={showDateTimePickerDoD}>
            <IconSymbol name="calendar" color={colors.text} />
          </TouchableOpacity>
        </View>

        <View className="mx-4 px-6 bg-gray-300 rounded-full flex-row items-center">
          <TextInput placeholder="Bio" className="flex-grow flex-shrink" id="bio"
            multiline={true}
            numberOfLines={4}
            onChangeText={(text) => dispatch(setString({ value: text, label: "bio" }))} />
        </View>

        {person.error && <View className="mx-4 px-6">
          <Text className="text-red-400 font-bold">{person.error}</Text>
        </View>}
      </View>
    </View>
  </KeyboardAvoidingView>
}

export default ModalAddPerson;