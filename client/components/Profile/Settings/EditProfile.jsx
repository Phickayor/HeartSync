"use client";
import React, { useState } from "react";
import { AiFillCloseCircle, AiFillInfoCircle } from "react-icons/ai";

function EditProfile(props) {
  const [errorMessage, setErrorMessage] = useState(null);
  const handleClose = () => {
    props.editHandler(null);
  };
  return (
    <div className={`fixed h-screen z-20 w-full flex flex-col justify-center`}>
      <div className="p-6 py-8 rounded-xl bg-[#262626] border border-white text-white mx-auto w-2/5">
        <div className="relative flex justify-center">
          <h1 className="text-center text-2xl self-center">
            Edit {props.name}
          </h1>
          <AiFillCloseCircle
            className="absolute right-6 text-3xl self-center cursor-pointer hover:scale-110"
            onClick={handleClose}
          />
        </div>
        <div className="flex flex-col gap-5 pt-10">
          <input
            type="text"
            placeholder={`New ${props.name}...`}
            className="py-5 px-6 rounded-lg bg-[#1E1D1D] focus:outline-none"
          />
          {errorMessage ? (
            <div className="flex justify-center gap-2 [&>*]:self-center">
              <AiFillInfoCircle />
              <span className="text-center text-red-500">{errorMessage}</span>
            </div>
          ) : (
            <></>
          )}
          <button
            type="submit"
            className="bg-[#584296] text-white md:px-20 rounded-lg py-3 md:text-xl md:self-center mt-4"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
