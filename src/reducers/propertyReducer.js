import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetch5, fetch3 } from "./helper/fetch";
import axios from "axios";
import { baseUrl } from "../config/baseUrl";

const initialState = {
  property: [],
  SaleProperty: [],
  RentProperty: [],
  loading: false,
  error: "",
  message: "",
};

export const ADD_PROPERTY = createAsyncThunk(
  "addProperty",
  async (formData) => {
    const result = await axios.post(`${baseUrl}/createProperty`, formData, {
      // receive two    parameter endpoint url ,form data
    });
    console.log("results", result.data);
    return result.data;
  }
);
export const GET_PROPERTY = createAsyncThunk("getProperty", async () => {
  const result = await fetch3("/api/getAllProperties", "get");
  console.log("result", result);
  return result;
});
export const GET_PROPERTY_BY_ID = createAsyncThunk(
  "getPropertyById",
  async (id) => {
    const result = await fetch5(`/api/getPropertyByID/${id}`, "get");
    console.log("result", result);
    return result;
  }
);

export const GET_RENT_PROPERTY = createAsyncThunk(
  "getRentProperty",
  async () => {
    const result = await fetch3("/api/rent/getProperties", "get");
    console.log("result", result);
    return result;
  }
);
export const GET_SALE_PROPERTY = createAsyncThunk(
  "getSaleProperty",
  async () => {
    const result = await fetch3("/api/sale/getProperties", "get");
    console.log("result", result);
    return result;
  }
);

export const GET_SALE_LOGGED_USER_PROPERTY = createAsyncThunk(
  "getSaleLoggedUserProperties",
  async () => {
    const result = await fetch3("/api/sale/loggedUserProperties", "get");
    console.log("result", result);
    return result;
  }
);

export const GET_RENT_LOGGED_USER_PROPERTY = createAsyncThunk(
  "getRentLoggedUserProperties",
  async () => {
    const result = await fetch3("/api/rent/loggedUserProperties", "get");
    console.log("result", result);
    return result;
  }
);

export const DELETE_SALE_PROPERTY = createAsyncThunk(
  "deleteSaleProperty",
  async (id) => {
    const result = await fetch3(`/removeProperty/${id}`, "delete");
    console.log("Results", result);
    return result;
  }
);
export const DELETE_RENT_PROPERTY = createAsyncThunk(
  "deleteRentProperty",
  async (id) => {
    const result = await fetch3(`/removeProperty/${id}`, "delete");
    console.log("Results", result);
    return result;
  }
);

export const UPDATE_PROPERTY = createAsyncThunk(
  "updateProperty",
  async (body) => {
    console.log("Body", body);
    const result = await axios.put(
      `${baseUrl}/updateProperty/${body._id}`,
      body,
      {
        // params: { _id: _id },
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: localStorage.getItem("token"),
        },
      }
    );
    // fetch2(`/updateProperty/${body._id}`, body, "put");
    // console.log("result", result);
    // return result;
  }
);

export const propertyReducer = createSlice({
  name: "property",
  initialState,
  reducers: {
    storeRentProperty: (state, { payload }) => {
      console.log("payload", payload);
      console.log("Rent property in redux", payload.data);
      state.RentProperty = payload.data;
    },
    deleteFail: (state, { payload }) => {
      state.loading = false;
      state.error = payload.error;
      console.log("reducer error", payload.error);
    },
  },
  extraReducers: {
    [ADD_PROPERTY.fulfilled]: (state, action) => {
      console.log("Action", action);
      state.loading = false;
      if (action.payload.message) {
        state.property.push(action.payload.data);
        state.message = action.payload.message;
      }
      console.log("Messages", state.message);
      console.log("Property", state.property);
    },
    [ADD_PROPERTY.pending]: (state, action) => {
      state.loading = true;
    },
    [GET_PROPERTY.fulfilled]: (state, { payload: { message } }) => {
      console.log(message);
      return message;
    },

    [GET_RENT_PROPERTY.fulfilled]: (state, { payload }) => {
      console.log("rent wali", payload.data);
      state.RentProperty.push(payload.data);
      return state;
    },

    [GET_SALE_PROPERTY.fulfilled]: (state, { payload }) => {
      console.log("sale wali", payload.data);
      state.SaleProperty.push(payload.data);
      return state;
    },

    [GET_PROPERTY_BY_ID.fulfilled]: (state, { payload }) => {
      console.log("sale wali", payload?.data?.[0]);
      state.property = payload?.data?.[0];
      return state;
    },

    [GET_SALE_LOGGED_USER_PROPERTY.fulfilled]: (state, { payload }) => {
      console.log("get log user sale wali", payload.data);
      state.SaleProperty.push(payload.data);
      return state;
    },

    [GET_RENT_LOGGED_USER_PROPERTY.fulfilled]: (state, { payload }) => {
      console.log("get log user rent wali", payload.data);
      state.RentProperty.push(payload.data);
      return state;
    },

    [DELETE_SALE_PROPERTY.fulfilled]: (
      state,
      { payload: { message, data } }
    ) => {
      if (message === "success") {
        const removeTodo = state.SaleProperty.filter((item) => {
          return item._id !== data._id;
        });
        return removeTodo;
      }
    },

    [DELETE_RENT_PROPERTY.fulfilled]: (
      state,
      { payload: { message, data } }
    ) => {
      state.loading = false;
      console.log("this is message", message);
      console.log("this is daa", data);
      console.log("data id", data._id);
      console.log("here is find function");
      console.log(state.RentProperty.find((item) => item._id == data._id));
      console.log("here is rent property ");
      console.log(state.RentProperty);
      if (message === "success") {
        // const removeTodo = state.RentProperty.filter(
        //   (item) => item._id != data._id
        // );
        // return removeTodo;
        state.RentProperty = data;
      }
    },
    [DELETE_RENT_PROPERTY.pending]: (state, action) => {
      state.loading = true;
    },
    [UPDATE_PROPERTY.fulfilled]: (state, { payload: { message } }) => {
      console.log("MESSAGE", message);
      return message;
    },
  },
});

export const { storeRentProperty, deleteFail } = propertyReducer.actions;
export default propertyReducer.reducer;
