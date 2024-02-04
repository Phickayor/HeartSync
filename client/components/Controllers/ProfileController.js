const baseUrl = require("@/config/server");

const GetProfile = async (username) => {
  try {
    const res = await fetch(`${baseUrl}/profile/${username}`);
    const data = await res.json();
    return res.ok ? data : alert(data.message);
  } catch (error) {
    console.log(error);
  }
};
const ProfileEdit = async (token, payload) => {
  console.log(payload);
  try {
    const res = await fetch(`${baseUrl}/profile/edit`, {
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
module.exports = {GetProfile,ProfileEdit};
