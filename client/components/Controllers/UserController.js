const baseUrl = require("@/config/server");
const GetUser = async (token) => {
  if (token) {
    const res = await fetch(`${baseUrl}/user`, {
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
  } else {
    throw new Error("Unauthorized");
  }
};

const GetSpecificUser = async (userId) => {
  try {
    const res = await fetch(`${baseUrl}/user/${userId}`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
const getUsers = async (token) => {
  if (token) {
    const res = await fetch(`${baseUrl}/user/all`, {
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

const EditUser = async (payload, token) => {
  if (token) {
    const res = await fetch(`${baseUrl}/user/edit`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${JSON.parse(token)}`
      },
      body: JSON.stringify(payload)
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
const searchUser = async (userName) => {
  const res = await fetch(`${baseUrl}/user/username/${userName}`);
  const data = await res.json();
  if (res.ok) {
    return data;
  } else {
    return { user: null };
  }
};
module.exports = {
  GetUser,
  GetSpecificUser,
  EditUser,
  searchUser,
  getUsers
};
