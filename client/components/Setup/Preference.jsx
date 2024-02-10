"use client";
import React, { useState } from "react";
import { FaTimesCircle } from "react-icons/fa";
function Preference() {
  const [notificationState, setNotificationState] = useState("block");
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
      <div className="mx-auto w-10/12 space-y-8 py-8">
        <div className="flex flex-col gap-6 ">
          <h3 className="font-medium text-white text-xl">
            Choose your interests
          </h3>
          <div className="grid grid-cols-6 gap-5 preference-items">
            <div>Sports</div>
            <div className="col-span-2">Fashion</div>
            <div>Male</div>
            <div>Female</div>
            <div>Male and Female</div>
            <div>Music</div>
            <div>Techie</div>
            <div>Gamer</div>
          </div>
        </div>
        <div className="flex flex-col gap-6 ">
          <h3 className="font-medium text-white text-xl">Personality Traits</h3>
          <div className="grid grid-cols-6 gap-5 preference-items">
            <div>Introvert</div>
            <div>Extrovert</div>
            <div>Tall</div>
            <div>Short</div>
            <div className="col-span-2">Loves to cook</div>
            <div className="col-span-2">Creative</div>
            <div>Christian</div>
            <div>Muslim</div>
            <div>Atheist </div>
          </div>
        </div>
        <div className="flex flex-col gap-6 ">
          <h3 className="font-medium text-white text-xl">Health Information</h3>
          <div className="grid grid-cols-3 gap-5 preference-items">
            <div>Disabilities</div>
            <div>Allergies</div>
            <div>Asthmatic</div>
          </div>
        </div>
        <div className="flex flex-col gap-6 ">
          <h3 className="font-medium text-white text-xl">
            Why did you join us
          </h3>
          <div className="grid grid-cols-3 gap-5 preference-items">
            <div>Make new friends</div>
            <div>Relationships</div>
            <div>Fun Buddies</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Preference;
