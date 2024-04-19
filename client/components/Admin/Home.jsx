"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { AiFillHeart, AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import { getMatches } from "@/components/Controllers/MatchController";
import { capitalize } from "@/utilities/firstLetterCaps";
import Link from "next/link";
function Home() {
  var [index, setIndex] = useState(0);
  const [startX, setStartX] = useState(null);
  const [matches, setMatches] = useState(null);
  const handleTouchStart = (e) => {
    setStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    if (startX === null) return;

    const currentX = e.touches[0].clientX;
    const diffX = currentX - startX;

    // If the user swipes right (moving towards positive X direction)
    if (diffX > 0) {
      setIndex(index++);
      setStartX(null); // Reset startX after the swipe
    } else if (diffX < 0) {
      setIndex(index--);
      setStartX(null);
    }
  };
  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const { matches } = await getMatches();
        matches && setMatches(matches);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchMatches();
  }, []);
  return (
    <div className="lg:px-5 w-full lg:h-screen h-[calc(100vh-3rem)] overflow-hidden max-h-screen flex flex-col gap-5 py-3 md:py-10 lg:py-0">
      <img src="/images/logo.svg" alt="" className="mx-auto lg:hidden" />
      <div className="h-full mx-auto w-11/12 md:w-10/12 lg:w-full md:py-5 lg:py-10 grid lg:grid-cols-3 lg:gap-5 xl:gap-8 overflow-x-auto ">
        {matches &&
          matches.map((match, index) => (
            <div
              key={index}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              className="group self-center rounded-3xl mx-auto w-full h-full bg-[#1E1D1D] relative p-2"
            >
              <img
                src={match.user.cardPicture}
                className="self-center rounded-3xl top-0 left-0 absolute object-cover w-full h-full text-white"
                alt="Display picture"
              />
              <div className="absolute text-white space-y-3 left-0 mx-auto w-full bottom-0">
                <div className="hidden group-hover:flex justify-center gap-5">
                  <div className="cursor-pointer border border-dashed bg-btnColor hover:bg-red-700 rounded-full p-5">
                    <AiOutlineClose className="self-center" />
                  </div>
                  <div className="cursor-pointer border border-dashed bg-btnColor hover:bg-red-500 rounded-full p-5">
                    <AiFillHeart className="self-center" />
                  </div>
                  <div className="cursor-pointer border border-dashed bg-btnColor hover:bg-green-500 rounded-full p-5">
                    <AiOutlineCheck className="self-center" />
                  </div>
                </div>
                <div className="bg-[#2c2626] font-light text-center rounded-3xl py-4 flex flex-col justify-between gap-5">
                  <h2 className="text-2xl">
                    {capitalize(match.user.userName)}
                  </h2>
                  <p>{match.user.shortBio}</p>
                  <Link
                    href={`/admin/messaging/?userId=${match.user._id}`}
                    className="bg-btnColor px-14 rounded-xl py-2.5 mx-auto"
                  >
                    Let's chat
                  </Link>
                  <Link
                    href={`/profile/${match.user._id}`}
                    className="block cursor-pointer underline"
                  >
                    Vew profile
                  </Link>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Home;
