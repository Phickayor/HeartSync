import React, { useContext, useState } from "react";
import { AiFillInfoCircle } from "react-icons/ai";
import ButtonLoader from "../../Loaders/ButtonLoader";
import { RegContext } from "@/contexts/RegContext";
function Description({ onNext }) {
  const [height, setHeight] = useState(null);
  const [gender, setGender] = useState(null);
  const [weight, setWeight] = useState(null);
  const [loader, SetLoader] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const regContext = useContext(RegContext);
  const HandleSubmit = async (e) => {
    e.preventDefault();
    SetLoader(true);
    if (height == null) {
      setErrorMessage("What category best fits your height?");
    } else if (gender == null) {
      setErrorMessage("What is your gender? ");
    } else if (weight == null) {
      setErrorMessage("What category best fits your weight?");
    } else {
      const payload = { height, gender, weight };
      regContext.RegDispatch({ type: "update", payload });
      onNext();
    }
    SetLoader(false);
  };
  return (
    <div className="flex flex-col justify-center h-screen mx-auto w-10/12 lg:w-4/6">
      <div className="p-5 px-10 rounded-xl">
        <div className="text-center py-5">
          <h1 className="auth-header">We'll like to know more</h1>
          <p className="text-sm font-extralight">
            This information would help us
            <br /> match you better
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
        <form className="flex flex-col gap-5 md:gap-8" onSubmit={HandleSubmit}>
          <div className="grid grid-cols-3 gap-8 description-items">
            <div
              className={
                height == "Tall"
                  ? "description-item bg-purple-500 text-white"
                  : "description-item bg-inputBg "
              }
              onClick={() => setHeight("Tall")}
            >
              Tall
            </div>
            <div
              className={
                height == "Not to tall"
                  ? "description-item bg-purple-500 text-white"
                  : "description-item bg-inputBg "
              }
              onClick={() => setHeight("Not to tall")}
            >
              Not to tall
            </div>
            <div
              className={
                height == "Short"
                  ? "description-item bg-purple-500 text-white"
                  : "description-item bg-inputBg "
              }
              onClick={() => setHeight("Short")}
            >
              Short
            </div>
          </div>
          <div className="flex justify-around gap-8 description-items px-20">
            <div
              className={
                gender == "Male"
                  ? "description-item bg-purple-500 w-1/2 text-white"
                  : "description-item bg-inputBg w-1/2"
              }
              onClick={() => setGender("Male")}
            >
              Male
            </div>
            <div
              className={
                gender == "Female"
                  ? "description-item bg-purple-500 w-1/2 text-white"
                  : "description-item bg-inputBg w-1/2 "
              }
              onClick={() => setGender("Female")}
            >
              Female
            </div>
          </div>
          <div className="grid grid-cols-3 gap-8 description-items">
            <div
              className={
                weight == "Fat"
                  ? "description-item bg-purple-500 text-white"
                  : "description-item bg-inputBg "
              }
              onClick={() => setWeight("Fat")}
            >
              Fat
            </div>
            <div
              className={
                weight == "Not to Fat"
                  ? "description-item bg-purple-500 text-white"
                  : "description-item bg-inputBg "
              }
              onClick={() => setWeight("Not to Fat")}
            >
              Not to Fat
            </div>
            <div
              className={
                weight == "Slim"
                  ? "description-item bg-purple-500 text-white"
                  : "description-item bg-inputBg "
              }
              onClick={() => setWeight("Slim")}
            >
              Slim
            </div>
          </div>
          <button
            type="submit"
            className="bg-[#584296] text-white mx-auto w-fit px-12 md:px-24 rounded-lg py-4 md:text-2xl font-medium md:self-center"
          >
            {loader ? <ButtonLoader /> : "Save"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Description;