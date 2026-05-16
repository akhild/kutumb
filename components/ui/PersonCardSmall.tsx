import { usePerson } from '@/store/hooks'
import { TPersonId } from '@/types/model'
import React from 'react'
import { Text, View } from 'react-native'

const PersonCardSmall = ({ id, relation }: {
  id: TPersonId;
  relation: string
}) => {
  const person = usePerson(id)

  return (
    <View>
      <Text>{person.firstName} {person.lastName}</Text>
      {relation && <Text>{relation}</Text>}
    </View>
  )
}

export default PersonCardSmall