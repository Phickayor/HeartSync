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
      if(!res.ok){
        throw new Error("Failed to fetch data")
      }
      const data = await res.json();
      return data;
    
  } catch (error) {
    console.log(error);
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
const searchUser = async (userName) => {
  try {
    const res = await fetch(`${baseUrl}/user/username/${userName}`);
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
  GetSpecificUser,
  EditUser,
  searchUser
};
