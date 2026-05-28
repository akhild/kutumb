import { TPersonId, TPersonMap } from '@/types/model';
import { createSlice, Middleware, PayloadAction } from '@reduxjs/toolkit';
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
    updatePerson: (state, action: PayloadAction<{ id: TPersonId, value: string | number, label: string }>) => {
      const { id, value, label } = action.payload;
      let person = state.byId[id];
      switch (label) {
        case "dob":
          person.birth.date = value as number;
          break;
        case "dod":
          person.death.date = value as number;
          break;
        case "pob":
          person.birth.place = value as string;
          break;
        case "pod":
          person.death.place = value as string;
          break;
        default:
          person[label] = value as string;
          break;
      }
    },
    updatePersonProfilePicture: (state, action: PayloadAction<{ id: TPersonId, uri?: string }>) => {
      state.byId[action.payload.id].photos = [];  // clear photos
      if (action.payload.uri === undefined) {
        return;
      }
      state.byId[action.payload.id].photos.push({
        url: action.payload.uri,
        primary: true,
      });
    },
    removePerson: (state, action: PayloadAction<{ id: TPersonId }>) => {
      delete state.byId[action.payload.id];
      state.allIds = state.allIds.filter(id => id !== action.payload.id);
    },
  },
});

// Middleware to add id
export const addPersonMiddleware: Middleware<{}, RootState> = (store) => (next) => (action: any) => {
  if (action.type === "persons/addPerson") {
    const enriched = {
      ...action,
      payload: {
        ...action.payload,
        person: {
          ...action.payload.person,
          _id: `${Date.now()}`
        }
      }
    };
    return next(enriched);
  }
  return next(action);
};

export default personsSlice.reducer;
export const { setPersons, addPerson, updatePerson, updatePersonProfilePicture, removePerson } = personsSlice.actions;
