"use client";
import baseUrl from "@/config/server";
import React, { useState } from "react";
import Swal from "sweetalert2";
import ButtonLoader from "../Loaders/ButtonLoader";
import Cookies from "js-cookie";
function Register(props) {
  const [email, setEmail] = useState("");
  const [pswd1, setPswd1] = useState("");
  const [pswd2, setPswd2] = useState("");
  const [loader, SetLoader] = useState(false);
  const [pswdError, setPswdError] = useState("");
  var password;
  const handleMatchingPassword = () => {
    // e.preventDefault();
    try {
      return pswd1 === pswd2 ? true : false;
    } catch (error) {
      console.error(error.message);
    }
  };
  const HandleSubmit = async (e) => {
    e.preventDefault();
    SetLoader(true);
    try {
      var comparePassword = handleMatchingPassword();
      if (comparePassword) {
        setPswdError("");
        password = pswd1;
        const res = await fetch(`${baseUrl}/auth/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ email, password })
        });
        const data = await res.json();

        res.ok
          ? (Cookies.set("token", JSON.stringify(data?.token)),
            Swal.fire({
              title: "Success!",
              text: "Account Created Successfully",
              icon: "success"
            }),
            props.contentHandler("about"))
          : Swal.fire({
              icon: "error",
              title: data.message
            });
      } else {
        setPswdError("*Password should be the same as above *");
      }
    } catch (error) {
      console.error(error.message);
    }
    SetLoader(false);
  };
  return (
    <div className="mx-auto w-10/12 lg:w-3/5 xl:w-2/5">
      <div className="bg-white md:px-10 md:py-8 p-5 rounded-xl">
        <h1 className="auth-header">Create an account</h1>
        <form
          className="flex flex-col gap-3  md:gap-5 pt-5 "
          onSubmit={HandleSubmit}
        >
          <div className="flex flex-col gap-2">
            <label>Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              className="bg-inputBg md:py-2 focus:outline-none px-5 focus:border-[#584296] border"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label>Password</label>
            <input
              type="password"
              required
              value={pswd1}
              onChange={(e) => {
                setPswd1(e.target.value);
              }}
              className="bg-inherit md:py-2 focus:outline-none px-5 focus:border-[#584296] border"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label>Confirm Password</label>
            <input
              type="password"
              required
              value={pswd2}
              onChange={(e) => {
                setPswd2(e.target.value);
              }}
              className="bg-inputBg md:py-2 focus:outline-none px-5 focus:border-[#584296] border"
            />
            <span className="text-red-500">{pswdError}</span>
          </div>
          <button
            type="submit"
            className="bg-[#584296] text-white md:px-12 rounded-lg py-3 md:text-xl md:self-center mt-4"
          >
            {loader ? <ButtonLoader /> : "Sign up"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
