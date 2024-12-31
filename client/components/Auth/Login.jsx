"use client";
import React, { useState } from "react";
import Swal from "sweetalert2";
import Link from "next/link";
import baseUrl from "../../config/server";
import ButtonLoader from "../Loaders/ButtonLoader";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loader, setLoader] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const HandleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);

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
        const setToken = Cookies.set("token", JSON.stringify(data.token));
        Swal.fire({
          title: "Success!",
          text: "Login Successful",
          icon: "success",
          confirmButtonColor: "#F15A24"
        }).then(async (result) => {
          if (result.isConfirmed) {
            setToken && router.push("/admin");
          }
        });
      } else {
        Swal.fire({
          icon: "error",
          title: data.message
        });
      }
    } catch (error) {
      console.log(error.message);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong! Check your internet cnnection and try again"
      });
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
          <div className="flex flex-col gap-2">
            <label className="font-extralight">Password</label>
            <div className="relative">
              <input
                type={!showPassword ? "password" : "text"}
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
                className="bg-[#1A1818] py-2 px-4 focus:outline-none focus:border rounded-md w-full"
              />
              <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                {showPassword && (
                  <svg
                    onClick={() => setShowPassword(!showPassword)}
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-4 text-gray-400 hover:text-btnColor cursor-pointer"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                )}
                {!showPassword && (
                  <svg
                    onClick={() => setShowPassword(!showPassword)}
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-4 text-gray-400 hover:text-btnColor cursor-pointer"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 4l16 16" // Adds the slash line
                    />
                  </svg>
                )}
              </span>
            </div>
          </div>
          <button className="auth-btn">
            {loader ? <ButtonLoader /> : "Sign in"}
          </button>
          <div className="flex w-full mx-auto md:hidden justify-between [&>*]:self-center hover:[&>*]:scale-110 [&>*]:duration-150 p-4">
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
