"use client";
import React, { useEffect, useContext, useState } from "react";
import ButtonLoader from "../../Loaders/ButtonLoader";
import { EditUser } from "../../Controllers/UserController";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { RegContext } from "@/contexts/RegContext";
import { createUser } from "@/components/Controllers/AuthController";
import { FaAngleLeft } from "react-icons/fa";
function Preference({ onPrev, action }) {
  const [createAccount, setCreateAccount] = useState(false);
  const [loader, setLoader] = useState(false);
  const router = useRouter();
  let chosenPreference = [];
  const regContext = useContext(RegContext);
  const setActive = (e) => {
    e.preventDefault();
    let position = chosenPreference.indexOf(e.target.innerText);
    if (position == -1) {
      chosenPreference.push(e.target.innerText);
    } else {
      chosenPreference.splice(position, 1);
    }
    e.target.classList.toggle("active-preference-item");
    e.target.classList.toggle("preference-item");
  };
  const handleRegistration = async () => {
    const response = await createUser(regContext.RegState);
    if (response.ok) {
      Swal.fire({
        title: "Account Created Succesfully",
        icon: "success",
        timer: 5000
      });
      router.push("/auth/");
    } else {
      Swal.fire({
        title: "An error occcured, Please try again",
        text: response.message,
        icon: "error",
        timer: 5000
      });
      router.push("/auth/register");
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoader(true);
      if (chosenPreference.length == 0) {
        throw new Error(
          Swal.fire({
            title: "No Interest Selected",
            text: "It is important to pick at least one interest, it help us match you with the right people",
            timer: 5000,
            icon: "error"
          })
        );
      }

      if (action == "edit") {
        const values = {
          preferences: chosenPreference
        };
        let profile = await EditUser(values);
        profile.success
          ? router.back()
          : Swal.fire({
              icon: "error",
              title: profile.message
            });
      }
      if (action == "creation") {
        regContext.RegDispatch({
          type: "update",
          payload: {
            preferences: chosenPreference
          }
        });
        setCreateAccount(true);
      }
    } catch (error) {
      console.log(error);
      setLoader(false);
    }
    setLoader(false);
  };
  const interests = [
    "Sports",
    "Movies and Television",
    "Fashion",
    "Fitness",
    "Music",
    "Food & Cooking",
    "Technology",
    "Gaming"
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
    "Empathetic"
  ];
  useEffect(() => {
    if (createAccount) {
      handleRegistration();
      setCreateAccount(false);
    }
  }, [createAccount]);

  return (
    <div className="pt-5 pb-20 h-screen overflow-auto text-white">
      {/* <span className="mx-auto w-11/12 my-1 p-3 text-white font-extralight text-sm rounded-2xl bg-btnColor block  ">
        🙂🙂 You can select more than one button , what you select would decide
        people you see on your profile
      </span> */}
      {action == "creation" && (
        <FaAngleLeft
          className="text-3xl fixed font-extralight cursor-pointer"
          onClick={() => onPrev()}
        />
      )}
      <form
        onSubmit={handleSubmit}
        className="mx-auto w-11/12 xl:w-4/5 flex flex-col gap-8 py-8"
      >
        <div className="flex flex-col gap-6 ">
          <h3 className="font-medium text-xl">Choose your interests</h3>
          <div className="flex flex-wrap gap-4 md:gap-6">
            {interests.map((interest) => (
              <div
                key={interest}
                onClick={(e) => setActive(e)}
                className="preference-item"
              >
                {interest}
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-6 ">
          <h3 className="font-medium text-xl">Gender Of Interest</h3>
          <div className="flex justify-around md:w-10/12 [&>*]:w-full gap-3 md:gap-6 ">
            <div onClick={(e) => setActive(e)} className="preference-item">
              Male
            </div>
            <div onClick={(e) => setActive(e)} className="preference-item">
              Female
            </div>
            {/* <div
              onClick={setActive}
              onKeyDown={(event) => event.key == "Enter" && setActive}
              className="preference-item"
            >
              Both male & female
            </div> */}
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <h3 className="font-medium text-xl">Personality Traits</h3>
          <div className="flex flex-wrap gap-4 md:gap-6">
            {traits.map((trait) => (
              <div
                key={trait}
                onClick={(e) => setActive(e)}
                className="preference-item"
              >
                {trait}
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-6 ">
          <h3 className="font-medium text-xl">Why did you join us</h3>
          <div className="flex flex-wrap gap-4 md:gap-6 ">
            <div
              onClick={setActive}
              onKeyDown={(event) => event.key == "Enter" && setActive}
              className="preference-item"
            >
              Make friends
            </div>
            <div
              onClick={setActive}
              onKeyDown={(event) => event.key == "Enter" && setActive}
              className="preference-item em"
            >
              Relationships
            </div>
            <div
              onClick={setActive}
              onKeyDown={(event) => event.key == "Enter" && setActive}
              className="preference-item"
            >
              Fun Buddies
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="bg-btnColor text-white mx-auto md:mx-0 w-fit px-16 rounded-lg py-3 md:text-xl"
        >
          {loader ? <ButtonLoader /> : "Save"}
        </button>
      </form>
    </div>
  );
}

export default Preference;
