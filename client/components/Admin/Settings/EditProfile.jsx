"use client";
import { AuthEdit } from "@/components/Controllers/CheckAuth";
import { ProfileEdit } from "@/components/Controllers/ProfileController";
import ButtonLoader from "@/components/Loaders/ButtonLoader";
import Cookies from "js-cookie";
import React, { useState } from "react";
import { AiFillCloseCircle, AiFillInfoCircle } from "react-icons/ai";

function EditProfile(props) {
  const [errorMessage, setErrorMessage] = useState(null);
  const [value, setValue] = useState(null);
  const [loader, setLoader] = useState(false);
  const token = Cookies.get("token");

  const handleClose = () => {
    props.editHandler(null);
  };

  const handleProfileEdit = async (e) => {
    e.preventDefault();
    setLoader(true);
    var payload = {
      [props.keyName]: value
    };
    if (props.keyName == "phoneNumber") {
      payload.phoneNumber = parseInt(value);
      console.log(payload);
    }
    try {
      var profileEdit = await ProfileEdit(token, payload);
      alert(profileEdit.message);
      handleClose();
    } catch (error) {
      console.log(error);
    }
    setLoader(false);
  };
  const handleAuthEdit = async (e) => {
    setLoader(true);
    e.preventDefault();
    console.log(props.keyName);
    var payload = {
      [props.keyName]: value
    };
    try {
      var authEdit = await AuthEdit(token, payload);
      alert(authEdit.message);
      handleClose();
    } catch (error) {
      console.log(error);
    }
    setLoader(false);
  };
  return (
    <div className={`fixed h-screen z-20 w-full flex flex-col justify-center`}>
      <div className="p-6 py-8 rounded-xl bg-[#262626] border border-white text-white mx-auto w-2/5">
        <div className="relative flex justify-center">
          <h1 className="text-center text-2xl self-center">
            Edit {props.name}
          </h1>
          <AiFillCloseCircle
            className="absolute right-6 text-3xl self-center cursor-pointer hover:scale-110"
            onClick={handleClose}
          />
        </div>
        <form
          className="flex flex-col gap-5 pt-10"
          onSubmit={
            props.keyName == "email" || props.keyName == "password"
              ? handleAuthEdit
              : handleProfileEdit
          }
        >
          <input
            type={props.keyName == "phoneNumber" ? "number" : "text"}
            placeholder={`New ${props.name}...`}
            name={props.keyName}
            onChange={(e) => {
              setValue(e.target.value);
            }}
            className="py-5 px-6 rounded-lg bg-[#1E1D1D] focus:outline-none"
          />
          {errorMessage ? (
            <div className="flex justify-center gap-2 [&>*]:self-center">
              <AiFillInfoCircle />
              <span className="text-center text-red-500">{errorMessage}</span>
            </div>
          ) : (
            <></>
          )}
          <button
            type="submit"
            className="bg-[#584296] text-white md:px-20 rounded-lg py-3 md:text-xl md:self-center mt-4"
          >
            {loader ? <ButtonLoader /> : "Save"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditProfile;
