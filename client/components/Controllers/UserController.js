const baseUrl = require("@/config/server");
const Cookies = require("js-cookie");
const token = Cookies.get("token");
const GetUser = async () => {
  try {
    const res = await fetch(`${baseUrl}/user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${JSON.parse(token)}`
      }
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
const EditUser = async (payload) => {
  try {
    const res = await fetch(`${baseUrl}/user/edit`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${JSON.parse(token)}`
      },
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  GetUser,
  EditUser
};
