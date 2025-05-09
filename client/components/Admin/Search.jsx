"use client";
import React, { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { getUsers, searchUser } from "../Controllers/UserController";
import Link from "next/link";
import { capitalize } from "@/utilities/firstLetterCaps";
import SearchResultLoader from "@/loader/SearchResultLoader";
import Cookies from "js-cookie";
function Search() {
  const [results, setResults] = useState(null);
  const [users, setUsers] = useState(null);
  const [searching, setSearching] = useState(true);
  const handleSearch = (input) => {
    if (input) {
      setSearching(true);
      let filter = users?.filter(
        (user) =>
          user.userName.includes(input.toLowerCase()) ||
          user.fullName.toLowerCase().includes(input.toLowerCase())
      );
      setResults(filter);
      setSearching(false);
    } else {
      setResults(null);
    }
  };
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = Cookies.get("token");
        const { allUsers } = await getUsers(token);
        allUsers && setUsers(allUsers);
        setSearching(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUsers();
  }, []);
  return (
    <div className="px-5 mx-auto w-full lg:h-screen h-[calc(100vh-3.5rem)] overflow-auto max-h-screen">
      <div className="pb-10 mx-auto lg:w-10/12">
        <div className="pt-10 sticky top-0 backdrop-blur">
          <div className="bg-[#202020] text-white rounded-xl flex px-5">
            <AiOutlineSearch className="self-center text-xl md:text-2xl text-slate-200" />
            <input
              type="search"
              onChange={(e) => handleSearch(e.target.value)}
              className="py-3 rounded-lg font-light bg-[#202020] self-center px-2 md:px-5 w-full focus:outline-none"
              placeholder="Search here..."
            />
          </div>
        </div>

        <div className="flex flex-col gap-6 py-5 overflow-auto">
          {results?.length > 0 &&
            results?.map((result) => (
              <Link
                href={`/profile/${result._id}`}
                key={result._id}
                className="rounded-2xl flex justify-between px-4 cursor-pointer gap-5 bg-[#202020] hover:border "
              >
                <div className="flex gap-4 py-3">
                  <img
                    src={result.profilePicture}
                    className="w-12 h-12 rounded-full self-center"
                  />
                  <div className="self-center gap-3">
                    <h3 className="">{capitalize(result.userName)}</h3>
                    <span className="text-sm">{result.fullName}</span>
                  </div>
                </div>
              </Link>
            ))}
        </div>

        {searching && <SearchResultLoader />}
        {!results && !searching && (
          <h1 className="md:text-xl font-light text-center py-5">
            Your search results appear here
          </h1>
        )}
        {results?.length == 0 && (
          <h1 className="md:text-xl text-center py-5">No results found</h1>
        )}
      </div>
    </div>
  );
}

export default Search;
