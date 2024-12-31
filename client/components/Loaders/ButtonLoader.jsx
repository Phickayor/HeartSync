import React from "react";

function ButtonLoader() {
  return (
    <div className="flex flex-row justify-center gap-2 [&>*]:self-center py-2">
      <div className="size-2 rounded-full bg-black animate-bounce"></div>
      <div className="size-2 rounded-full bg-black animate-bounce [animation-delay:-.3s]"></div>
      <div className="size-2 rounded-full bg-black animate-bounce [animation-delay:-.5s]"></div>
    </div>
  );
}

export default ButtonLoader;
