import { objectCopy } from "@/app/utils/CopyObject";
import { createAction, createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {},
  reducers: {
    userInfoFetched(user, action) {
      objectCopy(action.payload, user);
    },
  },
});

export const fetchUser = createAction("apiFetchBegan");
export const { userInfoFetched } = userSlice.actions;
export default userSlice.reducer;
