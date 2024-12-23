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
        Swal.fire({
          title: "Success!",
          text: "Login Successful",
          icon: "success",
          confirmButtonColor: "#F15A24"
        }).then(async (result) => {
          if (result.isConfirmed) {
            const setToken = Cookies.set("token", JSON.stringify(data.token));
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
              className="bg-inherit border py-2 px-4 focus:outline-none focus:border-dashed rounded-md"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-extralight">Password</label>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
              className="bg-inherit border py-2 px-4 focus:outline-none focus:border-dashed rounded-md"
            />
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
