const baseUrl = require("@/config/server");
const Cookies = require("js-cookie");
const token = Cookies.get("token");
const sendMessage = async (content, chatId) => {
  try {
    const res = await fetch(`${baseUrl}/message`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${JSON.parse(token)}`
      },
      body: JSON.stringify({ content, chatId })
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error.message);
  }
};
const getAllMessages = async (chatId) => {
  try {
    const res = await fetch(`${baseUrl}/message/${chatId}`, {
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
const markAsRead = async (messageId) => {
  try {
    const res = await fetch(`${baseUrl}/message/toogle-read/${messageId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${JSON.parse(token)}`
      }
    });
    const data = await res.json();
  } catch (error) {
    console.error(error.message);
  }
};
module.exports = {
  sendMessage,
  getAllMessages,
  markAsRead
};
