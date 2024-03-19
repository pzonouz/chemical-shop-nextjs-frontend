import { createSlice } from "@reduxjs/toolkit";

const initialState = { status: false };
const totalPriceZeroErrorSlice = createSlice({
  name: "totalPriceZeroError",
  initialState: initialState,
  reducers: {
    setTotalPriceZeroError: (totalPriceZeroError) => {
      totalPriceZeroError.status = true;
    },
    unsetTotalPriceZeroError: (totalPriceZeroError) => {
      totalPriceZeroError.status = false;
    },
  },
});

export const { setTotalPriceZeroError, unsetTotalPriceZeroError } =
  totalPriceZeroErrorSlice.actions;
export default totalPriceZeroErrorSlice.reducer;
