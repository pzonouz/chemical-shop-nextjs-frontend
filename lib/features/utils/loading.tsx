import { createSlice } from "@reduxjs/toolkit";

const initialState = { status: false };
const loadingSlice = createSlice({
  name: "loading",
  initialState: initialState,
  reducers: {
    setLoading: (loading) => {
      console.log(true);
      loading.status = true;
    },
    unsetLoading: (loading) => {
      console.log(false);
      loading.status = false;
    },
  },
});

export const { setLoading, unsetLoading } = loadingSlice.actions;
export default loadingSlice.reducer;
