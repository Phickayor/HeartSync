"use client"

import React, { useState } from "react";
import Link from "next/link";
import baseUrl from "../../config/server";
import ButtonLoader from "../Loaders/ButtonLoader";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loader, setLoader] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [modalMessage, setModalMessage] = useState(""); // Custom Modal Message
  const [showModal, setShowModal] = useState(false); // Modal Visibility
  const router = useRouter();

  const HandleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);
    setErrorMessage("");

    try {
      const res = await fetch(`${baseUrl}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        Cookies.set("token", JSON.stringify(data.token));
        setModalMessage("Login Successful! Redirecting...");
        setShowModal(true);
        setTimeout(() => {
          router.push("/admin");
        }, 2000);
      } else if (res.status === 403) {
        setModalMessage("User not found , kindly create an account to get started.");
        setShowModal(true);
      } else {
        setErrorMessage(data.error);
      }
    } catch (error) {
      console.log(error.message);
      setModalMessage("No internet connection. Please try again later.");
      setShowModal(true);
    } finally {
      setLoader(false);
    }
  };

  return (
    <div className="h-screen flex flex-col justify-center">
      {/* Modal Popup */}
      {showModal && (
         <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50 w-full">
         <div className="bg-[#202020] p-8 rounded-lg flex flex-col items-center gap-1 w-fit">
           <p className="text-lg text-white font-semibold">{modalMessage}</p>
           <div className="flex justify-between mt-6">
             <button
               onClick={() => setShowModal(false)}
               className="px-6 py-3 bg-[#444444] text-white font-bold rounded-lg hover:bg-gray-800 transition"
             >
               Ok
             </button>
           </div>
         </div>
       </div>
      )}

      <div className="md:w-4/6 lg:w-2/5 w-full md:h-fit h-full place-content-center md:place-content-start mx-auto py-5 px-8 bg-[#16161680] border-[#282828] border-1 rounded-lg">
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
            Login to your account
          </h1>
          {errorMessage && <p className="text-[#FF8A60] text-center text-sm md:text-base lg:text-lg">{errorMessage}</p>}
          <div className="flex flex-col gap-2">
            <label className="font-extralight">Email</label>
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
              className="bg-[#1A1818] focus:border py-2 px-4 focus:outline-none rounded-md"
            />
          </div>
          <div className="flex flex-col gap-2 relative">
            <label className="font-extralight">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
              className="bg-[#1A1818] py-2 px-4 focus:outline-none focus:border rounded-md"
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-9 cursor-pointer text-sm text-gray-400 mt-2"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          <button className="auth-btn">
            {loader ? <ButtonLoader /> : "Sign in"}
          </button>
          <div className="flex w-full mx-auto md:hidden justify-between [&>*]:self-center text-sm hover:[&>*]:scale-110 [&>*]:duration-150 py-4">
            <Link href="/auth/register">Create an account</Link>
            <Link href="/auth/forgot-password">Forgotten Password</Link>
          </div>
        </form>
      </div>
      <div className="hidden w-4/6 lg:w-2/5 mx-auto md:flex justify-between [&>*]:self-center hover:[&>*]:scale-110 [&>*]:duration-150 p-4 text-xs md:text-lg">
        <Link href="/auth/register">Create an account</Link>
        <Link href="/auth/forgot-password">Forgotten Password</Link>
      </div>
    </div>
  );
}

export default Login;
