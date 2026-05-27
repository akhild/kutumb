import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

const initialState: RootState["newperson"] = {
  _id: "",
  metadata: {
    createdBy: undefined,
    updatedBy: undefined,
    auditedBy: undefined,
    createdAt: 0,
    updatedAt: 0
  },
  firstName: "",
  middleName: "",
  lastName: "",
  gender: "male",
  birth: {
    date: undefined,
    place: undefined
  },
  death: {
    date: undefined,
    place: undefined
  },
  photos: [],
  bio: "",
  error: "",

  up: [],     // parents
  down: [],   // children
  side: [],   // partners

};

const newPersonSlice = createSlice({
  name: "newperson",
  initialState: initialState,
  reducers: {
    setString: (state, action: PayloadAction<{ value: string, label: string }>) => {
      const { value, label } = action.payload;
      if (label in state) {
        state[label] = value;
      }
    },
    setDoBirth: (state, action: PayloadAction<{ value: number }>) => {
      state.birth.date = action.payload.value;
    },
    setDoDeath: (state, action: PayloadAction<{ value: number }>) => {
      state.death.date = action.payload.value;
    },
    setPoBirth: (state, action: PayloadAction<{ value: string }>) => {
      state.birth.place = action.payload.value;
    },
    setPoDeath: (state, action: PayloadAction<{ value: string }>) => {
      state.death.place = action.payload.value;
    },
    addProfilePicture: (state, action: PayloadAction<{ value: string }>) => {
      state.photos = [];
      state.photos.push({
        url: action.payload.value,
        primary: true,
      });
    },
    removeProfilePicture: (state) => {
      state.photos = [];
    },
    setError: (state, action: PayloadAction<{ value: string }>) => {
      state.error = action.payload.value
    },
    reset: () => initialState,
  }
});

export default newPersonSlice.reducer;
export const { setString, setDoBirth, setDoDeath, setPoBirth, setPoDeath, addProfilePicture, setError, reset, removeProfilePicture } = newPersonSlice.actions;