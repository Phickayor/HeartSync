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
    <div className="bg-[#171717] w-full h-full flex flex-col justify-center py-10 text-white text-center ">
      <div className="bg-[#1E1D1D] mx-auto w-1/2 h-3/5 p-20 space-y-6 rounded-lg">
        <h3 className="text-2xl">Are you sure you want to logout?</h3>
        <button
          onClick={handleLogout}
          className="px-12 py-2 rounded-md bg-[#891919]"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Logout;
