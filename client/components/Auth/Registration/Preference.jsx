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
  const [success, setSuccess] = useState("");
  const [errors, setErrors] = useState({
    interests: "",
    gender: "",
    traits: "",
    reason: "",
    general: "",
  });

  const [preferences, setPreferences] = useState({
    interests: [],
    gender: [],
    traits: [],
    reason: [],
  });

  const router = useRouter();
  const regContext = useContext(RegContext);

  const setActive = (e, type) => {
    e.preventDefault();
    const value = e.target.innerText;
    setPreferences((prev) => {
      const exists = prev[type].includes(value);
      const updated = exists
        ? prev[type].filter((item) => item !== value)
        : [...prev[type], value];
      return { ...prev, [type]: updated };
    });

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

      if (preferences.interests.length === 0) {
        validationErrors.interests = "Please select at least one interest.";
      }
      if (preferences.gender.length === 0) {
        validationErrors.gender = "Please select a gender of interest.";
      }
      if (preferences.traits.length === 0) {
        validationErrors.traits = "Please select at least one personality trait.";
      }
      if (preferences.reason.length === 0) {
        validationErrors.reason = "Please select a reason for joining.";
      }

      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        setLoader(false);
        return;
      }

      setSuccess("Successfully!");
      setErrors({ interests: "", gender: "", traits: "", reason: "", general: "" });

      if (action === "edit") {
        const values = { preferences: Object.values(preferences).flat() };
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
          payload: { preferences: Object.values(preferences).flat() },
        });
        setCreateAccount(true);
      }
    } catch (error) {
      setLoader(false);
      setErrors((prevErrors) => ({
        ...prevErrors,
        general: "An unexpected error occurred. Please try again later.",
      }));
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    if (action === "edit") {
      const fetchPreviousPreferences = async () => {
        const token = Cookies.get("token");
        const { user } = await GetUser(token);
        const categories = { interests: [], gender: [], traits: [], reason: [] };

        user.preferences.forEach((pref) => {
          if (interests.includes(pref)) categories.interests.push(pref);
          else if (["Male", "Female"].includes(pref)) categories.gender.push(pref);
          else if (traits.includes(pref)) categories.traits.push(pref);
          else if (["Make friends", "Relationships", "Fun Buddies"].includes(pref)) categories.reason.push(pref);
        });

        setPreferences(categories);
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

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  const interests = [
    "Sports", "Movies and Television", "Fashion", "Fitness", "Music",
    "Food & Cooking", "Technology", "Gaming",
  ];
  const traits = [
    "Introvert", "Extrovert", "Independent", "Dependent", "Creative", "Timid", "Bold",
    "Kind", "Muslim", "Christian", "Reserved", "Outspoken", "Easy going", "Empathetic",
  ];

  return (
    <div className={action === "creation" ? "pb-20 h-screen overflow-auto text-white bg-[#1B1B1B]" : "pb-20 h-screen overflow-auto text-white"}>
      {action === "creation" && (
        <div className="sticky top-0 mx-auto w-11/12 xl:w-4/5 py-6 backdrop-blur">
          <FaAngleLeft className="text-3xl font-extralight cursor-pointer" onClick={() => onPrev()} />
        </div>
      )}

      {Object.values(errors).some((error) => error) && (
        <div className="error-messages w-11/12 xl:w-4/5 mx-auto py-4 text-center rounded-lg mb-6 text-[#FF8A60] text-sm md:text-base xl:text-lg">
          {Object.values(errors)
            .filter((error) => error)
            .map((error, index) => (
              <p key={index} className="text-sm font-semibold">{error}</p>
            ))}
        </div>
      )}

      {success && (
        <div className="w-11/12 xl:w-4/5 mx-auto py-4 text-center rounded-lg mb-6 text-[#ff8a60] font-semibold text-sm md:text-base xl:text-lg">
          {success}
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
                className={preferences.interests.includes(interest) ? "active-preference-item" : "preference-item"}
              >
                {interest}
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <h3 className="font-medium text-xl">Gender Of Interest</h3>
          <div className="flex justify-around md:w-10/12 [&>*]:w-full gap-3 md:gap-6 ">
            {["Male", "Female"].map((gender) => (
              <div
                key={gender}
                onClick={(e) => setActive(e, "gender")}
                className={preferences.gender.includes(gender) ? "active-preference-item" : "preference-item"}
              >
                {gender}
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <h3 className="font-medium text-xl">Personality Traits</h3>
          <div className="flex flex-wrap gap-4 md:gap-6">
            {traits.map((trait) => (
              <div
                key={trait}
                onClick={(e) => setActive(e, "traits")}
                className={preferences.traits.includes(trait) ? "active-preference-item" : "preference-item"}
              >
                {trait}
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <h3 className="font-medium text-xl">Why did you join us</h3>
          <div className="flex flex-wrap gap-4 md:gap-6 ">
            {["Make friends", "Relationships", "Fun Buddies"].map((reason) => (
              <div
                key={reason}
                onClick={(e) => setActive(e, "reason")}
                className={preferences.reason.includes(reason) ? "active-preference-item" : "preference-item"}
              >
                {reason}
              </div>
            ))}
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
