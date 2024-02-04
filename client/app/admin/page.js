"use client";
import ActivityBar from "@/components/Admin/ActivityBar";
import {CheckAuth} from "@/components/Controllers/CheckAuth";
import Home from "@/components/Admin/Home";
import baseUrl from "@/config/server";
import Cookies from "js-cookie";
import React, { useEffect } from "react";

function page() {
  const token = Cookies.get("token");
  useEffect(() => {
    const fetchDetails = async () => {
      var user = await CheckAuth(token);
      console.log(user);
    };
    fetchDetails();
  }, []);
  return (
    <div className="fixed flex h-screen w-full">
      <ActivityBar activeBar={"home"} />
      <Home />
    </div>
  );
}

export default page;
