import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetch2 } from "./helper/fetch";
import axios from "axios";
import { baseUrl } from "../config/baseUrl";

export const initialState = {
  token: "",
  loading: false,
  isAuth: false,
  error: "",
  success: "",
  result: [],
};

export const searchFilter = createAsyncThunk("searchfilter", async (body) => {
  const result = await axios.post(`${baseUrl}/property/search`, body);
  console.log("redux result", result);
  return result;
});

export const filterReducer = createSlice({
  name: "filter",
  initialState,
  reducers: {
    addToken: (state) => {
      state.token = localStorage.getItem("token");
    },
    loginPending: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, { payload }) => {
      state.loading = false;
      state.isAuth = true;
      state.error = "";
      state.token = payload.token;
      localStorage.setItem("token", payload.token);
      console.log("reducer token", payload.token);
    },
    loginFail: (state, { payload }) => {
      state.loading = false;
      state.error = payload.error;
      console.log("reducer error", payload.error);
    },
    storeToken: (state, { payload }) => {
      console.log("actionnn", payload.token);
      localStorage.setItem("token", payload.token);
    },
    Logout: (state, action) => {
      state.token = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: {
    [searchFilter.fulfilled]: (state, { payload: { data } }) => {
      state.loading = false;
      console.log("redux action", data.result);
      if (data.message === "property not found") {
        state.error = data.message;
        state.success = false;
      } else {
        state.error = false;
        state.success = data.message;
        state.result = data.result;
      }
    },
    [searchFilter.pending]: (state, action) => {
      state.loading = true;
    },
  },
});
export const {
  addToken,
  Logout,
  storeToken,
  loginPending,
  loginSuccess,
  loginFail,
} = filterReducer.actions;
export default filterReducer.reducer;
