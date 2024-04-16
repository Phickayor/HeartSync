"use client";
import React, { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { searchUser } from "../Controllers/UserController";
import Link from "next/link";
import { capitalize } from "@/utilities/firstLetterCaps";
import SearchResultLoader from "@/Loaders/SearchResultLoader";
function Search() {
  const [userName, SetUserName] = useState("");
  const [result, setResult] = useState();
  const [searching, setSearching] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const handleSearch = async (event) => {
    if (event.key == "Enter" && userName) {
      setErrorMessage();
      setSearching(true);
      const { user, message } = await searchUser(userName);
      user ? setResult(user) : (setResult(), setErrorMessage(message));
    }
    setSearching(false);
  };
  return (
    <div className="px-5 mx-auto w-full lg:w-10/12 lg:h-screen h-[calc(100vh-5rem)] overflow-hidden max-h-screen">
      <div className="space-y-4 pt-10 sticky top-0  backdrop-blur">
        <h1 className="text-xl ">
          Search <b>Big Circle</b>
        </h1>
        <div className="bg-[#131725] text-white py-4 rounded-xl flex px-5">
          <AiOutlineSearch className="self-center text-2xl text-slate-200" />
          <input
            type="search"
            value={userName}
            onChange={(e) => SetUserName(e.target.value)}
            onKeyDown={handleSearch}
            className="self-center bg-inherit w-full px-2 focus:outline-none"
            placeholder="Search here..."
          />
        </div>
        {result && (
          <Link
            href={`/profile/${result._id}`}
            className="rounded-2xl flex justify-between px-4 cursor-pointer gap-5 text-white bg-slate-500 hover:bg-[#131725]"
          >
            <div className="flex gap-4 py-4">
              <img
                src={result.profilePicture}
                className="w-12 h-12 rounded-full self-center"
              />
              <div className="self-center gap-3">
                <h3 className="text-lg">{capitalize(result.userName)}</h3>
                <span>{result.fullName}</span>
              </div>
            </div>
          </Link>
        )}
        {searching && <SearchResultLoader />}
        {errorMessage && (
          <h1 className="text-xl lg:text-2xl text-center py-5">
            {errorMessage}
          </h1>
        )}
      </div>
    </div>
  );
}

export default Search;
