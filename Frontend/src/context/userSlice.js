import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: {
    _id: "",
    email: "",
    firstname: "",
    lastname: "",
  },
};

const userSlice = createSlice({
  name: "currentUser",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.currentUser = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;
export const userReducer = userSlice.reducer;
export default userSlice;
