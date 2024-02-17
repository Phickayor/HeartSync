const baseUrl = require("@/config/server");

const GetAPic = async (token, id, pictureNumber) => {
  try {
    if (token) {
      const res = await fetch(`${baseUrl}/pictures/${id}/${pictureNumber}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${JSON.parse(token)}`
        }
      });
      const data = await res.json();
      return data;
    } else {
      return { success: false, message: "You are not logged in" };
    }
  } catch (error) {
    console.log(error.message);
  }
};
const GetAllPics = async (token, id) => {
  try {
    if (token) {
      const res = await fetch(`${baseUrl}/pictures/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${JSON.parse(token)}`
        }
      });
      const data = await res.json();
      return data;
    } else {
      return { success: false, message: "You are not logged in" };
    }
  } catch (error) {
    console.log(error.message);
  }
};

const UploadPictures = async (token, payload) => {
  try {
    if (token) {
      const res = await fetch(`${baseUrl}/pictures/upload`, {
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
    console.log(error.message);
  }
};
const UpdateSinglePicture = async (token, id, pictureNumber, payload) => {
  try {
    if (token) {
      const res = await fetch(`${baseUrl}/pictures/${id}/${pictureNumber}`, {
        method: "PUT",
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
    console.log(error.message);
  }
};

module.exports = {
  GetAPic,
  GetAllPics,
  UploadPictures,
  UpdateSinglePicture
};
