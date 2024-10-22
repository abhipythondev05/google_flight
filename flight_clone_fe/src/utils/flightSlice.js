import { createSlice } from "@reduxjs/toolkit";

const flightSlice = createSlice({
  name: "flight",
  initialState: {
    flightDetails: [],
  },
  reducers: {
    flightSelected: (state, action) => {
      state.flightDetails.push(action.payload);
    },
  },
});

export const { flightSelected } = flightSlice.actions;

export default flightSlice.reducer;