"use client";

import React, { useState } from "react";
import { checkExistingUser } from "../Controllers/AuthController";
import PopupModal from "./Registration/popup";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [modal, setModal] = useState({ isOpen: false, message: "" });

  const closeModal = () => setModal({ ...modal, isOpen: false });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    const trimmedEmail = email.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(trimmedEmail)) {
      setErrorMessage("Please enter a valid email address.");
      setIsLoading(false);
      return;
    }

    try {
      const { existingUser } = await checkExistingUser(trimmedEmail);
      if (!existingUser) {
        setModal({ isOpen: true, message: "We don't have an account with this email." });
      } else {
        setModal({ isOpen: true, message: "A reset link will be sent to your email." });
      }
    } catch (error) {
      console.error(error.message);
      if (!navigator.onLine) {
        setModal({ isOpen: true, message: "No internet connection. Please try again later." });
      } else {
        setModal({ isOpen: true, message: "An unexpected error occurred. Please try again." });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto w-10/12 lg:w-3/5 xl:w-2/5 flex flex-col gap-10">
      <div className="md:px-10 md:py-8 p-5 rounded-xl flex flex-col gap-5 bg-[#1B1B1B]">
        <div className="flex flex-col gap-2 md:gap-5 text-center">
          <h1 className="auth-header">Forgotten Password</h1>
        </div>
        {errorMessage && (
          <p className="text-[#FF8A60] text-center text-sm md:text-base">
            {errorMessage}
          </p>
        )}
        <form className="flex flex-col gap-3 md:gap-5 pt-5" onSubmit={handleSubmit}>
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
      {modal.isOpen && <PopupModal message={modal.message} onClose={closeModal} />}
    </div>
  );
}

export default ForgotPassword;
