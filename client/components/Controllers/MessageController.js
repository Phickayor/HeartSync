const baseUrl = require("@/config/server");
const Cookies = require("js-cookie");
const token = Cookies.get("token");
const sendMessage = async (payload) => {
  // Payload = senderId,receiverId,content
  try {
    const res = await fetch(`${baseUrl}/message/send`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${JSON.parse(token)}`
      },
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error.message);
  }
};
const getMessages = async (chatId) => {
  try {
    const res = await fetch(`${baseUrl}/message/all/${chatId}`, {
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
const getAMessage = async (messageId) => {
  try {
    const res = await fetch(`${baseUrl}/message/${messageId}`, {
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
const   getChats = async (user_id) => {
  try {
    const res = await fetch(`${baseUrl}/chat/all/${user_id}`, {
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

const getAChat = async (chatId) => {
  try {
    const res = await fetch(`${baseUrl}/chat/${chatId}`, {
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
const getUnreadChats = async (chatId) => {
  try {
    const res = await fetch(`${baseUrl}/chat/get-unread-chats/${chatId}`, {
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
  sendMessage,
  getMessages,
  getAMessage,
  getChats,getAChat,
  getUnreadChats
};
