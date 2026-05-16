import { TRelationId, TRelationMap } from '@/types/model';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

const initialState: RootState["relations"] = {
  byId: {},
  allIds: [],
};

const relationsSlice = createSlice({
  name: 'relations',
  initialState: initialState,
  reducers: {
    setRelations: (state, action: PayloadAction<{ byId: TRelationMap }>) => {
      state.byId = action.payload.byId;
      state.allIds = Object.keys(action.payload.byId);
    },
    addRelation: (state, action: PayloadAction<{ relation: TRelationMap[TRelationId] }>) => {
      state.byId[action.payload.relation._id] = action.payload.relation;
      if (!state.allIds.includes(action.payload.relation._id)) {
        state.allIds.push(action.payload.relation._id);
      }
    },
    updateRelation: (state, action: PayloadAction<{ relation: TRelationMap[TRelationId] }>) => {
      state.byId[action.payload.relation._id] = action.payload.relation;
    },
    removeRelation: (state, action: PayloadAction<{ id: TRelationId }>) => {
      delete state.byId[action.payload.id];
      state.allIds = state.allIds.filter(id => id !== action.payload.id);
    },
  },
});

export default relationsSlice.reducer;
export const { setRelations, addRelation, updateRelation, removeRelation } = relationsSlice.actions;