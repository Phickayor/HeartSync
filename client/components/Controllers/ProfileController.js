const baseUrl = require("@/config/server");

const GetProfile = async (username) => {
  try {
    const res = await fetch(`${baseUrl}/profile/${username}`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
const ProfileEdit = async (token, payload) => {
  try {
    if (token) {
      console.log(token);
      const res = await fetch(`${baseUrl}/profile/edit`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${JSON.parse(token)}`
        },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      return data;
    } else {
      return {
        success: false,
        message: "You are not signed in"
      };
    }
  } catch (error) {
    console.log(error);
  }
};
const CreateProfile = async (token, payload) => {
  try {
    if (token) {
      const res = await fetch(`${baseUrl}/profile/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${JSON.parse(token)}`
        },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      return data;
    } else {
      return { success: false, message: "You are not logged in" };
    }
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  GetProfile,
  ProfileEdit,
  CreateProfile
};
