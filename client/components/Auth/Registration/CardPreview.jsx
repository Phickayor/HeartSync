"use client";
import { EditUser } from "@/components/Controllers/UserController";
import { RegContext } from "@/contexts/RegContext";
import { UserContext } from "@/contexts/UserContext";
import { capitalize } from "@/utilities/firstLetterCaps";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useRef, useState } from "react";
import { AiOutlineCamera } from "react-icons/ai";
import { FaAngleLeft, FaSpinner } from "react-icons/fa";
import Swal from "sweetalert2";
function CardPreview({ onNext, onPrev, action }) {
  const regContext = useContext(RegContext);
  const userContext = useContext(UserContext);
  const [shortBio, setShortBio] = useState("");
  const [loader, setLoader] = useState(false);
  const pic = useRef(null);
  const [cardPicture, setCardPicture] = useState(
    action == "edit"
      ? userContext?.userState?.cardPicture
      : "/images/displayPic.png"
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
  useEffect(() => {
    if (action == "edit") {
      setCardPicture(userContext?.userState?.cardPicture);
      setShortBio(userContext?.userState?.shortBio);
    }
  }, [action, userContext]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);
    try {
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
        const token = Cookies.get("token");
        let profile = await EditUser(payload,token);
        profile.success
          ? router.push("/admin/settings")
          : Swal.fire({
              icon: "error",
              title: profile.message
            });
      }
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
            {action == "edit"
              ? capitalize(userContext?.userState?.userName)
              : capitalize(regContext?.RegState?.userName)}
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
    // <div className="flex flex-col justify-between h-screen py-6 gap-6 md:gap-8">
    //   <h1 className="text-2xl md:text-3xl text-center font-medium">
    //     Profile Card Preview
    //   </h1>
    //   <div className="group rounded-3xl mx-auto flex-1 md:w-[22rem] w-10/12 md:h-[36rem] bg-[#1E1D1D] relative p-2">
    //     <img
    //       src={cardPicture}
    //       ref={pic}
    //       className="self-center rounded-3xl top-0 left-0 absolute object-cover group-hover:opacity-40 w-full h-full"
    //       alt="Display picture"
    //     />
    //     <div className="absolute text-white space-y-3 left-0 mx-auto w-full bottom-0">
    //       <div className="hidden py-20 group-hover:flex justify-center w-full h-full">
    //         <AiOutlineCamera
    //           onClick={() => {
    //             pic.current.click();
    //           }}
    //           className="self-center cursor-pointer text-5xl text-white"
    //         />

    //         <input
    //           type="file"
    //           name="cardPicture"
    //           onChange={handleImageDisplay}
    //           alt=""
    //           ref={pic}
    //           className="hidden"
    //         />
    //       </div>
    //       <div className="bg-[#1E1D1D] font-light text-center rounded-3xl py-4 flex flex-col justify-between gap-5">
    //         <p className="text-center text-2xl bg-inherit focus:outline-none">
    //           {action == "edit"
    //             ? capitalize(userContext?.userState?.userName)
    //             : capitalize(regContext?.RegState?.userName)}
    //         </p>
    //         <input
    //           type="text"
    //           className="text-center md:text-lg bg-inherit focus:outline-none"
    //           required
    //           value={shortBio}
    //           onChange={(e) => {
    //             setShortBio(e.target.value);
    //           }}
    //           minLength={7}
    //           maxLength={40}
    //           placeholder="Short bio here..."
    //         />
    //         <button
    //           disabled
    //           className="bg-btnColor px-14 rounded-xl py-2.5 mx-auto"
    //         >
    //           Let's chat
    //         </button>
    //         <span className="block cursor-pointer underline">View profile</span>
    //       </div>
    //     </div>
    //   </div>
    //   <button onClick={handleSubmit} className="auth-btn">
    //     Save
    //   </button>
    // </div>
  );
}

export default CardPreview;
