const baseUrl = require("@/config/server");

export const getMatches = async (token) => {
  if (token) {
    const res = await fetch(`${baseUrl}/matches`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${JSON.parse(token)}`
      }
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error);
    }
    return data;
  }else{
    throw new Error("Unauthorized");
  }
};
