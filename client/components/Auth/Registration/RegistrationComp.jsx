"use client";
import { RegContext } from "@/contexts/RegContext";
import React, { useReducer } from "react";

export const regInitialState = {
  email: null,
  password: null,
  fullName: null,
  dob: null,
  userName: null,
  phoneNumber: null,
  school: null,
  gender: null,
  profilePicture: null,
  longBio: null,
  cardPicture: null,
  shortBio: null,
  preferences: null
};
function RegistrationComp({ children, onClose }) {
  // const reducer = (state, action) => {
  //   if (action.type == "update") {
  //     return { ...state, ...action.payload };
  //   } else {
  //     return state;
  //   }
  // };
  // const [state, dispatch] = useReducer(reducer, regInitialState);
  return (
    // <RegContext.Provider value={{ RegState: state, RegDispatch: dispatch }}>
      <div className="bg-[#202020] text-white flex w-full h-screen">
        <div className="fixed flex flex-col top-0 left-0 overflow-hidden w-screen h-screen backdrop-blur-md bg-opacity-50">
          <div
            onClick={() => onClose()}
            className="absolute right-0 p-10 text-2xl z-30 cursor-pointer hover:text-red-500 text-white"
          >
            X
          </div>
          <div className="flex flex-col self-center place-content-center flex-1 gap-4 text-white font-outfit mx-auto w-full md:w-3/5 relative">
            {children}
          </div>
        </div>
      </div>
    // </RegContext.Provider>
  );
}

export default RegistrationComp;
