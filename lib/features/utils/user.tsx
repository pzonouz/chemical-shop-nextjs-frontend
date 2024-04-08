import { useAppDispatch } from "@/lib/hooks";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { setLoading, unsetLoading } from "./loading";

const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async (_, { dispatch, rejectWithValue }) => {
    dispatch(setLoading());
    const response = await fetch("/api/auth/users/me/");
    if (!response.ok) {
      dispatch(unsetLoading());
      return rejectWithValue(response.statusText);
    }
    const data = await response.json();
    dispatch(unsetLoading());
    return data;
  }
);
const initialState = { user: null, status: "UnAuthenticated" };
const user = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.status = "Authenticated";
      state.user = action.payload;
    });
  },
});

export { fetchUser };
export default user.reducer;
