"use client";
import ActivityBar from "@/components/Admin/ActivityBar";
import baseUrl from "@/config/server";
import Cookies from "js-cookie";
import React, { useEffect } from "react";

function page() {
  const token = Cookies.get("token");
  useEffect(() => {
    const checkAuth = async () => {
      const res = await fetch(`${baseUrl}/profile`, {
        method: "GET",
        headers: {
          "Content-Type": "appication/json",
          Authorization: `Bearer ${token}`
        }
      });
      const data = await res.json();
      console.log(data);
    };
  }, []);
  return (
    <div className="fixed flex h-screen w-full">
      <ActivityBar activeBar={"home"} />
    </div>
  );
}

export default page;
