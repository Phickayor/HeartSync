"use client";
import React, { useEffect, useState } from "react";
import ButtonLoader from "../Loaders/ButtonLoader";
import Swal from "sweetalert2";
import { resetPassword } from "../Controllers/AuthController";
import { useRouter } from "next/navigation";

function ResetPassword({ resetToken }) {
  const [password, setPassword] = useState("");
  const [passwordTwo, setPasswordTwo] = useState("");
  const [loader, setLoader] = useState(false);
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoader(true);
      if (password !== passwordTwo) {
        Swal.fire({
          icon: "error",
          text: "Paswords must match"
        });
        return;
      }
      const newPassword = password;
      const response = await resetPassword(resetToken, newPassword);
      response.ok
        ? (Swal.fire({
            icon: "success",
            title: "Pasword Reset Succesful",
            text: "You can now login with your new password"
          }),
          router.push("/auth/"))
        : Swal.fire({
            icon: "error",
            title: "An error occured",
            text: response.message
          });
      setLoader(false);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    if (!resetToken) {
      router.push("/auth/");
    }
  });
  return (
    <div className="mx-auto w-10/12 lg:w-3/5 xl:w-2/5">
      <div className="md:px-10 md:py-8 p-5 rounded-xl">
        <div className="flex flex-col gap-5 text-center">
          <h1 className="auth-header">Reset Password</h1>
        </div>
        <form
          className="flex flex-col gap-3  md:gap-5 p-5 "
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col gap-2">
            <label>New Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-inherit rounded-lg py-2 focus:outline-none px-5 focus:border-[#584296] border"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label>Confirm Password</label>
            <input
              type="password"
              required
              value={passwordTwo}
              onChange={(e) => setPasswordTwo(e.target.value)}
              className="bg-inherit rounded-lg py-2 focus:outline-none px-5 focus:border-[#584296] border"
            />
          </div>
          <button type="submit" className="auth-btn">
            {loader ? <ButtonLoader /> : "Reset"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
