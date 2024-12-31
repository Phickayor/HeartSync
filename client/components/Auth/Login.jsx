"use client";
import React, { useState } from "react";
import Link from "next/link";
import baseUrl from "../../config/server";
import ButtonLoader from "../Loaders/ButtonLoader";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loader, setLoader] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const HandleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);
    setErrorMessage("");

    // Email and password regex validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    if (!emailRegex.test(email)) {
      setLoader(false);
      return setErrorMessage("Invalid email format.");
    }

    if (!passwordRegex.test(password)) {
      setLoader(false);
      return setErrorMessage("Password must be at least 8 characters long and include both letters and numbers.");
    }

    try {
      const res = await fetch(`${baseUrl}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (res.ok) {
        Cookies.set("token", JSON.stringify(data.token));
        router.push("/admin");
      } else {
        setErrorMessage(data.message);
      }
    } catch (error) {
      console.log(error.message);
      setErrorMessage("Something went wrong! Check your internet connection and try again.");
    } finally {
      setLoader(false);
    }
  };

  return (
    <div className="h-screen flex flex-col justify-center">
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
          {errorMessage && <p className="text-red-500 text-center text-sm md:text-base lg:text-lg">{errorMessage}</p>}
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
              className="absolute right-4 top-9 cursor-pointer text-sm text-gray-400 mt-1"
            >
              {showPassword ? "Hide" : "Show"}
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
