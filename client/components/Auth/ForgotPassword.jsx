"use client";
import React, { useState } from "react";
import { checkExistingUser } from "../Controllers/AuthController";
import Swal from "sweetalert2";
function ForgotPassword() {
  const [email, setEmail] = useState("");
  const HandleSubmit = async (e) => {
    try {
      e.preventDefault();
      const { existingUser } = await checkExistingUser(email);
      if (!existingUser) {
        Swal.fire();
      }
    } catch (error) {
      console.error(error.message);
    }
  };
  return (
    <div className="mx-auto w-10/12 lg:w-3/5 xl:w-2/5 flex flex-col gap-10">
      <img src="/images/logo.svg" className="mx-auto lg:hidden" alt="" />
      <div className=" md:px-10 md:py-8 p-5 rounded-xl flex flex-col gap-5">
        <div className="flex flex-col gap-2 md:gap-5 text-center">
          <h1 className="auth-header">Forgotten Password</h1>
          <p className="font-thin  leading-2 mx-auto w-4/5">
            A reset link would be sent to your mail
          </p>
        </div>
        <form
          className="flex flex-col gap-3  md:gap-5 pt-5"
          onSubmit={HandleSubmit}
        >
          <div className="flex flex-col gap-2">
            <label>Email</label>
            <input
              type="email"
              required
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="bg-inherit rounded-lg py-2 focus:outline-none px-5 focus:border-[#584296] border"
            />
          </div>
          <button type="submit" className="auth-btn">
            Send Mail
          </button>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
