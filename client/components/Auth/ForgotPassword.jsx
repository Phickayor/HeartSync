"use client"

import React, { useState } from "react";
import { checkExistingUser } from "../Controllers/AuthController";// Import the Modal component
import PopupModal from "./Registration/popup";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const HandleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setModalMessage(""); // Reset modal message

    try {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setErrorMessage("Please enter a valid email address");
        setIsLoading(false);
        return;
      }

      const { existingUser } = await checkExistingUser(email);
      if (!existingUser) {
        setModalMessage("We don't have an account with this email.");
        setIsModalOpen(true);
      } else {
        setModalMessage("A reset link has been sent to your email.");
        setIsModalOpen(true);
      }
    } catch (error) {
      console.error(error.message);
      setModalMessage("No internet connection. Please try again later.");
      setIsModalOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto w-10/12 lg:w-3/5 xl:w-2/5 flex flex-col gap-10">
      <div className="md:px-10 md:py-8 p-5 rounded-xl flex flex-col gap-5 bg-[#1B1B1B]">
        <div className="flex flex-col gap-2 md:gap-5 text-center">
          <h1 className="auth-header">Forgotten Password</h1>
          <p className="font-thin leading-2 mx-auto w-4/5">
            A reset link will be sent to your email
          </p>
        </div>
        {errorMessage && (
          <p className="text-[#FF8A60] text-center text-sm md:text-base">
            {errorMessage}
          </p>
        )}
        <form className="flex flex-col gap-3 md:gap-5 pt-5" onSubmit={HandleSubmit}>
          <div className="flex flex-col gap-2">
            <input
              className="py-4 rounded-lg font-light bg-[#202020] px-5 focus:outline-none"
              type="email"
              required
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              placeholder="Email Address"
            />
          </div>
          <button type="submit" className="auth-btn" disabled={isLoading}>
            {isLoading ? "Sending..." : "Send Mail"}
          </button>
        </form>
      </div>

      {/* Modal for success/error */}
      {isModalOpen && <PopupModal message={modalMessage} onClose={closeModal} />}
    </div>
  );
}

export default ForgotPassword;
