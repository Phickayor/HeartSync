import React from "react";

function ButtonLoader() {
  return (
    <div className="flex flex-row justify-center gap-2 [&>*]:self-center py-2">
      <div className="w-4 h-4 rounded-full bg-white animate-bounce"></div>
      <div className="w-4 h-4 rounded-full bg-white animate-bounce [animation-delay:-.3s]"></div>
      <div className="w-4 h-4 rounded-full bg-white animate-bounce [animation-delay:-.5s]"></div>
    </div>
  );
}

export default ButtonLoader;
