"use client";
import React, { useEffect, useState } from "react";
import { getMatches } from "@/components/Controllers/MatchController";
import { capitalize } from "@/utilities/firstLetterCaps";
import Link from "next/link";
import HomeLoader from "@/loader/HomeLoader";
import { AiOutlineSearch } from "react-icons/ai";
import Slider from "react-slick";
function Home() {
  const [matches, setMatches] = useState(null);
  const [numberOfSlides, setNumberOfSlides] = useState(3);
  var settings = {
    // dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: numberOfSlides,
    slidesToScroll: 1
  };

  function AdjustSlides() {
    return window.innerWidth >= 1024
      ? setNumberOfSlides(3)
      : setNumberOfSlides(1);
  }

  useEffect(() => {
    AdjustSlides    ();
    const handleResize = () => {
      AdjustSlides();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });
  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const { matches } = await getMatches();
        matches &&
          setMatches(matches.sort((a, b) => b.matchCount - a.matchCount));
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchMatches();
  }, []);
  if (!matches) {
    return <HomeLoader />;
  }
  if (matches.length == 0) {
    return (
      <div className="flex flex-col justify-center h-screen text-center mx-auto w-10/12 gap-5">
        <h3 className="text-2xl">
          Other users who match your profile will appear here
        </h3>
        <p className="mx-auto w-2/3 lg:w-1/2">
          You can always control what you see on your home page by editing your
          preferences
        </p>
        <Link href={"/admin/settings/edit-preference"} className="auth-btn">
          Edit Preference
        </Link>
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-4 py-5 h-screen max-h-screen overflow-y-hidden">
      <div className="bg-white/10 text-white mx-auto w-10/12 md:w-96 h-10 text-center rounded-lg flex">
        <div className="w-10 rounded-l-lg h-full flex flex-col justify-center">
          <AiOutlineSearch className="text-lg mx-auto w-fit text-center" />
        </div>
        <input
          type="search"
          className="self-center bg-white/10 w-full text-sm flex-1 py-3 rounded-r-lg h-full px-2 focus:outline-none"
          placeholder="Search here..."
        />
      </div>
      <div className="mx-auto flex-1 h-full w-11/12 py-4">
        <Slider {...settings} className="h-full ">
          {matches?.map((match, index) => (
            <div
              key={match.user._id}
              className="group h-full self-center flex flex-col py-5 gap-y-4 relative rounded-2xl bg-[#242424]"
            >
              <img
                src={match.user.cardPicture}
                alt=""
                className="rounded-2xl mx-auto md:w-10/12 md:h-2/5 h-1/2  max-h-56 lg:max-h-72 flex-1 object-cover"
              />
              <div className="w-full text-white font-light h-full flex-1 text-center rounded-xl flex flex-col py-4 gap-3">
                <h2 className="text-2xl">{capitalize(match.user.userName)}</h2>
                <p className="px-5">Bio: {match.user.shortBio}</p>
                <div className="flex justify-center gap-2 flex-wrap">
                  {match.user.preferences.slice(-3).map((preference) => (
                    <div className="bg-white/20 text-white px-4 py-2 rounded-full text-xs ">
                      {preference}
                    </div>
                  ))}
                </div>
                <Link
                  href={`/profile/${match.user._id}`}
                  className="block cursor-pointer underline"
                >
                  Vew profile
                </Link>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}

export default Home;
