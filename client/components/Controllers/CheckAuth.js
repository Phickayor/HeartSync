const baseUrl = require("@/config/server");

const CheckAuth = async (token) => {
  try {
    if (token) {
      const res = await fetch(`${baseUrl}/profile/`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`
        }
      });
      const data = await res.json();
      return data;
    } else {
      return { success: false, message: "You are not signed in" };
    }
  } catch (error) {
    console.log(error);
  }
};

const GetAuth = async (token, authId) => {
  try {
    const res = await fetch(`${baseUrl}/auth/${authId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`
      }
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

const AuthEdit = async (token, payload) => {
  try {
    const res = await fetch(`${baseUrl}/auth/edit`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${JSON.parse(token)}`
      },
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    return res.ok ? data : alert(data.message);
  } catch (error) {
    console.log(error);
  }
};
module.exports = { CheckAuth, GetAuth, AuthEdit };
