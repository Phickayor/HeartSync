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
  const [filteredMatches, setFilteredMatches] = useState(null);
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
  const handleSearch = (input) => {
    if (input) {
      let filtered = matches.filter((match) =>
        match.user.userName.includes(input.toLowerCase())
      );
      console.log(filtered);
      setFilteredMatches(filtered);
    } else {
      setFilteredMatches(matches);
    }
  };
  useEffect(() => {
    AdjustSlides();
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
        console.log("start");
        await getMatches().then((result) => {
          console.log(matches);
          setMatches(
            result.matches.sort((a, b) => b.matchCount - a.matchCount)
          );
          setFilteredMatches(
            result.matches.sort((a, b) => b.matchCount - a.matchCount)
          );
        });
        console.log("end");
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchMatches();
    console.log(matches);
  }, []);
  if (!matches) {
    return <HomeLoader />;
  }
  if (matches?.length == 0) {
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
    <div className="flex flex-col gap-4 py-5 lg:h-screen h-[calc(100vh-3.5rem)] max-h-[calc(100vh-3.5rem)] lg:max-h-screen overflow-y-hidden">
      <div className="bg-[#202020] mx-auto w-96 text-white rounded-xl flex px-5">
        <AiOutlineSearch className="self-center text-2xl text-slate-200" />
        <input
          type="search"
          onChange={(e) => handleSearch(e.target.value)}
          className="py-3 rounded-lg font-light bg-[#202020] px-5 w-full focus:outline-none"
          placeholder="Search here..."
        />
      </div>
      <div className="mx-auto flex-1 h-full w-4/5 lg:w-11/12 py-4">
        {filteredMatches?.length > 0 && (
          <Slider {...settings} className="h-full">
            {filteredMatches?.map((match, index) => (
              <div
                key={match.user._id}
                className="group lg:h-[32rem] self-center flex flex-col py-5 gap-y-4 relative rounded-2xl bg-[#1B1B1B]"
              >
                <img
                  src={match.user.cardPicture}
                  alt=""
                  className="rounded-2xl mx-auto lg:w-10/12 lg:h-3/5 max-h-60 lg:max-h-72 flex-1 aspect-square object-cover"
                />
                <div className="w-full text-white font-light lg:h-2/5 flex-1 text-center rounded-xl flex flex-col py-4 gap-3">
                  <h2 className="text-2xl">
                    {capitalize(match.user.userName)}
                  </h2>
                  <p className="px-5">Bio: {match.user.shortBio}</p>
                  <div className="flex justify-center gap-2 flex-wrap">
                    {match.user.preferences.slice(-3).map((preference) => (
                      <div className="bg-[#202020] text-white px-4 py-2 rounded-full text-xs ">
                        {preference}
                      </div>
                    ))}
                  </div>
                  <p className="text-center text-[#A7A7A7] font-light">
                    {match.user.school}
                  </p>
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
        )}
        {filteredMatches?.length == 0 && (
          <p className="text-2xl text-center self-center h-full place-content-center">
            No result found for search
          </p>
        )}
      </div>
    </div>
  );
}

export default Home;
