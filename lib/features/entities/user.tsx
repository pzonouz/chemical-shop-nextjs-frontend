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
      (user as IUser).email = action.payload.email;
      (user as IUser).firstName = action.payload.firstName;
      (user as IUser).lastName = action.payload.lastName;
      (user as IUser).mobile = action.payload.mobile;
    },
    userInfoUpdated(user, action) {
      (user as IUser).email = action.payload.email;
      (user as IUser).firstName = action.payload.firstName;
      (user as IUser).mobile = action.payload.mobile;
    },
  },
});

export const fetchUser = createAction("userApiFetchBegan");
export const { userInfoFetched, userInfoUpdated } = userSlice.actions;
export default userSlice.reducer;
