import React from "react";

function About(props) {
  const HandleSubmit = (e) => {
    e.preventDefault();
    props.contentHandler("description");
  };
  return (
    <div className="mx-auto w-10/12 lg:w-3/5">
      <div className="bg-white md:px-10 md:py-8 p-5 rounded-xl">
        <h1 className="text-2xl md:text-3xl text-center font-medium">
          Tell us about your self
        </h1>
        <form
          className="grid grid-cols-2 gap-3 md:gap-5 py-5"
          onSubmit={HandleSubmit}
        >
          <div className="flex flex-col gap-2">
            <label className="font-normal">Full name</label>
            <input
              type="text"
              required
              className="bg-inputBg md:py-4 focus:outline-none px-5 rounded-lg focus:border-[#584296] border"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-normal">Date of birth</label>
            <input
              type="date"
              required
              className="bg-inputBg md:py-4 focus:outline-none px-5 rounded-lg focus:border-[#584296] border"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-normal">Username</label>
            <input
              type="text"
              required
              className="bg-inputBg md:py-4 focus:outline-none px-5 rounded-lg focus:border-[#584296] border"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-normal">Email Address</label>
            <input
              type="email"
              required
              className="bg-inputBg md:py-4 focus:outline-none px-5 rounded-lg focus:border-[#584296] border"
            />
          </div>
          <button
            type="submit"
            className="col-span-2 bg-btnColor text-white mx-auto w-fit md:px-24 rounded-lg py-4 md:text-2xl font-medium md:self-center mt-4"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
}

export default About;
