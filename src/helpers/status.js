import { baseUrl } from "../config/baseUrl";

export const statusUpdate = async (body) => {
  console.log("helpers body", body);
  return await fetch(`${baseUrl}/api/admin/order/status`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
    body: JSON.stringify(body),
  })
    .then((response) => {
      console.log("status helpers page", response);
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};
