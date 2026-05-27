import AppModalPopup from "@/components/ui/AppModalPopup";
import { IconSymbol } from "@/components/ui/icon-symbol";
import ProfilePhoto from "@/components/ui/ProfilePhoto";
import ProfilePictureEditor from "@/components/ui/ProfilePictureEditor";
import { Colors } from "@/constants/theme";
import { useNewPerson } from "@/store/hooks";
import { reset, setDoBirth, setDoDeath, setPoBirth, setPoDeath, setString } from "@/store/newpersonslice";
import { useDispatch } from "@/store/store";
import { TGender } from "@/types/model";
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { useEffect, useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableHighlight, TouchableOpacity, useColorScheme, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";


const ModalAddPerson = () => {
  const scheme = useColorScheme();
  const colors = Colors[scheme ?? 'light'];

  const [name_details, setDetails] = useState<boolean>(false);
  const [selected_gender, setSelectedGender] = useState<TGender>("na");
  const [dob, setdob] = useState<Date>();
  const [dod, setdod] = useState<Date>();
  const [addDob, setAddDob] = useState<boolean>(false);
  const [addDod, setAddDod] = useState<boolean>(false);
  const [addPob, setAddPob] = useState<boolean>(false);
  const [addPod, setAddPod] = useState<boolean>(false);
  const [showProfilePictureEditor, setShowProfilePictureEditor] = useState<boolean>(false);

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

  const setProfilePicture = (base64: string | undefined | null, local_uri: string[]) => {
    setShowProfilePictureEditor(false);
  }

  return <SafeAreaProvider >
    <SafeAreaView style={{
      flex: 1,
      alignItems: 'center',
    }}>
      <KeyboardAvoidingView behavior="padding" className="w-full">
        <ScrollView>
          <View className="items-center w-full">
            {/*  profile photo */}
            <View className="py-4">
              {/* open gallery/camera mode */}
              <TouchableHighlight underlayColor={colors.pastel_bg_2} className="rounded-full active:border active:border-red-400" onPress={() => {
                setShowProfilePictureEditor((prev) => !prev);
              }}>
                <View className="relative ">
                  {person.photos.length >= 1 && <ProfilePhoto
                    uri={person.photos[0]?.url}
                  />}
                  {person.photos.length < 1 && <IconSymbol name="person.crop.circle.badge.plus" color={colors.text} size={200} className="" />}
                  {Platform.OS === 'android' &&
                    <IconSymbol className="absolute right-5 bottom-5 bg-white rounded-2xl" size={50}
                      name="camera" color={colors.text} />}
                </View>
              </TouchableHighlight>
              <AppModalPopup show={showProfilePictureEditor} setShow={setShowProfilePictureEditor} >
                <ProfilePictureEditor />
              </AppModalPopup>
            </View>

            {/* Form layout */}
            <View className="w-full px-10 gap-3 text-xl">
              {person.error && <View className="mx-4 px-6">
                <Text className="text-red-400 font-bold">{person.error}</Text>
              </View>}

              <View className="px-6 bg-gray-300 rounded-3xl" >
                <View className="flex-row items-center" >
                  <TextInput placeholder={name_details ? "First Name" : "Name"} className="grow shrink" id="firstName"
                    onChangeText={(text) => dispatch(setString({ value: text, label: "firstName" }))} />
                  <TouchableOpacity onPress={() => setDetails(prev => !prev)}>
                    <IconSymbol name={name_details ? "chevron.up" : "chevron.down"} color={colors.text} size={20} />
                  </TouchableOpacity>
                </View>

                {name_details && <View className="h-0.5 bg-gray-400"></View>}
                {name_details &&
                  <View className="bg-gray-300 flex-row items-center" >
                    <TextInput placeholder="Middle" className="flex-grow flex-shrink" id="middleName"
                      onChangeText={(text) => dispatch(setString({ value: text, label: "middleName" }))} />
                  </View>}

                {name_details && <View className="h-0.5 bg-gray-400"></View>}
                {name_details &&
                  <View className="bg-gray-300 flex-row items-center" >
                    <TextInput placeholder="Last Name" className="flex-grow flex-shrink" id="lastName"
                      onChangeText={(text) => dispatch(setString({ value: text, label: "lastName" }))} />
                  </View>}
              </View>

              <View className="px-4 bg-gray-300 rounded-3xl">
                <Picker className="border-2 border-pink-400 bg-red-400 py-0 my-0" placeholder="Gender" mode="dropdown"
                  selectedValue={selected_gender} style={{ fontSize: 14 }} onValueChange={(value) => {
                    setSelectedGender(value);
                    dispatch(setString({ value, label: "gender" }));
                  }}>
                  <Picker.Item label="Gender" value="na" enabled={false} />
                  <Picker.Item label="Male" value="male" />
                  <Picker.Item label="Female" value="female" />
                </Picker>
              </View>

              {addDob && <View className="px-6 bg-gray-300 rounded-3xl">
                <View className="flex-row items-center">
                  <Text className="flex-1 py-3">
                    {dob && <Text>{dob.getFullYear()} - {dob.getMonth()} - {dob.getDate()}</Text>}
                    {!dob && <Text>Date of birth</Text>}</Text>
                  <TouchableOpacity onPress={showDateTimePickerDob}>
                    <IconSymbol name="calendar" color={colors.text} />
                  </TouchableOpacity>
                </View>
              </View>}

              {addPob && <View className="px-6 bg-gray-300 rounded-3xl" >
                <TextInput placeholder="Place of Birth" className="flex-grow flex-shrink" id="birth.place"
                  onChangeText={(text) => dispatch(setPoBirth({ value: text }))} />
              </View>}

              {addDod && <View className="px-6 bg-gray-300 rounded-3xl">
                <View className="flex-row items-center">
                  <Text className="flex-1 py-3">
                    {dod && <Text>{dod.getFullYear()} - {dod.getMonth()} - {dod.getDate()}</Text>}
                    {!dod && <Text>Date of death</Text>}
                  </Text>
                  <TouchableOpacity onPress={showDateTimePickerDoD}>
                    <IconSymbol name="calendar" color={colors.text} />
                  </TouchableOpacity>
                </View>
              </View>}

              {addPod && <View className="px-6 bg-gray-300 rounded-3xl" >
                <TextInput placeholder="Place of Death" className="flex-grow flex-shrink" id="death.place"
                  onChangeText={(text) => dispatch(setPoDeath({ value: text }))} />
              </View>}

              <View className="px-6 bg-gray-300 rounded-3xl">
                <View className="flex-row items-center">
                  <TextInput placeholder="Bio" className="flex-grow flex-shrink" id="bio"
                    multiline={true}
                    numberOfLines={6}
                    onChangeText={(text) => dispatch(setString({ value: text, label: "bio" }))} />
                </View>
              </View>

              <View className="flex-row-reverse flex-wrap justify-between gap-2">
                {!addDob && <View style={{ width: "48%" }}>
                  <TouchableOpacity onPress={() => { setAddDob(true) }}>
                    <View className="  flex-row px-6 bg-blue-200 rounded-3xl items-center">
                      <IconSymbol name="calendar" color={colors.text} />
                      <Text className="py-4">Date of Birth</Text>
                    </View>
                  </TouchableOpacity>
                </View>}

                {!addPob && <View style={{ width: "48%" }}>
                  <TouchableOpacity onPress={() => { setAddPob(true) }}>
                    <View className=" flex-row px-6 bg-blue-200 rounded-3xl items-center">
                      <IconSymbol name={"location.circle.fill"} color={colors.text}></IconSymbol>
                      <Text className="py-4">Add Birth Place</Text>
                    </View>
                  </TouchableOpacity>
                </View>}

                {!addDod && <View style={{ width: "48%" }}>
                  <TouchableOpacity onPress={() => { setAddDod(true) }}>
                    <View className=" flex-row px-6 bg-blue-200 rounded-3xl items-center">
                      <IconSymbol name="calendar" color={colors.text} />
                      <Text className="py-4">Date of Death</Text>
                    </View>
                  </TouchableOpacity>
                </View>}

                {!addPod && <View style={{ width: "48%" }}>
                  <TouchableOpacity onPress={() => { setAddPod(true) }}>
                    <View className=" flex-row px-6 bg-blue-200 rounded-3xl items-center">
                      <IconSymbol name={"location.circle.fill"} color={colors.text}></IconSymbol>
                      <Text className="py-4">Add Death Place</Text>
                    </View>
                  </TouchableOpacity>
                </View>}
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  </SafeAreaProvider >
}

export default ModalAddPerson;