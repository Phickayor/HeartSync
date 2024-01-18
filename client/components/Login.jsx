import React from "react";

function Login() {
  return (
    <div className="mx-auto w-10/12 lg:w-3/5 xl:w-2/5">
      <div className="bg-white md:px-10 md:py-8 p-5 rounded-xl">
        <h1 className="text-2xl md:text-3xl text-center">Login to your account</h1>
        <form className="flex flex-col gap-3  md:gap-5 pt-5 ">
          <div className="flex flex-col gap-2">
            <label>Email</label>
            <input
              type="email"
              className="bg-inputBg md:py-2 focus:outline-none px-5 focus:border-[#584296] border"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label>Password</label>
            <input
              type="password"
              className="bg-inputBg md:py-2 focus:outline-none px-5 focus:border-[#584296] border"
            />
          </div>
          <button className="bg-[#584296] text-white md:px-12 rounded-lg py-3 md:text-xl md:self-center mt-4">
            Sign in
          </button>
        </form>
      </div>
      <div className="hidden md:flex justify-between [&>*]:self-center text-white p-4 text-lg">
        <a href="">Create an account</a>
        <a href="">Forgotten Password</a>
      </div>
    </div>
  );
}

export default Login;
