"use client";
import { searchUser } from "@/components/Controllers/UserController";
import ButtonLoader from "@/components/Loaders/ButtonLoader";
import { RegContext } from "@/contexts/RegContext";
import React, { useContext, useEffect, useState } from "react";
import { AiFillInfoCircle } from "react-icons/ai";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

function About({ onNext, onPrev }) {
  const regContext = useContext(RegContext);
  const [fullName, setFullName] = useState(
    regContext?.RegState?.fullName || ""
  );
  const [phoneNumber, setPhoneNumber] = useState(
    regContext?.RegState?.phoneNumber || ""
  );
  const [userName, setUserName] = useState(
    regContext?.RegState?.userName || ""
  );
  const [dob, setDob] = useState(regContext?.RegState?.dob || "");
  const [maxDate, setMaxDate] = useState(null);
  const [loader, setLoader] = useState(false);
  const [errorMessage, setErrorMessage] = useState([]);

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
    let errors = [];

    if (!/^[A-Za-z ]{3,50}$/.test(fullName)) {
      errors.push("Full name must be 3-50 alphabetic characters.");
    }
    if (!/^[0-9]{10,15}$/.test(phoneNumber)) {
      errors.push("Phone number must be 10-15 digits.");
    }
    if (!dob) {
      errors.push("Date of birth is required.");
    }

    if (errors.length > 0) {
      setErrorMessage(errors);
      return;
    }

    try {
      setLoader(true);
      const { user } = await searchUser(userName);
      if (user) {
        setLoader(false);
        setErrorMessage(["Username is already taken."]);
        return;
      } else {
        const payload = { fullName, phoneNumber, userName, dob };
        regContext.RegDispatch({ type: "update", payload });
        onNext();
        setLoader(false);
      }
    } catch (error) {
      setLoader(false);
      setErrorMessage([error.message]);
    }
  };

  useEffect(() => {
    handleMaxDate();
  });

  return (
    <div className="flex flex-col justify-center rounded-xl mx-auto bg-[#1B1B1B] md:w-fit w-11/12">
      <div className=" md:px-10 p-5 rounded-xl flex flex-col gap-5">
        <div className="flex justify-between">
          <FaAngleLeft
            className="text-3xl font-extralight cursor-pointer"
            onClick={() => onPrev()}
          />
          <FaAngleRight
            className="text-3xl font-extralight cursor-pointer"
            onClick={() => onNext()}
          />
        </div>
        <h1 className="text-2xl md:text-3xl text-center font-medium">
          Tell us about your self
        </h1>
        {errorMessage.length > 0 && (
          <div className="flex justify-center pb-4 gap-2 [&>*]:self-center">
            <AiFillInfoCircle className="text-lg md:text-xl" />
            {errorMessage.map((msg, index) => (
              <span key={index} className="text-center text-[#FF8A60] text-sm md:text-base">
                {msg}
              </span>
            ))}
          </div>
        )}
        <form className="grid grid-cols-2 gap-5 py-5" onSubmit={HandleSubmit}>
          <div className="flex flex-col gap-2">
            <input
              type="text"
              required
              placeholder="Full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="bg-[#1A1818] py-2 focus:outline-none px-2 md:px-5 rounded-lg focus:border"
            />
          </div>
          <div className="flex flex-col gap-2">
            <input
              type="date"
              required
              max={maxDate}
              placeholder="Date of birth"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className="bg-[#1A1818] py-2 focus:outline-none px-2 md:px-5 rounded-lg focus:border"
            />
          </div>
          <div className="flex flex-col gap-2">
            <input
              type="text"
              required
              placeholder="Phone Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="bg-[#1A1818] py-2 focus:outline-none px-2 md:px-5 rounded-lg focus:border"
            />
          </div>
          <div className="flex flex-col gap-2">
            <input
              type="text"
              required
              value={userName}
              placeholder="Username"
              onChange={(e) => setUserName(e.target.value)}
              className="bg-[#1A1818] py-2 focus:outline-none px-2 md:px-5 rounded-lg focus:border"
            />
          </div>
          <button type="submit" className="auth-btn col-span-2">
            {loader ? <ButtonLoader /> : " Save"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default About;
