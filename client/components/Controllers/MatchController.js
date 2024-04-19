import Cookies from "js-cookie";
const baseUrl = require("@/config/server");
const token = Cookies.get("token");

export const getMatches = async () => {
  const res = await fetch(`${baseUrl}/matches`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${JSON.parse(token)}`
    }
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message);
  }
  return data;
};
