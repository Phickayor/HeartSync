import React, { useContext, useState } from "react";
import { AiFillInfoCircle } from "react-icons/ai";
import ButtonLoader from "../../Loaders/ButtonLoader";
import { RegContext } from "@/contexts/RegContext";
function Description({ onNext }) {
  const [height, setHeight] = useState(null);
  const [gender, setGender] = useState(null);
  const [weight, setWeight] = useState(null);
  const [loader, setLoader] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const regContext = useContext(RegContext);
  const HandleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);
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
    setLoader(false);
  };
  return (
    <div className="flex flex-col justify-center h-screen mx-auto w-11/12 md:w-10/12 lg:w-4/6">
      <img src="/images/logo.svg" className="mx-auto lg:hidden" alt="" />
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
        <form className="grid gap-3 md:gap-5" onSubmit={HandleSubmit}>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5">
            <div
              className={
                height == "Tall"
                  ? "description-item bg-[#131725] "
                  : "description-item bg-slate-700 "
              }
              onClick={() => setHeight("Tall")}
              onKeyDown={(event) => event.key == "Enter" && setHeight("Tall")}
            >
              Tall
            </div>
            <div
              className={
                height == "Short"
                  ? "description-item bg-[#131725] "
                  : "description-item bg-slate-700 "
              }
              onClick={() => setHeight("Short")}
              onKeyDown={(event) => event.key == "Enter" && setHeight("Short")}
            >
              Short
            </div>
            <div
              className={
                height == "Not very tall"
                  ? "lg:col-span-1 col-span-2 description-item  bg-[#131725]"
                  : "lg:col-span-1 col-span-2 description-item  bg-slate-700 "
              }
              onClick={() => setHeight("Not very tall")}
              onKeyDown={(event) =>
                event.key == "Enter" && setHeight("Not very tall")
              }
            >
              Not very tall
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 md:gap-5">
            <div
              className={
                gender == "Male"
                  ? "description-item   bg-[#131725]"
                  : "description-item bg-slate-700"
              }
              onClick={() => setGender("Male")}
              onKeyDown={(event) => event.key == "Enter" && setGender("Male")}
            >
              Male
            </div>
            <div
              className={
                height == "Female"
                  ? "description-item bg-[#131725] "
                  : "description-item bg-slate-700"
              }
              onClick={() => setGender("Female")}
              onKeyDown={(event) => event.key == "Enter" && setGender("Female")}
            >
              Female
            </div>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5">
            <div
              className={
                weight == "Fat"
                  ? "description-item bg-[#131725] "
                  : "description-item bg-slate-700"
              }
              onClick={() => setWeight("Fat")}
              onKeyDown={(event) => event.key == "Enter" && setWeight("Fat")}
            >
              Fat
            </div>

            <div
              className={
                weight == "Slim"
                  ? "description-item  bg-[#131725] "
                  : "description-item bg-slate-700 "
              }
              onClick={() => setWeight("Slim")}
              onKeyDown={(event) => event.key == "Enter" && setWeight("Slim")}
            >
              Slim
            </div>
            <div
              className={
                weight == "Not very Fat"
                  ? "lg:col-span-1 col-span-2 description-item bg-[#131725]"
                  : "col-span-2 lg:col-span-1 description-item bg-slate-700"
              }
              onClick={() => setWeight("Not very Fat")}
              onKeyDown={(event) =>
                event.key == "Enter" && setWeight("Not very Fat")
              }
            >
              Not very Fat
            </div>
          </div>
          <button type="submit" className="auth-btn">
            {loader ? <ButtonLoader /> : "Save"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Description;
