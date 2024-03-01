import { createSlice } from "@reduxjs/toolkit";

const initialState = { status: false };
const loadingSlice = createSlice({
  name: "loading",
  initialState: initialState,
  reducers: {
    setLoading: (loading) => {
      loading.status = true;
    },
    unsetLoading: (loading) => {
      loading.status = false;
    },
  },
});

export const { setLoading, unsetLoading } = loadingSlice.actions;
export default loadingSlice.reducer;
