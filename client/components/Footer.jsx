import React from "react";
import { AiFillInstagram } from "react-icons/ai";

function Footer() {
  return (
    <div className="mx-auto w-10/12 flex justify-between">
      <img src="/images/logo.svg" alt="" className="py-4 w-16 h-16 md:w-fit md:h-fit" />
      <div className="flex gap-4 [&>*]:self-center">
        <AiFillInstagram className="text-black text-3xl " />
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16.82 20.768L3.753 3.968C3.68413 3.87931 3.64152 3.77307 3.63004 3.66137C3.61855 3.54967 3.63864 3.43698 3.68803 3.33613C3.73741 3.23528 3.8141 3.15032 3.90938 3.09089C4.00466 3.03147 4.11471 2.99998 4.227 3H6.707C6.79829 3.00014 6.88836 3.0211 6.97032 3.06131C7.05229 3.10151 7.124 3.15989 7.18 3.232L20.247 20.032C20.3159 20.1207 20.3585 20.2269 20.37 20.3386C20.3814 20.4503 20.3614 20.563 20.312 20.6639C20.2626 20.7647 20.1859 20.8497 20.0906 20.9091C19.9953 20.9685 19.8853 21 19.773 21H17.293C17.2017 20.9999 17.1116 20.9789 17.0297 20.9387C16.9477 20.8985 16.876 20.8401 16.82 20.768Z"
            stroke="#131725"
            stroke-width="1.5"
          />
          <path
            d="M20 3L4 21"
            stroke="#131725"
            stroke-width="1.5"
            stroke-linecap="round"
          />
        </svg>
      </div>
    </div>
  );
}

export default Footer;
