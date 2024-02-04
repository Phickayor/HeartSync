import React from "react";
function Profile() {
  const preferences = [
    "Introvert",
    "Tall",
    "Loves to cook",
    "Christian",
    "Male",
    "Creative",
    "Techie"
  ];
  return (
    <div className="bg-[#171717] w-full p-20 text-white">
      <div className="flex gap-14">
        <img src="/images/profile-3.png" className="self-center" />
        <div className="flex flex-col gap-4">
          <div className="flex w-fit gap-8 h-fit">
            <h1 className="text-2xl self-center">Liger_325</h1>
            <div className="space-x-3 text-sm">
              <button className="bg-[#4c4c4c] px-6 py-2 rounded-xl ">
                Chat with
              </button>
              <button className="bg-[#4c4c4c] px-6 py-2 rounded-xl ">
                Share profile
              </button>
            </div>
          </div>
          <div className="grid grid-cols-3 text-lg">
            <span>10 Likes</span>
            <span>40 friends</span>
            <span>10 rejected</span>
          </div>
          <p className="font-light w-[24rem]">
            I believe in expressing my designs as art, I design to pass emotions
            not just to pass messages.
          </p>
        </div>
      </div>
      <div className="py-10 grid grid-cols-4 gap-8">
        {preferences.map((preference, index) => (
          <div
            key={index}
            className="py-4 bg-[#B093FF] text-black text-center rounded-full text-lg"
          >
            {preference}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Profile;
