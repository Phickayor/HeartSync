import React from "react";

function PageLoader() {
  return (
    <div className="bg-black bg-cover flex flex-col justify-center h-screen">
      <div className="flex-col w-full flex items-center justify-center">
        <div className="size-32 border-4 text-[#F15A24] animate-spin duration-300 border-gray-300 flex items-center justify-center border-t-[#F15A24] rounded-full"></div>
        <img src="/images/logo.svg" className="absolute size-16 self-center" />
      </div>
    </div>
  );
}

export default PageLoader;
