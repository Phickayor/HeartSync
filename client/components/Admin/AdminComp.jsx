"use client";
import ActivityBar from "@/components/Admin/ActivityBar";
import React, { useEffect, useState, useReducer, useContext } from "react";
import { useRouter } from "next/navigation";
import { GetUser } from "@/components/Controllers/UserController";
import { UserContext } from "@/contexts/UserContext";
import PageLoader from "@/loader/PageLoader";

function AdminComp({ navName, children }) {
  const [isAuthorizationChecked, setIsAuthorizationChecked] = useState(false);
  const [initialState, setInitialState] = useState({
    _id: "",
    email: "",
    isEmailVerified: false,
    userName: "",
    fullName: "",
    dob: "",
    gender: "",
    school: "",
    shortBio: "",
    longBio: "",
    phoneNumber: 0,
    profilePicture: "",
    cardPicture: "",
    preferences: []
  });
  const router = useRouter();
  const userContext = useContext(UserContext);
  const reducer = (state, action) => {
    switch (action.type) {
      case "signIn":
        return { ...state, ...action.payload };
      case "signOut":
        return initialState;
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        await GetUser().then((result) => {
          return dispatch({ type: "signIn", payload: result.user });
        });
      } catch (error) {
        userContext.dispatch({ type: "signOut" });
        Cookies.remove("token");
        router.push("/auth");
      }
      setIsAuthorizationChecked(true);
    };
    fetchDetails();
  }, []);

  if (!isAuthorizationChecked) {
    return <PageLoader />;
  }

  return (
    <UserContext.Provider value={{ userState: state, userDispatch: dispatch }}>
      <div className="fixed flex flex-col justify-between lg:justify-start lg:flex-row h-screen w-full">
        <div className="lg:order-1 order-2 lg:relative fixed z-20 bottom-0 lg:w-fit w-full">
          <ActivityBar activeBar={navName} />
        </div>
        <div className="lg:overflow-y-auto bg-[#171717] text-white w-full order-1 lg:order-2">
          {children}
        </div>
      </div>
    </UserContext.Provider>
  );
}

export default AdminComp;
