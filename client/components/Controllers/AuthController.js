const baseUrl = require("@/config/server");
const Cookies = require("js-cookie");

const token = Cookies.get("token");

const checkExistingUser = async (email) => {
  const res = await fetch(`${baseUrl}/auth/search-users/${email}`);
  const data = await res.json();
  if (res.ok) {
    return data;
  } else {
    throw new Error(data.message);
  }
};
const createUser = async (payload) => {
  try {
    const res = await fetch(`${baseUrl}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    return {
      message: data.message,
      ok: res.ok
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

const resetPassword = async (regToken, newPassword) => {
  try {
    const res = await fetch(`${baseUrl}/auth/reset-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ regToken, newPassword })
    });
    const data = await res.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};
module.exports = {
  checkExistingUser,
  createUser,
  resetPassword
};
