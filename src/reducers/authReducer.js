import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetch2 } from "./helper/fetch";
// import axios from "axios";
// import { baseUrl } from "../config/baseUrl";
export const initialState = {
  token: "",
  loading: false,
  isAuth: false,
  error: "",
  success: "",
  toggle: false,
  toggleChat: false,
  user: [],
  roomId: "",
  userId: "",
  rname: "",
  chat: [],
};

export const signupUser = createAsyncThunk("signupuser", async (body) => {
  // const result = await axios.post(`${baseUrl}/signup`, body);
  // return result;
});

export const signinUser = createAsyncThunk("signinuser", async (body) => {
  // const result = await fetch2("/api/login", body, "post");
  // return body.token;
});

export const getUserId = createAsyncThunk("getuserid", async (body) => {
  const result = await fetch2("/getUserData", body, "post");
  return result;
});

export const authReducer = createSlice({
  name: "user",
  initialState,
  reducers: {
    // login action
    loginPending: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, { payload }) => {
      state.loading = false;
      state.isAuth = true;
      state.error = "";
      state.token = payload?.data?.access_token;
      state.user = payload.data.data;
      localStorage.setItem("access_token", payload?.data?.access_token);
      console.log("reducer data", payload.data);
      console.log("reducer token", payload?.data?.access_token);
    },
    loginFail: (state, { payload }) => {
      state.loading = false;
      state.error = payload.error;
      console.log("reducer error", payload.error);
    },
    isMeAuth: (state, { payload }) => {
      state.isAuth = true;
      state.token = localStorage.getItem("access_token");
      state.user = payload?.data;
      localStorage.getItem("access_token");
      console.log("reducer payload", payload);
      console.log("reducer data", payload?.data);
      console.log("reducer token", payload?.data?.access_token);
    },
    logoutMe: (state, action) => {
      state.token = null;
      state.isAuth = false;
      state.user = [];
      localStorage.removeItem("access_token");
    },
    toggleButton: (state, action) => {
      state.toggle = action?.payload;
    },
    toggleChatButton: (state, action) => {
      state.roomId = action.payload?.id;
      state.userId = action.payload?.userId;
      state.rname = action.payload?.name;
      state.toggleChat = action?.payload?.hide;
    },
  },
  extraReducers: {},
});
export const {
  addToken,
  logoutMe,
  isMeAuth,
  registerPending,
  registerSuccess,
  registerFail,
  loginPending,
  loginSuccess,
  loginFail,
  toggleButton,
  toggleChatButton,
} = authReducer.actions;
export default authReducer.reducer;
