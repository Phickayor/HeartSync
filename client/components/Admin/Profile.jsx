import React, { useEffect, useState } from "react";
import { GetAPic } from "../Controllers/PicturesController";

function Profile({ profileInfo }) {
  const [dp, setDp] = useState(null);
  const GetDp = async () => {
    var { picture } = await GetAPic(profileInfo.pictures, 1);
    setDp(picture);
  };
  useEffect(() => {
    GetDp();
  }, []);

  return (
    <div className="bg-[#171717] w-full p-20 text-white">
      <div className="flex gap-14">
        <img
          src={dp}
          className="w-32 h-32 object-cover rounded-full border-2 border-btnColor self-center"
        />
        <div className="flex flex-col gap-4">
          <div className="flex w-fit gap-8 h-fit">
            <h1 className="text-2xl self-center">{profileInfo?.userName}</h1>
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
          <p className="font-light leadng-[2rem] w-[32rem]">
            {profileInfo?.longBio}
          </p>
        </div>
      </div>

      <div className="py-10 grid grid-cols-4 gap-8">
        {profileInfo?.preferences?.map((preference, index) => (
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
