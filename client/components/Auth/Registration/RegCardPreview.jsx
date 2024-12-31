"use client";
import { RegContext } from "@/contexts/RegContext";
import { UserContext } from "@/contexts/UserContext";
import { capitalize } from "@/utilities/firstLetterCaps";
import { useRouter } from "next/navigation";
import React, { useContext, useRef, useState } from "react";
import { AiOutlineCamera } from "react-icons/ai";
import { FaAngleLeft, FaAngleRight, FaSpinner } from "react-icons/fa";
import Swal from "sweetalert2";
function RegCardPreview({ onNext, onPrev }) {
  const regContext = useContext(RegContext);
  const userContext = useContext(UserContext);
  const [shortBio, setShortBio] = useState("");
  const [loader, setLoader] = useState(false);
  const pic = useRef(null);
  const [cardPicture, setCardPicture] = useState("/images/displayPic.png");
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
    setLoader(true);
    try {
      const payload = {
        cardPicture,
        shortBio
      };
      if (cardPicture !== "/images/displayPic.png") {
        regContext.RegDispatch({ type: "update", payload });
        onNext();
      } else {
        Swal.fire({ text: "Kindly add a Display Picture to proceed" });
      }
      setLoader(false);
    } catch (error) {
      console.error(error);
      setLoader(false);
    }
  };
  const handleNext = () => {
    if (!cardPicture || cardPicture == "/images/displayPic.png" || !shortBio) {
      return alert("Kindly fill and save all fields before proceeding");
    }
    onNext();
  };
  return (
    <div className="mx-auto p-5 md:px-10 space-y-4 bg-[#1B1B1B] rounded-xl w-96 flex flex-col">
      <div className="flex justify-between">
        <FaAngleLeft
          className="text-3xl font-extralight cursor-pointer"
          onClick={() => onPrev()}
        />
        <FaAngleRight
          className="text-3xl font-extralight cursor-pointer"
          onClick={handleNext}
        />
      </div>
      <div className="group relative h-1/2 flex-1">
        <img
          src={cardPicture}
          alt=""
          className="rounded-2xl mx-auto w-full h-full object-cover group-hover:opacity-40"
        />
        <div className="absolute text-white flex flex-col justify-center h-full left-0 mx-auto w-full top-0">
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
        </div>
      </div>
      <div className="w-full text-white font-light h-fit text-center rounded-xl flex flex-col gap-3">
        <h2 className="text-2xl ">
          {capitalize(regContext?.RegState?.userName)}
        </h2>
        <div className="flex gap-2 mx-auto [&>*]:self-center">
          <p>Bio:</p>
          <input
            type="text"
            className="py-2 rounded-lg font-light bg-[#202020] px-5 focus:outline-none"
            required
            value={shortBio}
            onChange={(e) => {
              setShortBio(e.target.value);
            }}
            minLength={7}
            maxLength={40}
            placeholder="Short bio here..."
          />
        </div>

        <div className="flex justify-center gap-2 flex-wrap">
          {userContext?.userState?.preferences.slice(-3).map((preference) => (
            <div className="bg-white/20 text-white px-4 py-2 rounded-full text-xs ">
              {preference}
            </div>
          ))}
        </div>
      </div>
      <button onClick={handleSubmit} className="auth-btn">
        {loader ? <FaSpinner className="mx-auto animate-spin" /> : "Save"}
      </button>
    </div>
  );
}

export default RegCardPreview;
