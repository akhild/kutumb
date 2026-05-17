import { Colors } from '@/constants/theme';
import { useNewPerson } from '@/store/hooks';
import { reset, setError } from '@/store/newpersonslice';
import { addPerson } from '@/store/personslice';
import { useDispatch } from '@/store/store';
import { checkPersonSanity } from '@/utils/sanity';
import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { TouchableOpacity, useColorScheme, View } from 'react-native';
import { IconSymbol } from './icon-symbol';

const AddPersonHeaderRight = ({ tintColor, canGoBack }: {
  tintColor: string | undefined,
  canGoBack: boolean | undefined,
}) => {
  const scheme = useColorScheme();
  const colors = Colors[scheme ?? 'light'];
  const router = useRouter();

  const person = useNewPerson();
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(reset());
    }
  }, []);
  return (
    <View>
      <TouchableOpacity onPress={() => {
        const sanity = checkPersonSanity(person);
        if (sanity === true) {
          dispatch(addPerson({ person }));
          canGoBack && router.back();
        } else {
          dispatch(setError({ value: sanity }))
        }
      }}>
        <IconSymbol name="person.badge.plus.fill" color={tintColor ?? colors.text} />
      </TouchableOpacity>
    </View>
  )
}

export default AddPersonHeaderRight;