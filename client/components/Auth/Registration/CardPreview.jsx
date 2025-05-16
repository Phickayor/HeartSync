"use client";
import { EditUser } from "@/components/Controllers/UserController";
import { UserContext } from "@/contexts/UserContext";
import { capitalize } from "@/utilities/firstLetterCaps";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useRef, useState } from "react";
import { AiOutlineCamera } from "react-icons/ai";
import { FaSpinner } from "react-icons/fa";
import Swal from "sweetalert2";
function CardPreview() {
  const userContext = useContext(UserContext);
  const [shortBio, setShortBio] = useState("");
  const [loader, setLoader] = useState(false);
  const pic = useRef(null);
  const [cardPicture, setCardPicture] = useState(userContext?.userState?.cardPicture);
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
  useEffect(() => {
    setCardPicture(userContext?.userState?.cardPicture);
    setShortBio(userContext?.userState?.shortBio);
  }, [action, userContext]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);
    try {
      const payload = {
        cardPicture,
        shortBio
      };
      const token = Cookies.get("token");
      let profile = await EditUser(payload, token);
      profile.success
        ? router.push("/admin/settings")
        : Swal.fire({
          icon: "error",
          title: profile.message
        });

      setLoader(false);
    } catch (error) {
      console.error(error);
      setLoader(false);
    }
  };
  return (
    <div className="h-[calc(100vh-3.5rem)] lg:h-screen max-h-screen flex flex-col justify-between py-5 gap-4 relative rounded-2xl bg-[#242424]">
      <div className="mx-auto p-4 space-y-4 bg-[#1B1B1B] rounded-xl w-96 flex flex-col h-full">
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
            {capitalize(userContext?.userState?.userName)}
          </h2>
          <div className="flex gap-2 mx-auto [&>*]:self-center">
            <p>Bio:</p>
            <input
              type="text"
              className="px-3 text-sm flex-1 w-full py-1 bg-inherit border rounded-md focus:outline-none"
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
    </div>
  );
}

export default CardPreview;
