import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "../entities/user";

const authSlice = createSlice({
  name: "auth",
  initialState: {},
  reducers: {
    loggedIn(user, action) {
      (user as IUser).email = action.payload.email;
    },
    loggedOut(user, action) {
      (user as IUser).email = null;
    },
  },
});
export const { loggedIn, loggedOut } = authSlice.actions;
export default authSlice.reducer;
