import ProfilePhoto from '@/components/ui/ProfilePhoto';
import { useOwnerId, usePerson } from '@/store/hooks';
import { useDispatch } from '@/store/store';
import { Link, useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

const profile = () => {
  const ownerid = useOwnerId();
  const ownerperson = usePerson(ownerid);
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    if (ownerid.length === 0) {
      // Owner person is not set, this should be done at app launch
      router.push("/addperson", {});
    }
  }, []);

  return (
    <View className='flex-1 items-center w-full p-4 gap-2'>
      <ProfilePhoto uri={ownerperson?.photos[0]?.url} gender={ownerperson?.gender} />
      <View><Text className='text-2xl'>Hi {ownerperson.firstName}!!</Text></View>
      <TouchableOpacity >
        <View className='rounded-3xl border-1 w-full bg-blue-200 px-8 py-2 mt-4'>
          <Link href={`/editperson/${ownerid}`}>Edit your own profile</Link>
        </View>
      </TouchableOpacity>
    </View>
  )
}

export default profile