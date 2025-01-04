"use client";
import React, { useEffect, useState } from "react";
import ButtonLoader from "../Loaders/ButtonLoader";
import { resetPassword } from "../Controllers/AuthController";
import { useRouter } from "next/navigation";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Importing icons for show/hide password// Import the modal component
import PopupModal from "./Registration/popup";

function ResetPassword({ resetToken }) {
  const [password, setPassword] = useState("");
  const [passwordTwo, setPasswordTwo] = useState("");
  const [loader, setLoader] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isPasswordTwoVisible, setIsPasswordTwoVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState(""); // Store the modal message
  const router = useRouter();

  // Regex pattern for password validation
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoader(true);
      setErrorMessage(""); // Clear any previous errors

      if (password !== passwordTwo) {
        setErrorMessage("Passwords must match.");
        setLoader(false);
        return;
      }

      if (!passwordRegex.test(password)) {
        setErrorMessage(
          "Password must be at least 8 characters long, contain one uppercase letter, one number, and one special character."
        );
        setLoader(false);
        return;
      }

      const newPassword = password;
      const response = await resetPassword(resetToken, newPassword);

      if (response.ok) {
        setLoader(false);
        setModalMessage("Your password has been successfully reset.");
        setTimeout(() => router.push("/auth/"), 3000); // Redirect after 3 seconds
      } else {
        setErrorMessage(response.message || "An error occurred. Please try again.");
        setLoader(false);
      }
    } catch (error) {
      setErrorMessage(error?.message || "Something went wrong. Please try again later.");
      setLoader(false);

      // Handle no internet connection scenario
      if (!navigator.onLine) {
        setModalMessage("Please check your internet connection and try again.");
      }
    }
  };

  useEffect(() => {
    if (!resetToken) {
      router.push("/auth/");
    }
  }, [resetToken]);

  return (
    <div className="mx-auto w-10/12 lg:w-3/5 xl:w-2/5 flex flex-col gap-10">
      <img src="/images/logo.svg" className="mx-auto lg:hidden" alt="Logo" />
      <div className="md:px-10 md:py-8 p-5 rounded-xl flex flex-col gap-5">
        <h1 className="auth-header">Reset Password</h1>

        {errorMessage && (
          <div className="text-[#FF8A60] mt-2 text-sm sm:text-base md:text-lg lg:text-xl">
            {errorMessage}
          </div>
        )}

        <form
          className="flex flex-col gap-3 md:gap-5 md:p-5"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col gap-2 relative">
            <label htmlFor="password">New Password</label>
            <input
              type={isPasswordVisible ? "text" : "password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-inherit rounded-lg py-2 focus:outline-none px-5 focus:border-[#584296] border"
              aria-label="New Password"
              id="password"
            />
            <button
              type="button"
              onClick={() => setIsPasswordVisible(!isPasswordVisible)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600"
            >
              {isPasswordVisible ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <div className="flex flex-col gap-2 relative">
            <label htmlFor="passwordTwo">Confirm Password</label>
            <input
              type={isPasswordTwoVisible ? "text" : "password"}
              required
              value={passwordTwo}
              onChange={(e) => setPasswordTwo(e.target.value)}
              className="bg-inherit rounded-lg py-2 focus:outline-none px-5 focus:border-[#584296] border"
              aria-label="Confirm Password"
              id="passwordTwo"
            />
            <button
              type="button"
              onClick={() => setIsPasswordTwoVisible(!isPasswordTwoVisible)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600"
            >
              {isPasswordTwoVisible ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <button
            type="submit"
            className="auth-btn"
            disabled={loader}
            aria-label="Submit Password Reset"
          >
            {loader ? <ButtonLoader /> : "Reset"}
          </button>
        </form>
      </div>

      {/* Success/Error Modal */}
      <PopupModal message={modalMessage} onClose={() => setModalMessage("")} />
    </div>
  );
}

export default ResetPassword;
