import React from "react";

function PageLoader() {
  return (
    <div className='bg-[url("/images/auth-bg.png")] bg-cover flex flex-col justify-center h-screen'>
      <div className="flex-col w-full flex items-center justify-center">
        <div className="w-40 h-40 border-8 text-blue-400 text-4xl animate-spin border-gray-300 flex items-center justify-center border-t-blue-400 rounded-full"></div>
        <img src="/images/logo.svg" className="absolute w-24 self-center" />
      </div>
    </div>
  );
}

export default PageLoader;
