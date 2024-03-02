import { User } from "@prisma/client";
import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {},
  reducers: {
    loggedIn(user, action) {
      (user as User).email = action.payload.email;
    },
    loggedOut(user, action) {
      (user as User).email = null;
    },
  },
});
export const { loggedIn, loggedOut } = authSlice.actions;
export default authSlice.reducer;
