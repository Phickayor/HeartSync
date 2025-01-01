"use client";
import React, { useEffect, useContext, useState } from "react";
import ButtonLoader from "../../Loaders/ButtonLoader";
import { EditUser, GetUser } from "../../Controllers/UserController";
import { useRouter } from "next/navigation";
import { RegContext } from "@/contexts/RegContext";
import { createUser } from "@/components/Controllers/AuthController";
import { FaAngleLeft } from "react-icons/fa";
import Cookies from "js-cookie";

function Preference({ onPrev, action }) {
  const [createAccount, setCreateAccount] = useState(false);
  const [loader, setLoader] = useState(false);
  const [errors, setErrors] = useState({
    interests: "",
    gender: "",
    traits: "",
    reason: "",
    general: "",
  }); // State for each field's error messages
  const router = useRouter();
  const [chosenPreference, setChosenPreferences] = useState([]);
  const regContext = useContext(RegContext);

  const setActive = (e, type) => {
    e.preventDefault();
    let preference = chosenPreference.find((item) => item == e.target.innerText);
    if (!preference) {
      setChosenPreferences([...chosenPreference, e.target.innerText]);
    } else {
      let filter = chosenPreference.filter((item) => item != e.target.innerText);
      setChosenPreferences(filter);
    }
    // Clear error for that field when user interacts
    setErrors((prevErrors) => ({ ...prevErrors, [type]: "" }));
  };

  const handleRegistration = async () => {
    const response = await createUser(regContext.RegState);
    if (response.ok) {
      router.push("/auth/");
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        general: "An error occurred while creating your account. Please try again.",
      }));
      setLoader(false);
      router.push("/auth/register");
    }
    setLoader(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoader(true);
      let validationErrors = {};

      // Validate Interests
      if (chosenPreference.length === 0) {
        validationErrors.interests = "Please select at least one interest.";
      }

      // Validate Gender (ensure at least one gender is selected)
      if (!chosenPreference.includes("Male") && !chosenPreference.includes("Female")) {
        validationErrors.gender = "Please select a gender of interest.";
      }

      // Validate Traits
      if (chosenPreference.length === 0) {
        validationErrors.traits = "Please select at least one personality trait.";
      }

      // Validate Reason for Joining
      if (!chosenPreference.includes("Make friends") && !chosenPreference.includes("Relationships") && !chosenPreference.includes("Fun Buddies")) {
        validationErrors.reason = "Please select a reason for joining.";
      }

      // If there are validation errors, update the state and stop submission
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        setLoader(false);
        return;
      }

      // Proceed with registration or edit logic if no errors
      if (action === "edit") {
        const values = { preferences: chosenPreference };
        const token = Cookies.get("token");
        let profile = await EditUser(values, token);
        if (profile.success) {
          router.back();
        } else {
          setErrors((prevErrors) => ({ ...prevErrors, general: profile.message }));
        }
      }

      if (action === "creation") {
        regContext.RegDispatch({
          type: "update",
          payload: { preferences: chosenPreference },
        });
        setCreateAccount(true);
      }
    } catch (error) {
      setLoader(false);
      setErrors((prevErrors) => ({ ...prevErrors, general: "An unexpected error occurred. Please try again later." }));
    }
  };

  const interests = [
    "Sports",
    "Movies and Television",
    "Fashion",
    "Fitness",
    "Music",
    "Food & Cooking",
    "Technology",
    "Gaming",
  ];
  const traits = [
    "Introvert",
    "Extrovert",
    "Independent",
    "Dependent",
    "Creative",
    "Timid",
    "Bold",
    "Kind",
    "Muslim",
    "Christian",
    "Reserved",
    "Outspoken",
    "Easy going",
    "Empathetic",
  ];

  useEffect(() => {
    if (action === "edit") {
      const fetchPreviousPreferences = async () => {
        const token = Cookies.get("token");
        const { user } = await GetUser(token);
        setChosenPreferences(user.preferences);
      };
      fetchPreviousPreferences();
    }
  }, []);

  useEffect(() => {
    if (createAccount) {
      handleRegistration();
      setCreateAccount(false);
    }
  }, [createAccount]);

  return (
    <div className={action === "creation" ? "pb-20 h-screen overflow-auto text-white bg-[#1B1B1B]" : "pb-20 h-screen overflow-auto text-white"}>
      {action === "creation" && (
        <div className="sticky top-0 mx-auto w-11/12 xl:w-4/5 py-6 backdrop-blur">
          <FaAngleLeft className="text-3xl font-extralight cursor-pointer" onClick={() => onPrev()} />
        </div>
      )}

      {/* Display all error messages at the top */}
      {Object.values(errors).some((error) => error) && (
        <div className="error-messages w-11/12 xl:w-4/5 mx-auto py-4 text-center rounded-lg mb-6 text-red-500 text-sm md:text-base xl:text-lg">
          {Object.values(errors)
            .filter((error) => error)
            .map((error, index) => (
              <p key={index} className="text-sm font-semibold">{error}</p>
            ))}
        </div>
      )}

      <form onSubmit={handleSubmit} className="mx-auto w-11/12 xl:w-4/5 flex flex-col gap-8 py-8 pt-5">
        <div className="flex flex-col gap-6">
          <h3 className="font-medium text-xl">Choose your interests</h3>
          <div className="flex flex-wrap gap-4 md:gap-6">
            {interests.map((interest) => (
              <div
                key={interest}
                onClick={(e) => setActive(e, "interests")}
                className={chosenPreference?.includes(interest) ? "active-preference-item" : "preference-item"}
              >
                {interest}
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <h3 className="font-medium text-xl">Gender Of Interest</h3>
          <div className="flex justify-around md:w-10/12 [&>*]:w-full gap-3 md:gap-6 ">
            <div
              onClick={(e) => setActive(e, "gender")}
              className={chosenPreference?.includes("Male") ? "active-preference-item" : "preference-item"}
            >
              Male
            </div>
            <div
              onClick={(e) => setActive(e, "gender")}
              className={chosenPreference?.includes("Female") ? "active-preference-item" : "preference-item"}
            >
              Female
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <h3 className="font-medium text-xl">Personality Traits</h3>
          <div className="flex flex-wrap gap-4 md:gap-6">
            {traits.map((trait) => (
              <div
                key={trait}
                onClick={(e) => setActive(e, "traits")}
                className={chosenPreference?.includes(trait) ? "active-preference-item" : "preference-item"}
              >
                {trait}
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <h3 className="font-medium text-xl">Why did you join us</h3>
          <div className="flex flex-wrap gap-4 md:gap-6 ">
            <div
              onClick={(e) => setActive(e, "reason")}
              className={chosenPreference?.includes("Make friends") ? "active-preference-item" : "preference-item"}
            >
              Make friends
            </div>
            <div
              onClick={(e) => setActive(e, "reason")}
              className={chosenPreference?.includes("Relationships") ? "active-preference-item" : "preference-item"}
            >
              Relationships
            </div>
            <div
              onClick={(e) => setActive(e, "reason")}
              className={chosenPreference?.includes("Fun Buddies") ? "active-preference-item" : "preference-item"}
            >
              Fun Buddies
            </div>
          </div>
        </div>

        <button type="submit" className="bg-[#FFEBE4] hover:bg-[#F15A24] text-black duration-300 hover:text-white mx-auto md:mx-0 w-fit px-16 rounded-lg py-3 md:text-xl">
          {loader ? <ButtonLoader /> : "Save"}
        </button>
      </form>
    </div>
  );
}

export default Preference;
