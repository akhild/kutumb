import { relation_name } from '@/constants/relation_names';
import { usePerson, useRelation } from '@/store/hooks';
import { TPersonId, TRelationId } from '@/types/model';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import PersonCardSmall from './PersonCardSmall';

const RelationCard = ({ callerid, relationid }: {
  callerid: TPersonId,
  relationid: TRelationId,
}) => {
  const caller = usePerson(callerid)
  const relation = useRelation(relationid)
  const direction = relation.from === callerid ? "to" :
    relation.to === callerid ? "from" : undefined;

  if (!direction) return;
  const person = usePerson(relation[direction]);
  const rname = relation_name[relation.type][direction][person.gender];

  return <PersonCardSmall id={relation[direction]} relation={rname} />

}

const TouchableRelationCard = ({ callerid, relationid }: {
  callerid: TPersonId,
  relationid: TRelationId,
}) => {
  return <TouchableOpacity accessibilityLabel="View this card">
    <View style={{ flexGrow: 1 }}>
      <RelationCard callerid={callerid} relationid={relationid}></RelationCard>
    </View>
  </TouchableOpacity>
};


const styles = StyleSheet.create({

});

export default RelationCard;
export { TouchableRelationCard };
