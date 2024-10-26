import { IUser } from "@/types/common";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import Cookies from "universal-cookie";

const cookies = new Cookies(null, { path: "/" });
interface IAuthenticatePayloadAction {
  access_token: string;
  refresh_token: string;
  set_cookie?: boolean;
  exp?: string;
  authenticated: boolean;
}

interface IAuthState {
  user: IUser | null;
  access_token: string | null;
  refresh_token: string | null;
  authenticated: boolean;
  authenticating: boolean;
}

const initialState: IAuthState = {
  user: null,
  access_token: null,
  refresh_token: null,
  authenticated: false,
  authenticating: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authenticate: (
      state,
      action: PayloadAction<IAuthenticatePayloadAction>
    ) => {
      state.authenticated = action.payload.authenticated;
      state.access_token = action.payload.access_token;
      state.refresh_token = action.payload.refresh_token;
      state.authenticating = false;
      if (action.payload.set_cookie) {
        cookies.set("access_token", action.payload.access_token, {
          expires: action.payload.exp
            ? new Date(action.payload.exp)
            : undefined,
          path: "/",
        });
        cookies.set("refresh_token", action.payload.refresh_token, {
          expires: action.payload.exp
            ? new Date(action.payload.exp)
            : undefined,
          path: "/",
        });
      }
    },
    setUser: (
      state,
      action: PayloadAction<{ user: IUser; authenticate?: boolean }>
    ) => {
      state.authenticated = action.payload.authenticate ? true : false;
      state.authenticating = false;
      state.user = action.payload.user;
    },
    logout: (state) => {
      state.authenticated = false;
      state.access_token = null;
      state.refresh_token = null;
      state.authenticating = false;
      state.user = null;
      cookies.remove("access_token");
      cookies.remove("refresh_token");
    },
  },
});

export const { authenticate, setUser, logout } = authSlice.actions;
export default authSlice.reducer;
