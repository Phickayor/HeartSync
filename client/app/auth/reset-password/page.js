"use client";
import ResetPassword from "@/components/Auth/ResetPassword";
import React from "react";
import { useSearchParams } from "next/navigation";
function Page() {
  const searchParams = useSearchParams();
  const resetToken = searchParams.get("resetToken");
  return (
    <div className="flex flex-col justify-center h-screen fixed w-full bg-white pattern-background">
      <ResetPassword resetToken={resetToken} />
    </div>
  );
}

export default Page;
