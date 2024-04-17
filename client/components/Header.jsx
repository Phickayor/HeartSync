import React from "react";
import { FaAngleDown } from "react-icons/fa";
import Link from "next/link";
function Header() {
  return (
    <div className="mx-auto w-10/12 flex justify-between py-5">
      <img
        src="/images/logo.svg"
        alt=""
        className="self-center h-24 md:h-fit w-24 md:w-fit"
      />
      <div className="hidden md:flex gap-5 self-center">
        <Link
          href="/auth/register"
          className="bg-[#F8931F] px-8 py-3 border border-black rounded-2xl flex gap-3 [&>*]:self-center"
        >
          <span>Create an Account</span>
          <div className="bg-[#FFDFBA] p-1 rounded-full ">
            <FaAngleDown className="self-center" />
          </div>
        </Link>
        <Link
          href="/auth"
          className="bg-inherit px-8 py-3 border border-black rounded-2xl flex gap-3 [&>*]:self-center"
        >
          <span>Login</span>
          <div className="bg-[#FFDFBA] p-1 rounded-full ">
            <FaAngleDown className="self-center" />
          </div>
        </Link>
      </div>
      <svg
        className="md:hidden cursor-pointer self-center"
        width="30"
        height="30"
        viewBox="0 0 30 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10 8.72876C9.66848 8.72876 9.35054 8.86046 9.11612 9.09488C8.8817 9.3293 8.75 9.64724 8.75 9.97876C8.75 10.3103 8.8817 10.6282 9.11612 10.8626C9.35054 11.0971 9.66848 11.2288 10 11.2288H20C20.3315 11.2288 20.6495 11.0971 20.8839 10.8626C21.1183 10.6282 21.25 10.3103 21.25 9.97876C21.25 9.64724 21.1183 9.3293 20.8839 9.09488C20.6495 8.86046 20.3315 8.72876 20 8.72876H10ZM8.75 15C8.75 14.6685 8.8817 14.3505 9.11612 14.1161C9.35054 13.8817 9.66848 13.75 10 13.75H20C20.3315 13.75 20.6495 13.8817 20.8839 14.1161C21.1183 14.3505 21.25 14.6685 21.25 15C21.25 15.3315 21.1183 15.6495 20.8839 15.8839C20.6495 16.1183 20.3315 16.25 20 16.25H10C9.66848 16.25 9.35054 16.1183 9.11612 15.8839C8.8817 15.6495 8.75 15.3315 8.75 15ZM10 18.7713C9.66848 18.7713 9.35054 18.903 9.11612 19.1374C8.8817 19.3718 8.75 19.6897 8.75 20.0213C8.75 20.3528 8.8817 20.6707 9.11612 20.9051C9.35054 21.1396 9.66848 21.2713 10 21.2713H20C20.3315 21.2713 20.6495 21.1396 20.8839 20.9051C21.1183 20.6707 21.25 20.3528 21.25 20.0213C21.25 19.6897 21.1183 19.3718 20.8839 19.1374C20.6495 18.903 20.3315 18.7713 20 18.7713H10Z"
          fill="#131725"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M27.5 15C27.5 21.9037 21.9037 27.5 15 27.5C8.09625 27.5 2.5 21.9037 2.5 15C2.5 8.09625 8.09625 2.5 15 2.5C21.9037 2.5 27.5 8.09625 27.5 15ZM25 15C25 17.6522 23.9464 20.1957 22.0711 22.0711C20.1957 23.9464 17.6522 25 15 25C12.3478 25 9.8043 23.9464 7.92893 22.0711C6.05357 20.1957 5 17.6522 5 15C5 12.3478 6.05357 9.8043 7.92893 7.92893C9.8043 6.05357 12.3478 5 15 5C17.6522 5 20.1957 6.05357 22.0711 7.92893C23.9464 9.8043 25 12.3478 25 15Z"
          fill="#131725"
        />
      </svg>
    </div>
  );
}

export default Header;
