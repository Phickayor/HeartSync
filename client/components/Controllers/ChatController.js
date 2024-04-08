const baseUrl = require("@/config/server");
const Cookies = require("js-cookie");
const token = Cookies.get("token");

const AccessChat = async (userId) => {
  try {
    if (token) {
      const res = await fetch(`${baseUrl}/chat/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${JSON.parse(token)}`
        }
      });
      const data = await res.json();
      return data;
    } else {
      return {
        unauthorized: true,
        message: "No token"
      };
    }
  } catch (error) {
    console.log(error);
  }
};

const getAllChats = async () => {
  try {
    const res = await fetch(`${baseUrl}/chat/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${JSON.parse(token)}`
      }
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error.message);
  }
};
module.exports = {
  AccessChat,
  getAllChats
};
