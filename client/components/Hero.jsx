import Link from "next/link";
import React from "react";
import { FaAngleDown } from "react-icons/fa";
function Hero() {
  return (
    <div className="mx-auto w-10/12 flex flex-col justify-center md:justify-around relative gap-6 h-full">
      <div className="space-y-4 text-center z-20 lg:h-1/2">
        <h1 className="minimum text-5xl md:text-6xl xl:text-8xl">
          Find your Spark
        </h1>
        <p className="font-extralight md:text-xl">
          Connect with friends who shares similar interest with you
        </p>

        <Link
          href="/auth"
          className="mx-auto group w-fit rounded-full bg-[#131725] text-[#FFDFBA] md:px-5 p-3 flex gap-2 justify-center"
        >
          <span className="self-center md:text-lg font-extralight text-center">
            Start your Journey
          </span>
          <div className="bg-[#FFDFBA] self-center rounded-full p-1 md:p-2">
            <FaAngleDown className="text-center text-lg text-black " />
          </div>
        </Link>
      </div>
      <div className="md:block hidden w-full lg:h-1/2">
        <img
          src="/images/lp-desktop.png"
          alt=""
          className="mx-auto object-contain h-full w-full"
        />
      </div>
      <div className="md:hidden w-full h-1/2">
        <img
          src="/images/hero-1.png"
          alt=""
          className="mx-auto object-contain h-1/2 w-full"
        />
        <img
          src="/images/hero-2.png"
          alt=""
          className="mx-auto object-contain h-1/2 w-full"
        />
      </div>
    </div>
  );
}

export default Hero;
