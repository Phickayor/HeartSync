const baseUrl = require("@/config/server");

const AccessChat = async (userId, token) => {
  if (token) {
    if (!userId) {
      return { message: "no user" };
    }
    const res = await fetch(`${baseUrl}/chat/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${JSON.parse(token)}`
      }
    });
    const data = await res.json();
    if (res.ok) {
      return data;
    } else {
      throw new Error(data.error);
    }
  } else {
    throw new Error("Unauthorized");
  }
};

const getAllChats = async (token) => {
  if (token) {
    const res = await fetch(`${baseUrl}/chat/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${JSON.parse(token)}`
      }
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error);
    } else {
      return data;
    }
  } else {
    throw new Error("Unauthorized");
  }
};
module.exports = {
  AccessChat,
  getAllChats
};
