"use client";
import React, { useContext, useState } from "react";
import Swal from "sweetalert2";
import ButtonLoader from "../../Loaders/ButtonLoader";
import { checkExistingUser } from "@/components/Controllers/AuthController";
import { RegContext } from "@/contexts/RegContext";
import About from "@/components/Auth/Registration/About";
import Description from "@/components/Auth/Registration/Description";
import ProfileSection from "@/components/Auth/Registration/ProfileSection";
import RegistrationComp from "@/components/Auth/Registration/RegistrationComp";
import Preference from "@/components/Auth/Registration/Preference";
import Link from "next/link";
import RegCardPreview from "./RegCardPreview";
function Register() {
  const regContext = useContext(RegContext);
  const [email, setEmail] = useState(regContext?.RegState?.email || "");
  const [pswd1, setPswd1] = useState(regContext?.RegState?.password || "");
  const [pswd2, setPswd2] = useState(regContext?.RegState?.password || "");
  const [loader, setLoader] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [pswdError, setPswdError] = useState("");
  const handleMatchingPassword = () => {
    try {
      return pswd1 === pswd2;
    } catch (error) {
      console.error(error.message);
    }
  };

  let [counter, setCounter] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const handleNext = () => {
    setCounter(++counter);
  };
  const handlePrev = () => {
    if (counter == 0) {
      setShowModal(false);
    } else {
      setCounter(--counter);
    }
  };
  const components = [
    <About key="about" onNext={handleNext} onPrev={handlePrev} />,
    <Description key="description" onNext={handleNext} onPrev={handlePrev} />,
    <ProfileSection key="profile" onNext={handleNext} onPrev={handlePrev} />,
    <RegCardPreview
      key="cardPreview"
      onNext={handleNext}
      onPrev={handlePrev}
    />,
    <Preference key="preference" action={"creation"} onPrev={handlePrev} />
  ];
  const HandleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoader(true);
      let comparePassword = handleMatchingPassword();
      if (comparePassword) {
        setPswdError("");
        const response = await checkExistingUser(email);
        if (response?.existingUser) {
          throw new Error(
            Swal.fire({
              title: "Existing User",
              text: response.message,
              icon: "error",
              timer: 5000
            })
          );
        }
        const payload = { email, password: pswd1 };
        regContext.RegDispatch({ type: "update", payload });
        setShowModal(true);
        setLoader(false);
      } else {
        setLoader(false);
        setPswdError("*Password should be the same as above *");
      }
    } catch (error) {
      setLoader(false);
      Swal.fire("Oops!", error.message, "error");
      console.error(error);
    }
    setLoader(false);
  };
  return (
    <div className="h-screen flex flex-col justify-center">
      <div className="md:w-4/6 lg:w-2/5 w-full md:h-fit h-full place-content-center mx-auto py-5 md:py-2 px-8 bg-[#16161680] border-[#282828] border-1 rounded-lg">
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
              type="email"
              required
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="bg-[#1A1818] py-2 px-4 focus:outline-none focus:border rounded-md"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-extralight">Password</label>
            <div className="relative">
              <input
                type={!showPassword ? "password" : "text"}
                required
                value={pswd1}
                onChange={(e) => setPswd1(e.target.value)}
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
          <div className="flex flex-col gap-2">
            <label className="font-extralight">Confirm Password</label>
            <input
              type={!showPassword ? "password" : "text"}
              onChange={(e) => setPswd2(e.target.value)}
              value={pswd2}
              required
              className="bg-[#1A1818] py-2 px-4 focus:outline-none focus:border rounded-md"
            />
            <p className="text-red-500">{pswdError}</p>
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
      {showModal && (
        <RegistrationComp
          onClose={() => {
            setCounter(0);
            setShowModal(false);
          }}
        >
          {components[counter]}
        </RegistrationComp>
      )}
      ;
    </div>
  );
}

export default Register;
