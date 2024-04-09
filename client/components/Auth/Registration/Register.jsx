"use client";
import React, { useContext, useState } from "react";
import Swal from "sweetalert2";
import ButtonLoader from "../../Loaders/ButtonLoader";
import { checkExistingUser } from "@/components/Controllers/AuthController";
import { RegContext } from "@/contexts/RegContext";
import Link from "next/link";
function Register({ onNext }) {
  const [email, setEmail] = useState("");
  const [pswd1, setPswd1] = useState("");
  const [pswd2, setPswd2] = useState("");
  const [loader, SetLoader] = useState(false);
  const [pswdError, setPswdError] = useState("");
  var password;
  const regContext = useContext(RegContext);
  const handleMatchingPassword = () => {
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
        const response = await checkExistingUser(email);
        if (response.existingUser) {
          Swal.fire({
            title: "Existing User",
            text: response.message,
            icon: "error",
            timer: 5000
          });
        } else if (response.existingUser == null) {
          Swal.fire({
            title: "Oops",
            text: response.message,
            icon: "error",
            timer: 5000
          });
        } else {
          const payload = { email, password };
          regContext.RegDispatch({ type: "update", payload });
          onNext();
        }
      } else {
        setPswdError("*Password should be the same as above *");
      }
    } catch (error) {
      console.error(error.message);
    }
    SetLoader(false);
  };
  return (
    <div className="flex flex-col justify-center h-screen mx-auto w-10/12 lg:w-3/5 xl:w-2/5">
      <div className="md:px-10 md:py-8 p-5 rounded-xl">
        <h1 className="auth-header">Create an account</h1>
        <form className="flex flex-col gap-3 pt-5 " onSubmit={HandleSubmit}>
          <div className="flex flex-col gap-2">
            <label>Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              className="bg-inherit rounded-lg py-2 focus:outline-none px-5 focus:border-[#584296] border"
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
              className="bg-inherit rounded-lg py-2 focus:outline-none px-5 focus:border-[#584296] border"
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
              className="bg-inherit rounded-lg py-2 focus:outline-none px-5 focus:border-[#584296] border"
            />
            <span className="text-red-500">{pswdError}</span>
          </div>
          <button
            type="submit"
            className="bg-[#584296] text-white px-12 rounded-lg py-3 text-xl self-center"
          >
            {loader ? <ButtonLoader /> : "Next"}
          </button>
        </form>
      </div>
      <div className="flex justify-center [&>*]:self-center hover:[&>*]:scale-110 [&>*]:duration-150 p-4 text-lg">
        <Link href="/auth/">Already have an account?</Link>
      </div>
    </div>
  );
}

export default Register;
