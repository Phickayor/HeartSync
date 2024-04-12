import React, { useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";

function EditProfile({ onClose, name, keyName, onSubmit }) {
  const [value, setValue] = useState("");
  return (
    <div
      className={`fixed top-0 left-0  bg-opacity-20 bg-black h-screen z-20 w-screen flex flex-col justify-center`}
    >
      <div className="p-6 py-8 rounded-xl border border-white bg-white mx-auto w-10/12 md:w-2/5">
        <div className="relative flex justify-center">
          <h1 className="text-center md:text-2xl text-lg self-center">
            Edit {name}
          </h1>
          <AiFillCloseCircle
            className="absolute right-6 text-3xl self-center cursor-pointer hover:scale-110"
            onClick={onClose}
          />
        </div>
        <form
          className="flex flex-col gap-5 py-5 md:pt-10"
          onSubmit={(e) => onSubmit(e, keyName, value)}
        >
          <input
            type={
              keyName == "phoneNumber"
                ? "number"
                : keyName == "password"
                ? "password"
                : "text"
            }
            placeholder={`New ${name}...`}
            name={keyName}
            onChange={(e) => {
              setValue(e.target.value);
            }}
            className="md:py-5 py-4 px-6 rounded-lg bg-[#1E1D1D] text-center md:text-start text-white focus:outline-none"
          />
          <button
            type="submit"
            className="bg-[#584296]  text-white px-16 md:px-20 rounded-lg py-3 md:text-xl self-center md:mt-4"
          >
            Next
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditProfile;
