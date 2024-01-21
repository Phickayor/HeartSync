import React from "react";
import Link from "next/link";
function ProfileSection(props) {
  const HandleSubmit = () => {
    props.contentHandler("description");
  };
  return (
    <div className="mx-auto w-10/12 lg:w-3/5">
      <div className="bg-white md:px-10 md:py-8 p-5 rounded-xl">
        <div className="text-center space-y-3 py-5">
          <h1 className="auth-header">Profile Section</h1>
          <p className="font-extralight text-sm">
            All details here would show on your public feed
          </p>
        </div>
        <div className="flex mx-auto w-fit gap-2 md:gap-5 md:[&>*]:w-fit [&>*]:w-28">
          <img src="/images/profile-1.png" />
          <img src="/images/profile-2.png" />
          <img src="/images/profile-3.png" />
        </div>
        <form
          className="flex flex-col gap-5 py-5 mx-auto w-7/12"
          onSubmit={HandleSubmit}
        >
          <h3 className="text-center text-2xl font-medium">Add a short bio</h3>
          <textarea className="focus:outline-none focus:border border-[#584296] rounded-xl p-5 bg-inputBg h-32" />
          {/* <button type="submit" className="bg-[#584296] text-white mx-auto w-fit md:px-24 rounded-lg py-4 md:text-2xl font-medium md:self-center"> */}
          <Link
            href="/profile/match-making"
            className="bg-[#584296] text-white mx-auto w-fit px-12 md:px-24 rounded-lg py-4 md:text-2xl font-medium md:self-center"
          >
            Save
          </Link>
          {/* </button> */}
        </form>
      </div>
    </div>
  );
}

export default ProfileSection;
