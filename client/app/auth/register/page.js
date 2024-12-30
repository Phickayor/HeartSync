"use client";

import Register from "@/components/Auth/Registration/Register";
import About from "@/components/Auth/Registration/About";
import Description from "@/components/Auth/Registration/Description";
import ProfileSection from "@/components/Auth/Registration/ProfileSection";
import React, { useState } from "react";
import RegistrationComp from "@/components/Auth/Registration/RegistrationComp";
import Preference from "@/components/Auth/Registration/Preference";
// import CardPreview from "@/components/Auth/Registration/CardPreview";

function Page() {
  const [showPopup, setShowPopup] = useState(false);
  const [currentComponentIndex, setCurrentComponentIndex] = useState(0);
  const [isFormValid, setIsFormValid] = useState(true); // Track form validation

  // Validation functions
  const validateAbout = () => {
    // Implement validation logic for the About component
    const isValid = true; // Replace with actual validation logic
    setIsFormValid(isValid);
  };

  const validateDescription = () => {
    // Implement validation logic for the Description component
    const isValid = true; // Replace with actual validation logic
    setIsFormValid(isValid);
  };

  const validateProfileSection = () => {
    // Implement validation logic for the ProfileSection component
    const isValid = true; // Replace with actual validation logic
    setIsFormValid(isValid);
  };

  // const validateCardPreview = () => {
  //   // Implement validation logic for the CardPreview component
  //   const isValid = true; // Replace with actual validation logic
  //   setIsFormValid(isValid);
  // };

  const validatePreference = () => {
    // Implement validation logic for the Preference component
    const isValid = true; // Replace with actual validation logic
    setIsFormValid(isValid);
  };

  const components = [
    <About onNext={() => handleNextComponent()} onValidate={validateAbout} />, 
    <Description onNext={() => handleNextComponent()} onValidate={validateDescription} />, 
    <ProfileSection onNext={() => handleNextComponent()} onValidate={validateProfileSection} />,
    // <CardPreview onNext={() => handleNextComponent()} action={"creation"} onValidate={validateCardPreview} />, 
    <Preference action={"creation"} onNext={() => alert('Preference Saved!')} onValidate={validatePreference} />
  ];

  const handleOpenPopup = () => {
    setShowPopup(true);
  };

  const handleNextComponent = () => {
    if (isFormValid && currentComponentIndex < components.length - 1) {
      setCurrentComponentIndex(currentComponentIndex + 1);
    } else if (currentComponentIndex === components.length - 1) {
      setShowPopup(false); // Close popup when last step is done
    }
  };

  const handlePreviousComponent = () => {
    if (currentComponentIndex > 0) {
      setCurrentComponentIndex(currentComponentIndex - 1);
    }
  };

  return (
    <>
      <RegistrationComp>
        <Register key="register" onNext={handleOpenPopup} />
      </RegistrationComp>

      {showPopup && (
        <div className="fixed inset-0 flex flex-col justify-center h-screen mx-auto w-10/12 lg:w-3/5 gap-10 items-center py-5 r rounded-2xl md:w-10/12 bg-gray-800 bg-opacity-50">
          <div className="bg-[#161616] shadow-lg max-w-md w-full md:px-10 md:py-8 p-5 rounded-xl flex flex-col text-white gap-5">
            {components[currentComponentIndex]}
            
            <div className="flex justify-between">
              {currentComponentIndex > 0 && (
                <button
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg"
                  onClick={handlePreviousComponent}
                >
                  Back
                </button>
              )}
              <button
                className={`${
                  !isFormValid ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 m"
                } text-white px-4 py-2 rounded-lg`}
                onClick={handleNextComponent}
                disabled={!isFormValid}
              >
                {currentComponentIndex === components.length - 1 ? "Finish" : "Next"}
              </button>
            </div>

            {!isFormValid && (
              <div className="text-red-500 text-sm mt-2">
                Please complete the required fields to proceed.
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default Page;
