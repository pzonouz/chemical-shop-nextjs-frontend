import { objectCopy } from "@/app/utils/CopyObject";
import { createAction, createSlice } from "@reduxjs/toolkit";
export interface IUser {
  email: string | null;
  firstName: string;
  lastName: string;
  createdAt: string;
  mobile: string;
  address: string;
}

const userSlice = createSlice({
  name: "users",
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
