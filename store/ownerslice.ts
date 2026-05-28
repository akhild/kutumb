import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

const initialState: RootState["owner"] = {
  id: ""
};

const ownerSlice = createSlice({
  name: "owner",
  initialState,
  reducers: {
    setOwnerId: (state, action: PayloadAction<{ id: string }>) => {
      state.id = action.payload.id;
    }
  }
});

export default ownerSlice.reducer;
export const { setOwnerId } = ownerSlice.actions;