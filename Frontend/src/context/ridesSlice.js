import { createSlice } from "@reduxjs/toolkit";

const initalState = {
    currentState : 1,
    rideData : null,
}
const rideSlice = createSlice({
    name: 'ride',
    initialState: initalState,
    reducers: {
        setcurrentState(state, action) {
            state.currentState = action.payload;
        },
        setRideData(state, action) {
            state.rideData = action.payload;
        },
    }
})
export const {setcurrentState ,setRideData}  = rideSlice.actions;
export const rideReducer =  rideSlice.reducer;
export default rideSlice;