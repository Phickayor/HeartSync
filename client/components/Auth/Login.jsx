"use client";
import React, { useState } from "react";
import Swal from "sweetalert2";
import Link from "next/link";
import baseUrl from "../../config/server";
import ButtonLoader from "../Loaders/ButtonLoader";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

function Login() {
  const [email, SetEmail] = useState();
  const [password, SetPassword] = useState();
  const [loader, SetLoader] = useState(false);
  const router = useRouter();

  const HandleSubmit = async (e) => {
    e.preventDefault();
    SetLoader(true);

    try {
      const res = await fetch(`${baseUrl}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      res.ok
        ? (Cookies.set("token", JSON.stringify(data.token)),
          Swal.fire({
            title: "Success!",
            text: "Login Successful",
            icon: "success"
          }),
          router.push("/admin"))
        : Swal.fire({
            icon: "error",
            title: data.message
          });
    } catch (error) {
      console.log(error.message);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong! Check your internet cnnection and try again"
      });
    }
    SetLoader(false);
  };
  return (
    <div className="mx-auto w-10/12 lg:w-3/5 xl:w-2/5">
      <div className=" md:px-10 md:py-8 p-5 rounded-xl">
        <h1 className="auth-header ">Login to your account</h1>
        <form
          className="flex flex-col gap-3  md:gap-5 pt-5"
          onSubmit={HandleSubmit}
        >
          <div className="flex flex-col gap-2">
            <label>Email</label>
            <input
              type="email"
              required
              onChange={(e) => SetEmail(e.target.value)}
              className="bg-inherit rounded-lg py-2 focus:outline-none px-5 focus:border-[#584296] border"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label>Password</label>
            <input
              type="password"
              required
              onChange={(e) => SetPassword(e.target.value)}
              className="bg-inherit rounded-lg py-2 focus:outline-none px-5 focus:border-[#584296] border"
            />
          </div>
          <button
            type="submit"
            className="bg-[#584296] text-white md:px-12 rounded-lg py-3 md:text-xl md:self-center mt-4"
          >
            {loader ? <ButtonLoader /> : "Sign in"}
          </button>
        </form>
      </div>
      <div className="flex justify-between [&>*]:self-center hover:[&>*]:scale-110 [&>*]:duration-150 p-4 text-lg">
        <Link href="/auth/register">Create an account</Link>
        <Link href="/auth/forgot-password">Forgotten Password</Link>
      </div>
    </div>
  );
}

export default Login;
