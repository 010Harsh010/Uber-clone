import { configureStore } from "@reduxjs/toolkit";
import { captainReducer } from "../context/captainSlice.js";
import { userReducer } from "../context/userSlice.js";
import { rideReducer } from "../context/ridesSlice.js";

const store = configureStore({
  reducer: {
    user: userReducer,
    captain: captainReducer,
    ride : rideReducer,
  },
});

export default store;
