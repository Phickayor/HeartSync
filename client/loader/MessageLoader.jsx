import { OtherUserText, UserText } from "@/components/Admin/Messaging/Message";
import React from "react";

function MessageLoader() {
  return (
    <div className="md:px-10 p-5 flex flex-col md:gap-5 justify-between md:h-screen h-[calc(100vh-3.5rem)]">
      <div className="md:h-20 rounded-2xl flex p-3 cursor-pointer gap-2">
        <div className="w-12 h-12 bg-slate-700 card-skeleton rounded-full self-center"></div>
        <h3 className="self-center bg-slate-700 w-32 py-3 text-xl card-skeleton rounded-xl text-[#131725]"></h3>
      </div>

      <div className="flex flex-col flex-1  overflow-y-hidden gap-5 py-3">
        <UserText />
        <OtherUserText />
        <UserText />
        <OtherUserText />
      </div>
      <div className=" bg-slate-700 card-skeleton rounded-2xl flex py-6 cursor-pointer gap-5"></div>
    </div>
  );
}

export default MessageLoader;
