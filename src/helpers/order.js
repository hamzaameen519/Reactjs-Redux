import { baseUrl } from "../config/baseUrl";

export const getOrder = async () => {
  return await fetch(`${baseUrl}/api/orders`, {
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
