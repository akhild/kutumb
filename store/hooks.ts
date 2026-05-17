import { TPersonId, TRelationId } from '@/types/model';
import { useSelector } from './store';

export const usePersons = () =>
  useSelector(state => state.persons.byId);

export const usePersonIds = () =>
  useSelector(state => state.persons.allIds);

export const usePerson = (personId: TPersonId) =>
  useSelector(state => state.persons.byId[personId]);

export const usePersonList = () =>
  useSelector(state =>
    state.persons.allIds.map(id => state.persons.byId[id])
  );

// Selector Hooks for Relations
export const useRelations = () =>
  useSelector(state => state.relations.byId);

export const useRelationIds = () =>
  useSelector(state => state.relations.allIds);

export const useRelation = (relationId: TRelationId) =>
  useSelector(state => state.relations.byId[relationId]);

export const useRelationList = () =>
  useSelector(state =>
    state.relations.allIds.map(id => state.relations.byId[id])
  );

export const usePersonWithRelations = (personId: TPersonId) =>
  useSelector(state => {
    const person = state.persons.byId[personId];
    if (!person) return null;

    return {
      ...person,
      relations: {
        parents: person.up.map(id => state.relations.byId[id]).filter(Boolean),
        children: person.down.map(id => state.relations.byId[id]).filter(Boolean),
        partners: person.side.map(id => state.relations.byId[id]).filter(Boolean),
      },
    };
  });

export const useNewPerson = () => useSelector(state => state.newperson);