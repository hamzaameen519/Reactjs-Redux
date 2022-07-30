import { baseUrl } from "../config/baseUrl";

export const getUser = async () => {
  return await fetch(`${baseUrl}/api/users`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
  })
    .then((response) => {
      console.log("user helpers page", response);
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};
