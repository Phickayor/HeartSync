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
  const [loader, setLoader] = useState(false);
  const [pswdError, setPswdError] = useState("");
  let password;
  const regContext = useContext(RegContext);
  const handleMatchingPassword = () => {
    try {
      return pswd1 === pswd2;
    } catch (error) {
      console.error(error.message);
    }
  };
  const HandleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);
    try {
      let comparePassword = handleMatchingPassword();
      if (comparePassword) {
        setPswdError("");
        password = pswd1;
        const response = await checkExistingUser(email);
        if (response?.existingUser) {
          Swal.fire({
            title: "Existing User",
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
    setLoader(false);
  };
  return (
    <div className="h-screen flex flex-col justify-center">
      <div className="md:w-4/6 lg:w-2/5 w-full md:h-fit h-full place-content-center md:place-content-start mx-auto py-5 md:py-2 px-8 bg-[#16161680] border-[#282828] border-1 rounded-lg">
        <img
          src="/images/logo.svg"
          alt=""
          className="py-4 size-16 md:size-20 mx-auto self-center"
        />
        <form
          onSubmit={HandleSubmit}
          className="flex flex-col font-urbanist gap-5 py-5"
        >
          <h1 className="font-medium text-center text-4xl">
            Create an account
          </h1>
          <div className="flex flex-col gap-2">
            <label className="font-extralight">Email</label>
            <input
              type="text"
              className="bg-inherit border py-2 px-4 focus:outline-none focus:border-dashed rounded-md"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-extralight">Password</label>
            <input
              type="password"
              className="bg-inherit border py-2 px-4 focus:outline-none focus:border-dashed rounded-md"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-extralight">Confirm Password</label>
            <input
              type="password"
              className="bg-inherit border py-2 px-4 focus:outline-none focus:border-dashed rounded-md"
            />
          </div>
          <button className="auth-btn">
            {loader ? <ButtonLoader /> : "Sign up"}
          </button>
          <div className="text-center w-full mx-auto md:hidden [&>*]:self-center hover:[&>*]:scale-110 [&>*]:duration-150 p-4">
            <Link href="/auth/">Already have an account?</Link>
          </div>
        </form>
      </div>
      <div className="hidden w-4/6 mx-auto md:block [&>*]:self-center  text-center hover:[&>*]:scale-110 [&>*]:duration-150 p-4 text-xs md:text-lg">
        <Link href="/auth/">Already have an account?</Link>
      </div>
    </div>
  );
}

export default Register;
