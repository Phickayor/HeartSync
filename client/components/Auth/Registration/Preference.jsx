"use client";
import React, { useContext, useState } from "react";
import { FaTimesCircle } from "react-icons/fa";
import ButtonLoader from "../../Loaders/ButtonLoader";
import { EditUser } from "../../Controllers/UserController";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { RegContext } from "@/contexts/RegContext";
import { createUser } from "@/components/Controllers/AuthController";
function Preference({ action }) {
  const [notificationState, setNotificationState] = useState("block");
  const [loader, setLoader] = useState(false);
  let chosenPreference = [];
  const regContext = useContext(RegContext);
  const setActive = (e) => {
    e.preventDefault();
    var position = chosenPreference.indexOf(e.target.innerHTML);
    if (position == -1) {
      chosenPreference.push(e.target.innerHTML);
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
      } else {
        if (action == "edit") {
          const values = {
            preferences: chosenPreference
          };
          var profile = await EditUser(values);
          profile.success
            ? router.push("/admin/settings")
            : Swal.fire({
                icon: "error",
                title: profile.message
              });
        } else if (action == "creation") {
          regContext.RegDispatch({
            type: "update",
            payload: {
              preferences: [...chosenPreference]
            }
          });
          handleRegistration();
        }
      }
    } catch (error) {
      console.log(error);
    }
    setLoader(false);
  };
  return (
    <div className="py-8">
      <div
        className={`self-center ${notificationState} bg-notification text-white mx-auto w-10/12 py-5 px-16 flex justify-between rounded-2xl duration-300`}
      >
        <span className="self-center">
          🙂🙂 You can select more than one button , what you select would
          decide people you see on your profile
        </span>
        <FaTimesCircle
          className="text-2xl self-center"
          onClick={() => {
            setNotificationState("hidden");
          }}
        />
      </div>
      <form
        onSubmit={handleSubmit}
        className="mx-auto w-10/12 xl:w-4/5 space-y-8 py-8"
      >
        <div className="flex flex-col gap-6 ">
          <h3 className="font-medium text-xl">Choose your interests</h3>
          <div className="flex flex-wrap gap-6 xl:gap-10  ">
            <div onClick={setActive} className="preference-item">
              Sports
            </div>
            <div onClick={setActive} className="preference-item">
              Fashion
            </div>
            <div onClick={setActive} className="preference-item">
              Male
            </div>
            <div onClick={setActive} className="preference-item">
              Female
            </div>

            <div onClick={setActive} className="preference-item">
              Male and female
            </div>
            <div onClick={setActive} className="preference-item">
              Music
            </div>
            <div onClick={setActive} className="preference-item">
              Techie
            </div>
            <div onClick={setActive} className="preference-item">
              Gamer
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-6 ">
          <h3 className="font-medium text-xl">Personality Traits</h3>
          <div className="flex flex-wrap gap-6 xl:gap-10 ">
            <div onClick={setActive} className="preference-item">
              Introvert
            </div>
            <div onClick={setActive} className="preference-item">
              Extrovert
            </div>
            <div onClick={setActive} className="preference-item">
              Tall
            </div>
            <div onClick={setActive} className="preference-item">
              Short
            </div>
            <div onClick={setActive} className="preference-item">
              Loves to cook
            </div>
            <div onClick={setActive} className="preference-item">
              Creative
            </div>
            <div onClick={setActive} className="preference-item">
              Christian
            </div>
            <div onClick={setActive} className="preference-item">
              Muslim
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-6 ">
          <h3 className="font-medium text-xl">Why did you join us</h3>
          <div className="flex flex-wrap gap-6 xl:gap-10 ">
            <div onClick={setActive} className="preference-item">
              Make new friends
            </div>
            <div onClick={setActive} className="preference-item">
              Relationships
            </div>
            <div onClick={setActive} className="preference-item">
              Fun Buddies
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="bg-[#584296] text-white px-12 rounded-lg py-3 text-xl self-center"
        >
          {loader ? <ButtonLoader /> : "Save"}
        </button>
      </form>
    </div>
  );
}

export default Preference;
