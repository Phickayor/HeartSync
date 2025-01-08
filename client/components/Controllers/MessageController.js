const baseUrl = require("@/config/server");

const sendMessage = async (content, chatId, token) => {
  if (token) {
    const res = await fetch(`${baseUrl}/message`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${JSON.parse(token)}`
      },
      body: JSON.stringify({ content, chatId })
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
const getAllMessages = async (chatId, token) => {
  if (token) {
    const res = await fetch(`${baseUrl}/message/${chatId}`, {
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
// const markAsRead = async (chatId, token) => {
//   try {
//     const res = await fetch(`${baseUrl}/message/toggle-read/${chatId}`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${JSON.parse(token)}`
//       }
//     });
//     const data = await res.json();
//     if (!res.ok) {
//       throw new Error(data.error);
//     } else {
//       return data;
//     }
//   } catch (error) {
//     console.error(error.message);
//   }
// };
module.exports = {
  sendMessage,
  getAllMessages,
  // markAsRead
};
