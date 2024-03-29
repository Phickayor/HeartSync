import React, { useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";

function EditProfile({ onClose, name, keyName, onSubmit }) {
  const [value, setValue] = useState("");
  return (
    <div
      className={`fixed top-0 left-0  h-screen z-20 w-screen flex flex-col justify-center`}
    >
      <div className="p-6 py-8 rounded-xl bg-[#262626] border border-white text-white mx-auto w-2/5">
        <div className="relative flex justify-center">
          <h1 className="text-center text-2xl self-center">Edit {name}</h1>
          <AiFillCloseCircle
            className="absolute right-6 text-3xl self-center cursor-pointer hover:scale-110"
            onClick={onClose}
          />
        </div>
        <form
          className="flex flex-col gap-5 pt-10"
          onSubmit={(e) => onSubmit(e, keyName, value)}
        >
          <input
            type={keyName == "phoneNumber" ? "number" : "text"}
            placeholder={`New ${name}...`}
            name={keyName}
            onChange={(e) => {
              setValue(e.target.value);
            }}
            className="py-5 px-6 rounded-lg bg-[#1E1D1D] focus:outline-none"
          />
          <button
            type="submit"
            className="bg-[#584296] text-white md:px-20 rounded-lg py-3 md:text-xl md:self-center mt-4"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditProfile;
