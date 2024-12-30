import React, { useContext, useState } from "react";
import { AiFillInfoCircle } from "react-icons/ai";
import ButtonLoader from "../../Loaders/ButtonLoader";
import { RegContext } from "@/contexts/RegContext";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
function Description({ onNext, onPrev }) {
  const regContext = useContext(RegContext);
  const [gender, setGender] = useState(regContext?.RegState?.gender || null);
  const [school, setSchool] = useState(regContext?.RegState?.school || null);
  const [loader, setLoader] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const HandleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);
    if (!gender) {
      setErrorMessage("What is your gender? ");
      setLoader(false);
    } else {
      const payload = { gender, school };
      regContext.RegDispatch({ type: "update", payload });
      onNext();
    }
    setLoader(false);
  };
  const handleNext = () => {
    if (!gender) {
      return setErrorMessage("Kindly select a gender before proceeding");
    }
    onNext();
  };
  return (
    <div className="flex flex-col justify-center rounded-xl mx-auto bg-[#1B1B1B] md:w-fit w-11/12">
      <div className="p-5 md:px-10 rounded-xl">
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
        <div className="text-center py-5 space-y-4">
          <h1 className="auth-header">We'll like to know more</h1>
          <p className="text-sm font-extralight">
            This information would help us match you better
          </p>
        </div>
        {errorMessage ? (
          <div className="flex justify-center pb-4 gap-2 [&>*]:self-center">
            <AiFillInfoCircle />
            <span className="text-center text-red-500">{errorMessage}</span>
          </div>
        ) : (
          <></>
        )}
        <form className="grid gap-5" onSubmit={HandleSubmit}>
          <label className="font-light text-center">Select your gender</label>
          <div className="grid grid-cols-2 gap-3 md:gap-5">
            <div
              className={
                gender == "Male"
                  ? "description-item   bg-white text-black"
                  : "description-item bg-[#202020]"
              }
              onClick={() => setGender("Male")}
              onKeyDown={(event) => event.key == "Enter" && setGender("Male")}
            >
              Male
            </div>
            <div
              className={
                gender == "Female"
                  ? "description-item bg-white text-black "
                  : "description-item bg-[#202020]"
              }
              onClick={() => setGender("Female")}
            >
              Female
            </div>
          </div>
          <label className="font-light text-center">
            Are you in School? (optional)
          </label>
          <input
            className="py-2 rounded-lg font-light bg-[#202020] px-5 focus:outline-none focus:border"
            type="text"
            onChange={(e) => setSchool(e.target.value)}
            value={school}
            placeholder="E.g University of Lagos"
          />
          <button type="submit" className="auth-btn">
            {loader ? <ButtonLoader /> : "Save"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Description;
