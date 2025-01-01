"use client";
import React, { useContext, useRef, useState } from "react";
import ButtonLoader from "../../Loaders/ButtonLoader";
import { AiFillInfoCircle, AiOutlineCamera } from "react-icons/ai";
import { RegContext } from "@/contexts/RegContext";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

function ProfileSection({ onNext, onPrev }) {
  const regContext = useContext(RegContext);
  const pic = useRef(null);
  const [image, setImage] = useState(regContext?.RegState?.profilePicture || null);
  const [longBio, setLongBio] = useState(regContext?.RegState?.longBio || "");
  const [loader, setLoader] = useState(false);
  const [errors, setErrors] = useState([]); // Combined errors

  // Regex for bio validation (e.g., at least 20 characters and no special characters)
  const bioRegex = /^[a-zA-Z0-9\s,.'-]{20,}$/;  // Allow letters, numbers, spaces, and some common punctuation

  // Regex for image validation (only .jpg, .jpeg, .png files)
  const imageRegex = /(\.jpg|\.jpeg|\.png)$/i;

  const handleImageDisplay = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileName = file.name;
      if (!imageRegex.test(fileName)) {
        setErrors((prevErrors) => [
          ...prevErrors,
          "Please upload a valid image file (.jpg, .jpeg, .png).",
        ]);
        return;
      }
      const reader = new FileReader();
      reader.onload = function (e) {
        setImage(e.target.result);
        setErrors((prevErrors) => prevErrors.filter((error) => error !== "Please upload a valid image file (.jpg, .jpeg, .png)."));
      };
      reader.readAsDataURL(file);
    }
  };

  const HandleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);
    let formErrors = [];

    // Skip image validation if image is already displayed
    if (!image) formErrors.push("Please upload a profile picture.");

    // Validate bio using regex
    if (!longBio) formErrors.push("Please provide a bio.");
    if (longBio && !bioRegex.test(longBio)) formErrors.push("Bio should be at least 20 characters long and contain only letters, numbers, and basic punctuation.");

    if (formErrors.length > 0) {
      setErrors(formErrors);
      setLoader(false);
      return;
    }

    try {
      const payload = { profilePicture: image, longBio };
      regContext.RegDispatch({ type: "update", payload });
      onNext();
    } catch (error) {
      console.log(error.message);
      setErrors(["An unexpected error occurred. Please try again."]);
    }
    setLoader(false);
  };

  const handleNext = () => {
    let formErrors = [];

    // Validate image and bio before moving to the next section
    if (!image) formErrors.push("Please upload a profile picture.");
    if (!longBio) formErrors.push("Please provide a bio.");
    if (longBio && !bioRegex.test(longBio)) formErrors.push("Bio should be at least 20 characters long and contain only letters, numbers, and basic punctuation.");

    if (formErrors.length > 0) {
      setErrors(formErrors);
      return;
    }

    onNext();
  };

  return (
    <div className="flex flex-col justify-center rounded-xl mx-auto bg-[#1B1B1B]">
      <div className="p-5 px-10 rounded-xl">
        <div className="flex justify-between">
          <FaAngleLeft
            className="text-3xl font-extralight cursor-pointer"
            onClick={() => onPrev()}
          />
          <FaAngleRight
            className="text-3xl font-extralight cursor-pointer"
            onClick={handleNext}
          />
        </div>

        {errors.length > 0 && (
          <div className="flex flex-col gap-2 py-5">
            {errors.map((error, index) => (
              <div key={index} className="flex justify-center gap-2 [&>*]:self-center">
                <AiFillInfoCircle />
                <span className="text-center text-red-500 text-sm md:text-base xl:text-lg">{error}</span>
              </div>
            ))}
          </div>
        )}

        <div className="flex justify-between gap-5">
          <div className="space-y-2 py-5">
            <h1 className="text-2xl md:text-3xl xl:text-4xl font-medium">
              Profile Section
            </h1>
            <p className="font-extralight text-sm w-9/12">
              All details here will show on your public feed
            </p>
          </div>
          <div className="flex mx-auto w-fit gap-2 md:gap-5 [&>*]:self-center [&>*]:cursor-pointer">
            <div className="cursor-pointer group relative">
              {image ? (
                <img
                  src={image}
                  className="border-2 border-btnColor rounded-full w-24 h-24 self-center object-cover group-hover:opacity-60"
                />
              ) : (
                <div className="border-2 border-btnColor rounded-full size-20 flex flex-col justify-center place-content-center group-hover:opacity-0">
                  <img
                    src="/images/camera.png"
                    className="rounded-full size-10 self-center object-contain"
                  />
                </div>
              )}
              <div className="hidden absolute top-0 group-hover:flex justify-center w-full h-full">
                <AiOutlineCamera
                  onClick={() => {
                    pic.current.click();
                  }}
                  className="self-center text-3xl text-white"
                />
                <input
                  type="file"
                  name="profilePicture"
                  onChange={handleImageDisplay}
                  alt="Profile"
                  ref={pic}
                  className="hidden"
                />
              </div>
            </div>
          </div>
        </div>

        <form
          className="flex flex-col gap-5 py-5 mx-auto"
          onSubmit={HandleSubmit}
        >
          <input
            className="py-4 rounded-lg font-light bg-[#202020] px-5 focus:outline-none focus:border"
            type="text"
            onChange={(e) => {
              setLongBio(e.target.value);
              setErrors((prevErrors) => prevErrors.filter((error) => error !== "Bio should be at least 20 characters long and contain only letters, numbers, and basic punctuation.")); // Clear bio error when user types
            }}
            value={longBio}
            required
            placeholder="Add a short bio about yourself"
          />
          <button type="submit" className="auth-btn">
            {loader ? <ButtonLoader /> : "Save"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ProfileSection;
