import { createSlice } from "@reduxjs/toolkit";

interface IUser {
  email: string | null;
}

const authSlice = createSlice({
  name: "auth",
  initialState: {},
  reducers: {
    signedIn(user, action) {
      (user as IUser).email = action.payload.email;
    },
    signedOut(user, action) {
      (user as IUser).email = null;
    },
  },
});
export const { signedIn: loggedIn } = authSlice.actions;
export default authSlice.reducer;
