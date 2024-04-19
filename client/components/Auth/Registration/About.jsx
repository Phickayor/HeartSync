"use client";
import { searchUser } from "@/components/Controllers/UserController";
import { RegContext } from "@/contexts/RegContext";
import React, { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";

function About({ onNext }) {
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [userName, setUserName] = useState("");
  const [dob, setDob] = useState("");
  const [maxDate, setMaxDate] = useState(null);
  const regContext = useContext(RegContext);
  const handleMaxDate = () => {
    const today = new Date();
    const maxDate = new Date(
      today.getFullYear() - 18,
      today.getMonth(),
      today.getDate()
    );
    const formattedMaxDate = maxDate.toISOString().split("T")[0];
    setMaxDate(formattedMaxDate);
  };
  const HandleSubmit = async (e) => {
    e.preventDefault();
    const { user } = await searchUser(userName);
    if (user) {
      Swal.fire({ icon: "error", text: "Username is already taken" });
    } else {
      const payload = { fullName, phoneNumber, userName, dob };
      regContext.RegDispatch({ type: "update", payload });
      onNext();
    }
  };
  useEffect(() => {
    handleMaxDate();
  });
  return (
    <div className="flex flex-col justify-center h-screen mx-auto w-10/12 lg:w-3/5 gap-10">
      <img src="/images/logo.svg" className="mx-auto lg:hidden " alt="" />
      <div className=" md:px-10 md:py-8 p-5 rounded-xl flex flex-col gap-5">
        <h1 className="text-2xl md:text-3xl text-center font-medium">
          Tell us about your self
        </h1>
        <form className="grid grid-cols-2 gap-5 py-5" onSubmit={HandleSubmit}>
          <div className="flex flex-col gap-2">
            <label className="font-normal">Full name</label>
            <input
              type="text"
              required
              placeholder="John Doe"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="bg-inherit  py-2 md:py-4 focus:outline-none px-5 rounded-lg focus:border-[#584296] border"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-normal">Date of birth</label>
            <input
              type="date"
              required
              value={dob}
              max={maxDate}
              placeholder="2004-08-07"
              onChange={(e) => setDob(e.target.value)}
              className="bg-inherit py-2 md:py-4 focus:outline-none px-5 rounded-lg focus:border-[#584296] border"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-normal">Phone </label>
            <input
              type="text"
              required
              placeholder="08123456789"
              pattern="[0-9]{11}"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="bg-inherit py-2 md:py-4 focus:outline-none px-5 rounded-lg focus:border-[#584296] border"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-normal">Username</label>
            <input
              type="text"
              required
              minLength={3}
              maxLength={10}
              value={userName}
              placeholder="Johnny"
              onChange={(e) => setUserName(e.target.value)}
              className="bg-inherit py-2 md:py-4 focus:outline-none px-5 rounded-lg focus:border-[#584296] border"
            />
          </div>
          <button type="submit" className="auth-btn col-span-2">
            Save
          </button>
        </form>
      </div>
    </div>
  );
}

export default About;
