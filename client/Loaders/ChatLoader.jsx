import React from "react";

function ChatLoader() {
  const loaderArray = ["1", "2", "3", "4"];
  return (
    <div className="py-10">
      {loaderArray.map((value) => (
        <div
          key={value}
          className="rounded-2xl flex justify-between px-4 cursor-pointer gap-5"
        >
          <div className="flex gap-4 py-4">
            <div className="w-12 h-12 rounded-full self-center card-skeleton bg-slate-400"></div>
            <div className="self-center space-y-3">
              <div className="text-lg bg-slate-400 card-skeleton py-2 w-24 rounded-xl"></div>
              <div className="text-lg bg-slate-400 card-skeleton w-32 py-2 rounded-xl"></div>
            </div>
          </div>
          <div className="bg-slate-400  self-center w-8 h-8 text-center text-white card-skeleton rounded-full flex flex-col justify-center"></div>
        </div>
      ))}
    </div>
  );
}

export default ChatLoader;
