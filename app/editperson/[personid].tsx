import AppModalPopup from '@/components/ui/AppModalPopup';
import { IconSymbol } from '@/components/ui/icon-symbol';
import ProfilePhoto from '@/components/ui/ProfilePhoto';
import ProfilePictureEditor from '@/components/ui/ProfilePictureEditor';
import { Colors } from '@/constants/theme';
import { usePerson } from '@/store/hooks';
import { updatePerson } from '@/store/personslice';
import { useDispatch } from '@/store/store';
import { TPersonCompiled } from '@/types/model';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableHighlight, TouchableOpacity, useColorScheme, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

const ModalEditPerson = () => {
  // Imported variables
  const { personid } = useLocalSearchParams<{ personid: string }>();
  const person = usePerson(personid);
  const scheme = useColorScheme();
  const colors = Colors[scheme ?? 'light'];
  const dispatch = useDispatch();
  const dob = person.birth.date !== undefined ? new Date(person.birth.date) : undefined;
  const dod = person.death.date === undefined ? undefined : new Date(person.death.date);

  // State Variables
  const [name_details, setDetails] = useState<boolean>(false);
  const [showProfilePictureEditor, setShowProfilePictureEditor] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>();
  const [addDob, setAddDob] = useState<boolean>(person.birth.date !== undefined);
  const [addDod, setAddDod] = useState<boolean>(person.death.date !== undefined);
  const [addPob, setAddPob] = useState<boolean>(person.birth.place !== undefined);
  const [addPod, setAddPod] = useState<boolean>(person.death.place !== undefined);

  // Effects

  // Helper Function
  const update = ({ person, value, label }: {
    person: TPersonCompiled,
    value: string,
    label: string
  }) => {
    dispatch(updatePerson({ id: person._id, value, label }));
  }

  const showDateTimePickerDob = ({ person }: { person: TPersonCompiled }) => {
    DateTimePickerAndroid.open({
      value: dob ?? new Date(),
      mode: "date",
      onChange: (_event, date) => {
        if (date) {
          dispatch(updatePerson({ id: person._id, value: date.getTime(), label: "dob" }));
        }
      }
    });
  }

  const showDateTimePickerDoD = ({ person }: { person: TPersonCompiled }) => {
    DateTimePickerAndroid.open({
      value: dod ?? new Date(),
      mode: "date",
      onChange: (_event, date) => {
        if (date) {
          dispatch(updatePerson({ id: person._id, value: date.getTime(), label: "dod" }));
        }
      }
    });
  }

  const updateGender = ({ person, value }: {
    person: TPersonCompiled,
    value: string,
  }) => {
    if (value === "male" || value === "female") {
      dispatch(updatePerson({ id: person._id, value, label: "gender" }));
    }
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
                  <ProfilePhoto uri={person.photos[0]?.url} gender={person.gender} />
                  {Platform.OS === 'android' &&
                    <IconSymbol className="absolute right-5 bottom-5 bg-white rounded-2xl" size={50}
                      name="camera" color={colors.text} />}
                </View>
              </TouchableHighlight>
              <AppModalPopup show={showProfilePictureEditor} setShow={setShowProfilePictureEditor} >
                <ProfilePictureEditor gender={person.gender} personId={person._id} />
              </AppModalPopup>
            </View>

            {/* Form layout */}
            <View className="w-full px-10 gap-3 text-xl">
              {error && <View className="mx-4 px-6">
                <Text className="text-red-400 font-bold">{error}</Text>
              </View>}

              <View className="px-6 bg-gray-300 rounded-3xl" >
                <View className="flex-row items-center" >
                  <TextInput placeholder={name_details ? "First Name" : "Name"} className="grow shrink" id="firstName"
                    onChangeText={(text) => update({ person, value: text, label: "firstName" })}
                    value={person.firstName} />
                  <TouchableOpacity onPress={() => setDetails(prev => !prev)}>
                    <IconSymbol name={name_details ? "chevron.up" : "chevron.down"} color={colors.text} size={20} />
                  </TouchableOpacity>
                </View>

                {name_details && <View className="h-0.5 bg-gray-400"></View>}
                {name_details &&
                  <View className="bg-gray-300 flex-row items-center" >
                    <TextInput placeholder="Middle" className="flex-grow flex-shrink" id="middleName"
                      onChangeText={(text) => update({ person, value: text, label: "middleName" })}
                      value={person.middleName} />
                  </View>}

                {name_details && <View className="h-0.5 bg-gray-400"></View>}
                {name_details &&
                  <View className="bg-gray-300 flex-row items-center" >
                    <TextInput placeholder="Last Name" className="flex-grow flex-shrink" id="lastName"
                      onChangeText={(text) => update({ person, value: text, label: "lastName" })}
                      value={person.lastName} />
                  </View>}
              </View>

              <View className="px-4 bg-gray-300 rounded-3xl">
                <Picker className="border-2 border-pink-400 bg-red-400 py-0 my-0" placeholder="Gender" mode="dropdown"
                  selectedValue={person.gender} style={{ fontSize: 14 }} onValueChange={(value) => {
                    updateGender({ person, value })
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
                  <TouchableOpacity onPress={() => showDateTimePickerDob({ person })}>
                    <IconSymbol name="calendar" color={colors.text} />
                  </TouchableOpacity>
                </View>
              </View>}

              {addPob && <View className="px-6 bg-gray-300 rounded-3xl" >
                <TextInput placeholder="Place of Birth" className="flex-grow flex-shrink" id="birth.place"
                  onChangeText={(text) => update({ value: text, person, label: "pob" })}
                  value={person.birth.place}
                />
              </View>}

              {addDod && <View className="px-6 bg-gray-300 rounded-3xl">
                <View className="flex-row items-center">
                  <Text className="flex-1 py-3">
                    {dod && <Text>{dod.getFullYear()} - {dod.getMonth()} - {dod.getDate()}</Text>}
                    {!dod && <Text>Date of death</Text>}
                  </Text>
                  <TouchableOpacity onPress={() => showDateTimePickerDoD({ person })}>
                    <IconSymbol name="calendar" color={colors.text} />
                  </TouchableOpacity>
                </View>
              </View>}

              {addPod && <View className="px-6 bg-gray-300 rounded-3xl" >
                <TextInput placeholder="Place of Death" className="flex-grow flex-shrink" id="death.place"
                  onChangeText={(text) => update({ person, value: text, label: "pod" })}
                  value={person.death.place}
                />
              </View>}

              <View className="px-6 bg-gray-300 rounded-3xl">
                <View className="flex-row items-center">
                  <TextInput placeholder="Bio" className="flex-grow flex-shrink" id="bio"
                    multiline={true}
                    numberOfLines={6}
                    onChangeText={(text) => update({ person, value: text, label: "bio" })}
                    value={person.bio}
                  />
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

export default ModalEditPerson