"use client";
import React, { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { getUsers, searchUser } from "../Controllers/UserController";
import Link from "next/link";
import { capitalize } from "@/utilities/firstLetterCaps";
import SearchResultLoader from "@/loader/SearchResultLoader";
function Search() {
  const [results, setResults] = useState(null);
  const [users, setUsers] = useState(null);
  const [searching, setSearching] = useState(false);
  const handleSearch = (input) => {
    if (input) {
      setSearching(true);
      let filter = users?.filter(
        (user) =>
          user.userName.includes(input.toLowerCase()) ||
          user.fullName.toLowerCase().includes(input.toLowerCase())
      );
      console.log("filter ", filter);
      setResults(filter);
      setSearching(false);
    } else {
      setResults(null);
    }
  };
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { allUsers } = await getUsers();
        allUsers && setUsers(allUsers);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUsers();
  }, []);
  return (
    <div className="px-5 mx-auto w-full lg:w-10/12 lg:h-screen h-[calc(100vh-5rem)] overflow-hidden max-h-screen">
      <div className="space-y-8 pt-10 sticky top-0  backdrop-blur">
        <div className="bg-[#131725] text-white py-4 rounded-xl flex px-5">
          <AiOutlineSearch className="self-center text-2xl text-slate-200" />
          <input
            type="search"
            onChange={(e) => handleSearch(e.target.value)}
            className="self-center bg-inherit w-full px-2 focus:outline-none"
            placeholder="Search here..."
          />
        </div>
        {results?.length > 0 &&
          results?.map((result) => (
            <Link
              href={`/profile/${result._id}`}
              key={result._id}
              className="rounded-2xl flex justify-between px-4 cursor-pointer gap-5 border-dashed hover:border-2 "
            >
              <div className="flex gap-4 py-3">
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
          ))}
        {!results && (
          <h1 className="text-xl lg:text-2xl text-center py-5">
            Your search result appears here
          </h1>
        )}
        {searching && <SearchResultLoader />}
        {results?.length == 0 && (
          <h1 className="text-xl lg:text-2xl text-center py-5">
            No results Found
          </h1>
        )}
      </div>
    </div>
  );
}

export default Search;
