"use client";
import ActivityBar from "@/components/Admin/ActivityBar";
import React, { useEffect, useState, useReducer, useContext } from "react";
import { useRouter } from "next/navigation";
import { GetUser } from "@/components/Controllers/UserController";
import { UserContext } from "@/contexts/UserContext";
import PageLoader from "@/loader/PageLoader";
import Cookies from "js-cookie";

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
  const [error, setError] = useState(null); // State for error handling
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
        const token = Cookies.get("token");
        const result = await GetUser(token);
        dispatch({ type: "signIn", payload: result.user });
      } catch (error) {
        setError({
          message:
            error.message || "Check your internet connection and try again."
        });
        if (error.message === "Unauthorized") {
          userContext?.dispatch({ type: "signOut" });
          Cookies.remove("token");
          router.push("/auth");
        }
      }
      setIsAuthorizationChecked(true);
    };
    fetchDetails();
  }, []);

  if (!isAuthorizationChecked) {
    return <PageLoader />;
  }

  const handleCloseError = () => {
    setError(null); // Reset the error when closing
  };

  return (
    <UserContext.Provider value={{ userState: state, userDispatch: dispatch }}>
      <div className="fixed flex flex-col justify-between lg:justify-start lg:flex-row h-screen w-full">
        <div className="lg:order-1 order-2 lg:relative fixed z-20 bottom-0 lg:w-fit w-full">
          <ActivityBar activeBar={navName} />
        </div>
        <div className="lg:overflow-y-auto bg-[#171717] text-white w-full order-1 lg:order-2">
          {children}
        </div>

        {/* Custom error popup */}
        {error && (
          <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50 w-full">
            <div className="bg-[#202020] p-8 rounded-lg flex flex-col items-center gap-1 w-fit">
              <p className="text-lg text-white font-semibold">
                {error.message}
              </p>
              <div className="flex justify-between mt-6">
                <button
                  onClick={handleCloseError}
                  className="px-6 py-3 bg-[#444444] text-white font-bold rounded-lg hover:bg-gray-800 transition"
                >
                  Ok
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </UserContext.Provider>
  );
}

export default AdminComp;
