import { relation_name } from '@/constants/relation_names';
import { usePerson, useRelation } from '@/store/hooks';
import { TPersonId, TRelationId } from '@/types/model';
import React from 'react';
import { StyleSheet } from 'react-native';
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

  return <><PersonCardSmall id={relation[direction]} relation={rname} /></>
}

const styles = StyleSheet.create({

});

export default RelationCard