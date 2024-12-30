import React, { useContext, useState } from "react";
import { AiFillInfoCircle } from "react-icons/ai";
import ButtonLoader from "../../Loaders/ButtonLoader";
import { RegContext } from "@/contexts/RegContext";

function Description({ onNext }) {
  const [gender, setGender] = useState(null);
  const [inSchool, setInSchool] = useState("");
  const [loader, setLoader] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const regContext = useContext(RegContext);

  const HandleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);

    if (gender == null) {
      setErrorMessage("What is your gender? ");
    } else if (!inSchool.trim()) {
      setErrorMessage("Are you in school?");
    } else {
      const payload = { gender, inSchool };
      regContext.RegDispatch({ type: "update", payload });
      onNext();
    }
    setLoader(false);
  };

  return (
    <div className="">
      <img src="/images/logo.svg" className="mx-auto lg:hidden" alt="" />
      <div className="p-5 px-10 rounded-xl">
        <div className="text-center py-5">
          <h1 className="auth-header">We'll like to know more</h1>
          <p className="text-sm font-extralight">
            This information would help us
            <br /> match you better
          </p>
        </div>
        {errorMessage && (
          <div className="flex justify-center pb-4 gap-2 [&>*]:self-center">
            <AiFillInfoCircle />
            <span className="text-center text-red-500">{errorMessage}</span>
          </div>
        )}
        <form className="grid gap-3 md:gap-5" onSubmit={HandleSubmit}>
          <div className="grid grid-cols-2 gap-3 md:gap-5">
            {["Male", "Female"].map((option) => (
              <div
                key={option}
                className={`description-item ${gender === option ? 'bg-btnColor' : 'bg-[#131725]'}`}
                onClick={() => setGender(option)}
                onKeyDown={(event) => event.key === "Enter" && setGender(option)}
                tabIndex={0}
              >
                {option}
              </div>
            ))}
          </div>
          <div className=" flex flex-col mt-4 gap-2 font-medium text-lg">
            <label htmlFor="inSchool" className="font-medium text-lg">
              Are you in school? (Optional)
            </label>
            <input
              id="inSchool"
              type="text"
              value={inSchool}
              onChange={(e) => setInSchool(e.target.value)}
              className="bg-inherit border py-2 px-4 focus:outline-none focus:border-dashed rounded-md w-full"
              placeholder="Eg. University of Lagos"
            />
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
