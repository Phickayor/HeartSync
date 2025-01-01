"use client";
import React, { useContext, useState } from "react";
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
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const handleMatchingPassword = () => {
    return pswd1 === pswd2;
  };

  let [counter, setCounter] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const handleNext = () => {
    setCounter((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (counter === 0) {
      setShowModal(false); // Close the modal if on the first step
    } else {
      setCounter((prev) => prev - 1);
    }
  };

  const components = [
    <About key="about" onNext={handleNext} onPrev={handlePrev} />,
    <Description key="description" onNext={handleNext} onPrev={handlePrev} />,
    <ProfileSection key="profile" onNext={handleNext} onPrev={handlePrev} />,
    <RegCardPreview key="cardPreview" onNext={handleNext} onPrev={handlePrev} />,
    <Preference key="preference" action={"creation"} onPrev={handlePrev} />
  ];

  const HandleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoader(true);

      // Validation checks
      if (!emailRegex.test(email)) {
        setErrorMessage("Invalid email format");
        setShowModal(true); // Show modal with error
        setLoader(false);
        return;
      }

      if (!passwordRegex.test(pswd1)) {
        setErrorMessage("Password must be at least 8 characters long, contain one uppercase, one lowercase, one number, and one special character.");
        setLoader(false);
        return;
      }

      if (!handleMatchingPassword()) {
        setErrorMessage("Passwords do not match");
        setLoader(false);
        return;
      }

      const response = await checkExistingUser(email);
      if (response?.existingUser) {
        setErrorMessage(response.message);
        setLoader(false);
        return;
      }

      const payload = { email, password: pswd1 };
      regContext.RegDispatch({ type: "update", payload });

      // Show modal and initialize counter
      setShowModal(true);
      setLoader(false);
    } catch (error) {
      setLoader(false);
      setErrorMessage(error.message);
      console.error(error);
    }
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
          {errorMessage && <p className="text-red-500 text-center text-sm md:text-base lg:text-lg">{errorMessage}</p>}
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
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-extralight">Confirm Password</label>
            <div className="relative">
              <input
                type={!showConfirmPassword ? "password" : "text"}
                required
                value={pswd2}
                onChange={(e) => setPswd2(e.target.value)}
                className="bg-[#1A1818] py-2 px-4 focus:outline-none focus:border rounded-md w-full"
              />
              <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                <svg
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
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
              </span>
            </div>
          </div>
          <button className="auth-btn">
            {loader ? <ButtonLoader /> : "Sign up"}
          </button>
          <div className="text-center text-sm w-full mx-auto md:hidden [&>*]:self-center hover:[&>*]:scale-110 [&>*]:duration-150 p-4">
            <Link href="/auth/">Already have an account?</Link>
          </div>
        </form>
      </div>

      {/* Modal Display */}
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
    </div>
  );
}

export default Register;
