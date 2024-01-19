import React from "react";

function Description(props) {
  const HandleSubmit = (e) => {
    e.preventDefault();
    props.contentHandler("profile");
  };
  return (
    <div className="mx-auto w-10/12 lg:w-3/5">
      <div className="bg-white md:px-10 md:py-8 p-5 rounded-xl">
        <div className="text-center py-5 space-y-3">
          <h1 className="auth-header">We'll like to know more</h1>
          <p className="text-sm font-extralight">
            This information would help us
            <br /> match you better
          </p>
        </div>
        <form
          className="flex flex-col gap-5 md:gap-8 py-5"
          onSubmit={HandleSubmit}
        >
          <div className="grid grid-cols-3 gap-8 description-items">
            <div>Tall</div>
            <div>Not to tall</div>
            <div>Short</div>
          </div>
          <div className="grid grid-cols-2 gap-8 description-items">
            <div>Male</div>
            <div>Female</div>
          </div>
          <div className="grid grid-cols-3 gap-8 description-items">
            <div>Fat</div>
            <div>Not to Fat</div>
            <div>Slim</div>
          </div>
          <button
            type="submit"
            className="bg-[#584296] text-white mx-auto w-fit md:px-24 rounded-lg py-4 md:text-2xl font-medium md:self-center"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
}

export default Description;
