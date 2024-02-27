import { createAction, createSlice } from "@reduxjs/toolkit";
export interface IUser {
  email: string | null;
  firstName: string;
  lastName: string;
  createdAt: string;
  mobile: string;
  addresses: { address: string }[];
}

const userSlice = createSlice({
  name: "users",
  initialState: {},
  reducers: {
    userInfoFetched(user, action) {
      user = Object.keys(action.payload).map((key) => {
        (user as any)[key] = action.payload[key];
      });
    },
    userInfoUpdated(user, action) {
      user = Object.keys(action.payload).map((key) => {
        (user as any)[key] = action.payload[key];
      });
    },
  },
});

export const fetchUser = createAction("userApiFetchBegan");
export const { userInfoFetched, userInfoUpdated } = userSlice.actions;
export default userSlice.reducer;
