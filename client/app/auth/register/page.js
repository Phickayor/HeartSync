"use client";

import Register from "@/components/Auth/Registration/Register";
import { regInitialState } from "@/components/Auth/Registration/RegistrationComp";
import { RegContext } from "@/contexts/RegContext";
import React, { useReducer } from "react";

function Page() {
  const reducer = (state, action) => {
    if (action.type == "update") {
      return { ...state, ...action.payload };
    } else {
      return state;
    }
  };
  const [state, dispatch] = useReducer(reducer, regInitialState);
  return (
    <RegContext.Provider value={{ RegState: state, RegDispatch: dispatch }}>
      <div className="flex flex-col justify-center h-screen fixed w-full bg-[#202020] text-white">
        <Register />
      </div>
    </RegContext.Provider>
  );
}

export default Page;
