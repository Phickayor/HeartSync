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
  const [showModal, setShowModal] = useState(false);
  const [errors, setErrors] = useState({
    interests: "",
    gender: "",
    traits: "",
    reason: "",
    general: "",
  });

  const router = useRouter();
  const [chosenPreference, setChosenPreferences] = useState([]);
  const regContext = useContext(RegContext);

  const setActive = (e, type) => {
    e.preventDefault();
    const value = e.target.innerText;
    const exists = chosenPreference.includes(value);

    if (exists) {
      setChosenPreferences(chosenPreference.filter((item) => item !== value));
    } else {
      setChosenPreferences([...chosenPreference, value]);
    }

    setErrors((prev) => ({ ...prev, [type]: "" }));
  };

  const handleRegistration = async () => {
    setLoader(true);
    const response = await createUser(regContext.RegState);
    if (response.ok) {
      setSuccess("Account created successfully!");
      setShowModal(true);
    setLoader(false);
    } else {
      setErrors((prev) => ({
        ...prev,
        general: "An error occurred while creating your account. Please try again.",
      }));
      setLoader(false);
      router.push("/auth/register");
    }
    setLoader(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);
    let validationErrors = {};

    if (chosenPreference.length === 0) {
      validationErrors.interests = "Please select at least one interest.";
    }

    if (!chosenPreference.includes("Male") && !chosenPreference.includes("Female")) {
      validationErrors.gender = "Please select a gender of interest.";
    }

    const selectedTraits = chosenPreference.filter((item) =>
      traits.includes(item)
    );
    if (selectedTraits.length === 0) {
      validationErrors.traits = "Please select at least one personality trait.";
    }

    if (
      !chosenPreference.includes("Make friends") &&
      !chosenPreference.includes("Relationships") &&
      !chosenPreference.includes("Fun Buddies")
    ) {
      validationErrors.reason = "Please select a reason for joining.";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setLoader(false);
      return;
    }

    if (action === "edit") {
      const token = Cookies.get("token");
      const res = await EditUser({ preferences: chosenPreference }, token);
      if (res.success) {
        setSuccess("Your preferences have been saved successfully.");
        setShowModal(true);
        setLoader(true);
      } else {
        setErrors((prev) => ({ ...prev, general: res.message }));
      }
    }

    if (action === "creation") {
      regContext.RegDispatch({
        type: "update",
        payload: { preferences: chosenPreference },
      });
      setCreateAccount(true);
      setLoader(true);
    }

    setLoader(false);
  };

  const interests = [
    "Sports", "Movies and Television", "Fashion", "Fitness",
    "Music", "Food & Cooking", "Technology", "Gaming"
  ];

  const traits = [
    "Introvert", "Extrovert", "Independent", "Dependent", "Creative",
    "Timid", "Bold", "Kind", "Muslim", "Christian",
    "Reserved", "Outspoken", "Easy going", "Empathetic"
  ];

  useEffect(() => {
    if (action === "edit") {
      const fetchData = async () => {
        const token = Cookies.get("token");
        const { user } = await GetUser(token);
        setChosenPreferences(user.preferences || []);
      };
      fetchData();
    }
  }, []);

  useEffect(() => {
    if (createAccount) {
      handleRegistration();
      setCreateAccount(false);
    }
  }, [createAccount]);

  return (
    <div className={`${action === "creation" ? "bg-[#1B1B1B] text-white" : "text-white"} pb-20 h-screen overflow-auto`}>
      {action === "creation" && (
        <div className="sticky top-0 w-11/12 xl:w-4/5 mx-auto py-6 backdrop-blur">
          <FaAngleLeft className="text-3xl cursor-pointer" onClick={onPrev} />
        </div>
      )}

      {/* Errors */}
      {Object.values(errors).some((err) => err) && (
        <div className="w-11/12 xl:w-4/5 mx-auto py-4 text-center rounded-lg mb-6 text-[#FF8A60] text-sm font-semibold">
          {Object.values(errors).map((err, i) =>
            err ? <p key={i}>{err}</p> : null
          )}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50 w-full">
         <div className="bg-[#202020] p-8 rounded-lg flex flex-col items-center gap-1 w-fit">
            <p  className="text-lg text-white font-semibold">{success}</p>
            <div className="flex justify-between mt-6">
            <button
              onClick={() => {
                setShowModal(false);
                if (action === "edit") router.back();
                if (action === "creation") router.push("/auth/");
              }}
               className="px-6 py-3 bg-[#444444] text-white font-bold rounded-lg hover:bg-gray-800 transition"
            >
              OK
            </button>
            </div>
          </div>
        </div>
      )}


      <form onSubmit={handleSubmit} className="mx-auto w-11/12 xl:w-4/5 flex flex-col gap-8 py-8 pt-5">
        <div className="flex flex-col gap-6">
          <h3 className="font-medium text-xl">Choose your interests</h3>
          <div className="flex flex-wrap gap-4 md:gap-6">
            {interests.map((item) => (
              <button
                key={item}
                onClick={(e) => setActive(e, "interests")}
                className={` ${
                  chosenPreference.includes(item)
                    ?  "active-preference-item" : "preference-item"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* Gender */}
        <div className="flex flex-col gap-6">
          <h3 className="font-medium text-xl">Gender of Interest</h3>
          <div className="flex justify-around md:w-10/12 [&>*]:w-full gap-3 md:gap-6">
            {["Male", "Female"].map((item) => (
              <button
                key={item}
                onClick={(e) => setActive(e, "gender")}
                className={` ${
                  chosenPreference.includes(item)
                    ? "active-preference-item" : "preference-item"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* Traits */}
        <div className="flex flex-col gap-6">
          <h3 className="font-medium text-xl">Personality Traits</h3>
          <div className="flex flex-wrap gap-4 md:gap-6">
            {traits.map((item) => (
              <button
                key={item}
                onClick={(e) => setActive(e, "traits")}
                className={` ${
                  chosenPreference.includes(item)
                    ? "active-preference-item" : "preference-item"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* Reasons */}
        <div className="flex flex-col gap-6">
          <h3 className="font-medium text-xl">Why did you join us</h3>
          <div className="flex flex-wrap gap-4 md:gap-6">
            {["Make friends", "Relationships", "Fun Buddies"].map((item) => (
              <button
                key={item}
                onClick={(e) => setActive(e, "reason")}
                className={` ${
                  chosenPreference.includes(item)
                    ? "active-preference-item" : "preference-item"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* Submit */}
        <button type="submit" className="bg-[#FFEBE4] hover:bg-[#F15A24] text-black duration-300 hover:text-white mx-auto md:mx-0 w-fit px-16 rounded-lg py-3 md:text-xl">
            {loader ? <ButtonLoader /> : "Save"}
          </button>
      </form>
    </div>
  );
}

export default Preference;
