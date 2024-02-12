"use client";
import React, { useState } from "react";
import { CreateProfile } from "../Controllers/ProfileController";
import Cookies from "js-cookie";

function About(props) {
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [userName, setUserName] = useState(null);
  const [dob, setDob] = useState();
  const token = Cookies.get("token");
  const HandleSubmit = async (e) => {
    e.preventDefault();
    const payload = { firstName, lastName, userName, dob };
    const submission = await CreateProfile(token, payload);
    submission.success
      ? props.contentHandler("description")
      : alert(submission.message);
  };
  return (
    <div className="mx-auto w-10/12 lg:w-3/5">
      <div className="bg-white md:px-10 md:py-8 p-5 rounded-xl">
        <h1 className="text-2xl md:text-3xl text-center font-medium">
          Tell us about your self
        </h1>
        <form
          className="grid grid-cols-2 gap-3 md:gap-5 py-5"
          onSubmit={HandleSubmit}
        >
          <div className="flex flex-col gap-2">
            <label className="font-normal">First name</label>
            <input
              type="text"
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="bg-inputBg py-2 md:py-4 focus:outline-none px-5 rounded-lg focus:border-[#584296] border"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-normal">Last name</label>
            <input
              type="text"
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="bg-inputBg py-2 md:py-4 focus:outline-none px-5 rounded-lg focus:border-[#584296] border"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-normal">Username</label>
            <input
              type="text"
              required
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="bg-inputBg py-2 md:py-4 focus:outline-none px-5 rounded-lg focus:border-[#584296] border"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-normal">Date of birth</label>
            <input
              type="date"
              required
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className="bg-inputBg py-2 md:py-4 focus:outline-none px-5 rounded-lg focus:border-[#584296] border"
            />
          </div>
          <button
            type="submit"
            className="col-span-2 bg-btnColor text-white mx-auto w-fit px-12 md:px-24 rounded-lg py-4 md:text-2xl font-medium md:self-center mt-4"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
}

export default About;
