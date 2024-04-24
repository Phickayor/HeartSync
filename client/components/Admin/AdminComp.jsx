"use client";
import ActivityBar from "@/components/Admin/ActivityBar";
import React, { useEffect, useState, useReducer } from "react";
import { useRouter } from "next/navigation";
import { GetUser } from "@/components/Controllers/UserController";
import { UserContext } from "@/contexts/UserContext";
import PageLoader from "@/Loaders/PageLoader";

function AdminComp({ navName, children }) {
  const [isAuthorizationChecked, setIsAuthorizationChecked] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        await GetUser();
      } catch (error) {
        router.push("/auth");
      }
      setIsAuthorizationChecked(true);
    };
    fetchDetails();
  }, []);

  const reducer = (state, action) => {
    switch (action.type) {
      case "signIn":
        return { ...state, ...action.payload };
      case "signOut":
        return { ...state, ...null };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, null);

  if (!isAuthorizationChecked) {
    return <PageLoader />;
  }

  return (
    <UserContext.Provider value={{ userState: state, userDispatch: dispatch }}>
      <div className="fixed flex flex-col justify-between lg:justify-start lg:flex-row h-screen w-full">
        <div className="lg:order-1 order-2 lg:relative fixed z-20 bottom-0 lg:w-fit w-full">
          <ActivityBar activeBar={navName} />
        </div>
        <div className="lg:overflow-y-auto pattern-background text-[#131725] w-full order-1 lg:order-2">
          {children}
        </div>
      </div>
    </UserContext.Provider>
  );
}

export default AdminComp;
