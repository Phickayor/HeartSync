"use client";
import React, { useState } from "react";
import { FaTimesCircle } from "react-icons/fa";
import ButtonLoader from "../Loaders/ButtonLoader";
import { ProfileEdit } from "../Controllers/ProfileController";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
function Preference() {
  const [notificationState, setNotificationState] = useState("block");
  const [loader, setLoader] = useState(false);
  let chosenPreference = [];
  const token = Cookies.get("token");

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
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);
    try {
      const values = {
        preferences: chosenPreference
      };
      console.log(token);

      var profile = await ProfileEdit(token, values);
      profile.success
        ? router.push("/admin")
        : Swal.fire({
            icon: "error",
            title: profile.message
          });
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
      <form onSubmit={handleSubmit} className="mx-auto w-10/12 xl:w-4/5 space-y-8 py-8">
        <div className="flex flex-col gap-6 ">
          <h3 className="font-medium text-white text-xl">
            Choose your interests
          </h3>
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
          <h3 className="font-medium text-white text-xl">Personality Traits</h3>
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
          <h3 className="font-medium text-white text-xl">
            Why did you join us
          </h3>
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
          className="bg-[#584296] text-white mx-auto w-fit md:px-24 rounded-lg py-4 md:text-2xl font-medium md:self-center"
        >
          {loader ? <ButtonLoader /> : "Save"}
        </button>
      </form>
    </div>
  );
}

export default Preference;
