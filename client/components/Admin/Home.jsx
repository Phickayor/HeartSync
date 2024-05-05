"use client";
import React, { useEffect, useState } from "react";
import { getMatches } from "@/components/Controllers/MatchController";
import { capitalize } from "@/utilities/firstLetterCaps";
import Link from "next/link";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import HomeLoader from "@/Loaders/HomeLoader";
// import "swiper/react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
function Home() {
  const [matches, setMatches] = useState(null);
  const [numberOfSlides, setNumberOfSlides] = useState(null);

  function handleScreenSizeChange() {
    const screenWidth = window.innerWidth;

    if (screenWidth < 768) {
      setNumberOfSlides(1);
    } else if (screenWidth < 1024) {
      setNumberOfSlides(2);
    } else {
      setNumberOfSlides(3);
    }
  }

  useEffect(() => {
    handleScreenSizeChange();
    window.addEventListener("resize", handleScreenSizeChange);
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
        <p className="mx-auto md:w-2/3 lg:w-1/2">
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
    <div className="lg:h-screen h-[calc(100vh-3rem)] mx-auto w-11/12 py-4">
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={50}
        slidesPerView={numberOfSlides}
        scrollbar={{ draggable: true }}
        className="py-10 h-full"
      >
        {matches &&
          matches.map((match) => (
            <SwiperSlide
              key={match.user._id}
              className="group h-full gap-4 relative border-2 rounded-2xl bg-slate-700"
            >
              <img
                src={match.user.cardPicture}
                alt=""
                className="rounded-2xl w-full h-full object-cover"
              />
              <div className="bg-[#2c2626] absolute bottom-0 w-full text-white font-light text-center rounded-xl py-4 flex flex-col justify-between gap-5">
                <h2 className="text-2xl">{capitalize(match.user.userName)}</h2>
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
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
}

export default Home;
