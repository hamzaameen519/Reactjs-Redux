import axios from "axios";
import { baseUrl } from "../config/baseUrl";

export const getCategory = async () => {
  return await fetch(`${baseUrl}/api/categories`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
  })
    .then((response) => {
      console.log("sfafadfasdf", response);
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const addCategory = async (body) => {
  console.log("body data", body);
  return await axios
    .post(`${baseUrl}/categories`, body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    })
    .then((response) => {
      console.log("sfafadfasdf", response);
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};
