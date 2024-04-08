import { UserContext } from "@/contexts/UserContext";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import React, { useContext } from "react";

function Logout() {
  const router = useRouter();
  const userContext = useContext(UserContext);
  const handleLogout = (e) => {
    e.preventDefault();
    userContext.userDispatch("signOut");
    Cookies.set("token", "");
    router.push("/auth");
  };
  return (
    <div className="grid grid-rows-5 h-[calc(100vh-5rem)] md:h-screen max-h-screen gap-5 ">
      <div className="flex justify-center row-span-2 py-5 h-full">
        <img
          src="/images/logo.svg"
          alt=""
          className="self-center scale-150 h-fit"
        />
      </div>
      <div className="mx-auto row-span-4 py-5 flex flex-col gap-5 w-10/12">
        <h1 className="text-center text-2xl md:text-4xl">
          Are you sure you want to logout ?
        </h1>
        <button
          onClick={handleLogout}
          className="bg-[#964242] text-white mx-auto self-center w-fit py-2.5 px-10 text-lg rounded-lg "
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Logout;
