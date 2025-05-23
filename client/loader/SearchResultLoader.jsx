import React from "react";

function SearchResultLoader() {
  const loaderArray = ["", ""];
  return (
    <div className="">
      {loaderArray.map((_, index) => (
        <div
          key={index}
          className="rounded-2xl flex justify-between px-4 cursor-pointer gap-5"
        >
          <div className="flex gap-4 py-4">
            <div className="w-12 h-12 rounded-full self-center card-skeleton bg-slate-400"></div>
            <div className="self-center space-y-3">
              <div className="text-lg bg-slate-400 card-skeleton py-2 w-24 rounded-xl"></div>
              <div className="text-lg bg-slate-400 card-skeleton w-32 py-2 rounded-xl"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default SearchResultLoader;
