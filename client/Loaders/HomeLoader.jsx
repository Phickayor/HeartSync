import React from "react";

function HomeLoader() {
  return (
    <div className="lg:h-screen h-[calc(100vh-3rem)] mx-auto w-10/12 py-4">
      <img src="/images/logo.svg" alt="" className="mx-auto lg:hidden " />
      <div className="grid lg:grid-cols-3 h-full py-10 gap-4">
        <div className="rounded-2xl bg-slate-400 card-skeleton"></div>
        <div className="hidden lg:block rounded-2xl bg-slate-400 card-skeleton"></div>
        <div className="hidden lg:block rounded-2xl bg-slate-400 card-skeleton"></div>
      </div>
    </div>
  );
}

export default HomeLoader;
