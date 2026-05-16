import { TPersonId, TPersonMap } from '@/types/model';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

const initialState: RootState["persons"] = {
  byId: {},
  allIds: [],
};

const personsSlice = createSlice({
  name: 'persons',
  initialState: initialState,
  reducers: {
    setPersons: (state, action: PayloadAction<{ byId: TPersonMap }>) => {
      state.byId = action.payload.byId;
      state.allIds = Object.keys(action.payload.byId);
    },
    addPerson: (state, action: PayloadAction<{ person: TPersonMap[TPersonId] }>) => {
      state.byId[action.payload.person._id] = action.payload.person;
      if (!state.allIds.includes(action.payload.person._id)) {
        state.allIds.push(action.payload.person._id);
      }
    },
    updatePerson: (state, action: PayloadAction<{ person: TPersonMap[TPersonId] }>) => {
      state.byId[action.payload.person._id] = action.payload.person;
    },
    removePerson: (state, action: PayloadAction<{ id: TPersonId }>) => {
      delete state.byId[action.payload.id];
      state.allIds = state.allIds.filter(id => id !== action.payload.id);
    },
  },
});

export default personsSlice.reducer;
export const { setPersons, addPerson, updatePerson, removePerson } = personsSlice.actions;
