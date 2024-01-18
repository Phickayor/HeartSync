import React from "react";

export default function Verify() {
  return (
    <div className="mx-auto w-10/12 lg:w-3/5 xl:w-2/5">
      <div className="bg-white md:px-10 md:py-8 p-5 rounded-xl">
        <div className="flex flex-col gap-5 text-center">
          <h1 className="text-2xl md:text-3xl font-semibold">Verify Mail</h1>
          <p className="font-light leading-2 mx-auto w-4/5">
            A 6 digit code was sent to{" "}
            <b className="font-semibold">tapeyjunior@gmail.com</b> kindly input
            code
          </p>
        </div>
        <form className="flex flex-col gap-3  md:gap-5 p-5 ">
          <div className="flex flex-col gap-2">
            <input
              type="email"
              className="bg-inputBg md:py-2 focus:outline-none px-5 focus:border-[#584296] border"
            />
          </div>
          <button className="bg-[#584296] text-white md:px-12 rounded-lg py-3 md:text-xl md:self-center mt-4">
            Verify
          </button>
        </form>
      </div>
    </div>
  );
}

export function ForgotPassword() {
  return (
    <div className="mx-auto w-10/12 lg:w-3/5 xl:w-2/5">
      <div className="bg-white md:px-10 md:py-8 p-5 rounded-xl">
        <div className="flex flex-col gap-5 text-center">
          <h1 className="text-2xl md:text-3xl font-semibold">
            Forgotten Password
          </h1>
          <p className="font-light leading-2 mx-auto w-4/5">
            A reset link would be sent to your mail
          </p>
        </div>
        <form className="flex flex-col gap-3  md:gap-5 p-5 ">
          <div className="flex flex-col gap-2">
            <label>Email</label>
            <input
              type="email"
              className="bg-inputBg md:py-2 focus:outline-none px-5 focus:border-[#584296] border"
            />
          </div>
          <button className="bg-[#584296] text-white md:px-12 rounded-lg py-3 md:text-xl md:self-center mt-4">
            Reset
          </button>
        </form>
      </div>
    </div>
  );
}

export function ResetPassword() {
  return (
    <div className="mx-auto w-10/12 lg:w-3/5 xl:w-2/5">
      <div className="bg-white md:px-10 md:py-8 p-5 rounded-xl">
        <div className="flex flex-col gap-5 text-center">
          <h1 className="text-2xl md:text-3xl font-semibold">Reset Password</h1>
        </div>
        <form className="flex flex-col gap-3  md:gap-5 p-5 ">
          <div className="flex flex-col gap-2">
            <label>New Password</label>
            <input
              type="email"
              className="bg-inputBg md:py-2 focus:outline-none px-5 focus:border-[#584296] border"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label>Confirm Password</label>
            <input
              type="email"
              className="bg-inputBg md:py-2 focus:outline-none px-5 focus:border-[#584296] border"
            />
          </div>
          <button className="bg-[#584296] text-white md:px-12 rounded-lg py-3 md:text-xl md:self-center mt-4">
            Reset
          </button>
        </form>
      </div>
    </div>
  );
}