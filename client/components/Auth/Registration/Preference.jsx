"use client";
import React, { useEffect, useContext, useState } from "react";
import ButtonLoader from "../../Loaders/ButtonLoader";
import { EditUser } from "../../Controllers/UserController";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { RegContext } from "@/contexts/RegContext";
import { createUser } from "@/components/Controllers/AuthController";
function Preference({ action }) {
  const [createAccount, setCreateAccount] = useState(false);
  const [loader, setLoader] = useState(false);
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
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);
    try {
      if (chosenPreference.length == 0) {
        Swal.fire({
          title: "No Interest Selected",
          text: "It is important to pick at least one interest, it help us match you with the right people",
          timer: 5000,
          icon: "error"
        });
        return;
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
    }
    setLoader(false);
  };
  useEffect(() => {
    if (createAccount) {
      handleRegistration();
      setCreateAccount(false);
    }
  }, [createAccount]);

  return (
    <div className="pt-5 pb-20 h-screen overflow-auto">
      <span className="mx-auto w-11/12 my-1 p-3 text-white font-extralight text-sm rounded-2xl bg-btnColor block  ">
        🙂🙂 You can select more than one button , what you select would decide
        people you see on your profile
      </span>
      
      <form
        onSubmit={handleSubmit}
        className="mx-auto w-11/12 xl:w-4/5 flex flex-col gap-8 py-8"
      >
        <div className="flex flex-col gap-6 ">
          <h3 className="font-medium text-xl">Choose your interests</h3>
          <div className="grid grid-cols-3 md:grid-cols-4 [&>*]:w-full gap-3 md:gap-5">
            <div
              onClick={setActive}
              onKeyDown={(event) => event.key == "Enter" && setActive}
              className="preference-item"
            >
              Sports
            </div>
            <div
              onClick={setActive}
              onKeyDown={(event) => event.key == "Enter" && setActive}
              className="preference-item"
            >
              Fashion
            </div>
            <div
              onClick={setActive}
              onKeyDown={(event) => event.key == "Enter" && setActive}
              className="preference-item"
            >
              Music
            </div>
            <div
              onClick={setActive}
              onKeyDown={(event) => event.key == "Enter" && setActive}
              className="preference-item"
            >
              Stoner
            </div>

            <div
              onClick={setActive}
              onKeyDown={(event) => event.key == "Enter" && setActive}
              className="preference-item"
            >
              Tequila
            </div>
            <div
              onClick={setActive}
              onKeyDown={(event) => event.key == "Enter" && setActive}
              className="preference-item"
            >
              Weeb
            </div>
            <div className="col-span-3 md:col-span-2 flex gap-5 [&>*]:w-full">
              <div
                onClick={setActive}
                onKeyDown={(event) => event.key == "Enter" && setActive}
                className=" preference-item"
              >
                I am a Techie
              </div>
              <div
                onClick={setActive}
                onKeyDown={(event) => event.key == "Enter" && setActive}
                className="preference-item"
              >
                I am a Gamer
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-6 ">
          <h3 className="font-medium text-xl">Gender Of Interest</h3>
          <div className="flex justify-between [&>*]:w-full gap-3 md:gap-5 ">
            <div
              onClick={setActive}
              onKeyDown={(event) => event.key == "Enter" && setActive}
              className="preference-item"
            >
              Male
            </div>
            <div
              onClick={setActive}
              onKeyDown={(event) => event.key == "Enter" && setActive}
              className="preference-item"
            >
              Female
            </div>
            <div
              onClick={setActive}
              onKeyDown={(event) => event.key == "Enter" && setActive}
              className="preference-item"
            >
              Male & Female
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <h3 className="font-medium text-xl">Personality Traits</h3>
          <div className="grid grid-cols-3 md:grid-cols-4 [&>*]:w-full gap-2 md:gap-5">
            <div
              onClick={setActive}
              onKeyDown={(event) => event.key == "Enter" && setActive}
              className="preference-item"
            >
              Introvert
            </div>
            <div
              onClick={setActive}
              onKeyDown={(event) => event.key == "Enter" && setActive}
              className="preference-item"
            >
              Extrovert
            </div>
            <div
              onClick={setActive}
              onKeyDown={(event) => event.key == "Enter" && setActive}
              className="preference-item"
            >
              Creative
            </div>
            <div
              onClick={setActive}
              onKeyDown={(event) => event.key == "Enter" && setActive}
              className="preference-item"
            >
              Timid
            </div>
            <div
              onClick={setActive}
              onKeyDown={(event) => event.key == "Enter" && setActive}
              className="preference-item"
            >
              Bold
            </div>
            <div
              onClick={setActive}
              onKeyDown={(event) => event.key == "Enter" && setActive}
              className="preference-item"
            >
              Kind
            </div>
            <div
              onClick={setActive}
              onKeyDown={(event) => event.key == "Enter" && setActive}
              className="preference-item"
            >
              Christian
            </div>
            <div
              onClick={setActive}
              onKeyDown={(event) => event.key == "Enter" && setActive}
              className="preference-item"
            >
              Muslim
            </div>
            <div
              onClick={setActive}
              onKeyDown={(event) => event.key == "Enter" && setActive}
              className="preference-item"
            >
              Reserved
            </div>
            <div
              onClick={setActive}
              onKeyDown={(event) => event.key == "Enter" && setActive}
              className="preference-item"
            >
              Outspoken
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-6 ">
          <h3 className="font-medium text-xl">Why did you join us</h3>
          <div className="grid grid-cols-3 gap-3 md:gap-5 ">
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
          className="bg-[#584296] text-white mx-auto md:mx-0 w-fit px-16 rounded-lg py-3 md:text-xl"
        >
          {loader ? <ButtonLoader /> : "Save"}
        </button>
      </form>
    </div>
  );
}

export default Preference;
