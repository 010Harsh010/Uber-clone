import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentCaptain: {
    firstname: "",
    lastname: "",
    email: "",
    color: "",
    plate: "",
    capacity: 0,
    vehicleType: "",
    status: ""
  },
};

const captainSlice = createSlice({
  name: "currentCaptain",
  initialState,
  reducers: {
    setCaptain: (state, action) => {
      state.currentCaptain = action.payload;
    },
  },
});

export const { setCaptain } = captainSlice.actions;
export const captainReducer = captainSlice.reducer;
export default captainSlice;
