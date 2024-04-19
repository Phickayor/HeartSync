"use client";
import { EditUser } from "@/components/Controllers/UserController";
import { RegContext } from "@/contexts/RegContext";
import { UserContext } from "@/contexts/UserContext";
import { capitalize } from "@/utilities/firstLetterCaps";
import { useRouter } from "next/navigation";
import React, { useContext, useRef, useState } from "react";
import { AiOutlineCamera } from "react-icons/ai";
import Swal from "sweetalert2";
function CardPreview({ onNext, action }) {
  const regContext = useContext(RegContext);
  const userContext = useContext(UserContext);
  const [shortBio, setShortBio] = useState("");
  const pic = useRef(null);
  const [cardPicture, setCardPicture] = useState(
    userContext ? userContext?.userState?.cardPicture : "/images/displayPic.png"
  );
  const router = useRouter();
  const handleImageDisplay = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        setCardPicture(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      cardPicture,
      shortBio
    };
    if (action == "creation") {
      if (cardPicture !== "/images/displayPic.png") {
        regContext.RegDispatch({ type: "update", payload });
        onNext();
      } else {
        Swal.fire({ text: "Kindly add a Display Picture to proceed" });
      }
    } else if (action == "edit") {
      var profile = await EditUser(payload);
      profile.success
        ? router.push("/admin/settings")
        : Swal.fire({
            icon: "error",
            title: profile.message
          });
    }
  };
  return (
    <div className="flex flex-col justify-between h-screen py-6 gap-6 md:gap-8">
      <h1 className="text-2xl md:text-3xl text-center font-medium">
        Profile Card Preview
      </h1>
      <div className="group rounded-3xl mx-auto flex-1 md:w-[22rem] w-10/12 md:h-[36rem] bg-[#1E1D1D] relative p-2">
        <img
          src={cardPicture}
          ref={pic}
          className="self-center rounded-3xl top-0 left-0 absolute object-cover group-hover:opacity-40 w-full h-full"
          alt="Display picture"
        />
        <div className="absolute text-white space-y-3 left-0 mx-auto w-full bottom-0">
          <div className="hidden py-20 group-hover:flex justify-center w-full h-full">
            <AiOutlineCamera
              onClick={() => {
                pic.current.click();
              }}
              className="self-center cursor-pointer text-5xl text-white"
            />

            <input
              type="file"
              name="cardPicture"
              onChange={handleImageDisplay}
              alt=""
              ref={pic}
              className="hidden"
            />
          </div>
          <div className="bg-[#1E1D1D] font-light text-center rounded-3xl py-4 flex flex-col justify-between gap-5">
            <p className="text-center text-2xl bg-inherit focus:outline-none">
              {action == "edit"
                ? capitalize(userContext?.userState?.userName)
                : capitalize(regContext?.RegState?.userName)}
            </p>
            <input
              type="text"
              className="text-center md:text-lg bg-inherit focus:outline-none"
              required
              value={userContext ? userContext?.userState?.shortBio : shortBio}
              onChange={(e) => {
                setShortBio(e.target.value);
              }}
              minLength={7}
              maxLength={30}
              placeholder="Short bio here..."
            />
            <button
              disabled
              className="bg-btnColor px-14 rounded-xl py-2.5 mx-auto"
            >
              Let's chat
            </button>
            <span className="block cursor-pointer underline">View profile</span>
          </div>
        </div>
      </div>
      <button onClick={handleSubmit} className="auth-btn">
        Save
      </button>
    </div>
  );
}

export default CardPreview;
