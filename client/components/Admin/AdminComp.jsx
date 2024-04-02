"use client";
import ActivityBar from "@/components/Admin/ActivityBar";
import React, { useEffect, useState, useReducer } from "react";
import { useRouter } from "next/navigation";
import { GetUser } from "@/components/Controllers/UserController";
import { UserContext } from "@/contexts/UserContext";

function AdminComp({ navName, children }) {
  const [isAuthorized, setIsAuthorized] = useState();
  const user = {};
  const [isAuthorizationChecked, setIsAuthorizationChecked] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const fetchDetails = async () => {
      const data = await GetUser();
      if (data.unauthorized) {
        setIsAuthorized(false);
      } else {
        setIsAuthorized(true);
      }
      setIsAuthorizationChecked(true);
    };
    fetchDetails();
  }, []);

  const reducer = (state, action) => {
    switch (action.type) {
      case "signIn":
        return { ...state, user: action.payload };
      case "signOut":
        return { ...state, user: null };
      default:
        return state;
    }
  };
  const [state, dispatch] = useReducer(reducer, { user });

  if (!isAuthorizationChecked) {
    return null;
  }

  if (isAuthorized) {
    return (
      <UserContext.Provider
        value={{ userState: state, userDispatch: dispatch }}
      >
        <div className="fixed flex flex-col justify-between md:justify-start md:flex-row h-screen w-full">
          <div className="md:order-1 order-2 md:relative fixed z-20 bottom-0 md:w-fit w-full">
            <ActivityBar activeBar={navName} />
          </div>
          <div className="md:overflow-y-auto pattern-background text-[#131725] w-full order-1 md:order-2">
            {children}
          </div>
        </div>
      </UserContext.Provider>
    );
  } else {
    router.push("/auth");
  }
}

export default AdminComp;
