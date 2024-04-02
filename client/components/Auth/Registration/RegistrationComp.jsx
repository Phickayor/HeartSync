"use client";
import { RegContext } from "@/contexts/RegContext";
import React, { useReducer } from "react";

function RegistrationComp({ children }) {
  const initialState = {
    email: null,
    password: null,
    fullName: null,
    dob: null,
    userName: null,
    phoneNumber: null,
    height: null,
    gender: null,
    weight: null,
    profilePicture: null,
    longBio: null,
    displayPicture: null,
    shortBio: null,
    preferences: null
  };
  const reducer = (state, action) => {
    switch (action.type) {
      case "update":
        return { ...state, ...action.payload };
      default:
        return state;
    }
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <RegContext.Provider value={{ RegState: state, RegDispatch: dispatch }}>
      <div className="pattern-background fixed flex w-full h-screen">
        <div className="overflow-y-auto w-full">{children}</div>
      </div>
    </RegContext.Provider>
  );
}

export default RegistrationComp;
