"use client";
import React, { useRef, useState } from "react";
import { ProfileEdit, UploadPictures } from "../Controllers/ProfileController";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import ButtonLoader from "../Loaders/ButtonLoader";
import { AiFillInfoCircle, AiOutlineCamera } from "react-icons/ai";
function ProfileSection(props) {
  const pic1 = useRef(null);
  const pic2 = useRef(null);
  const pic3 = useRef(null);
  const [image1, setImage1] = useState(null) ;
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [longBio, setLongBio] = useState(null);
  const [loader, setLoader] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const router = useRouter();
  const token = Cookies.get("token");
  const handleImageDisplay = (currentPicNumber) => (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        switch (currentPicNumber) {
          case "pic1":
            setImage1(e.target.result);
            break;
          case "pic2":
            setImage2(e.target.result);
            break;
          case "pic3":
            setImage3(e.target.result);
            break;
          default:
            console.log("No pic selected");
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageDisplayForPic1 = handleImageDisplay("pic1");
  const handleImageDisplayForPic2 = handleImageDisplay("pic2");
  const handleImageDisplayForPic3 = handleImageDisplay("pic3");
  const handleImageSelection = (picNumber) => {
    switch (picNumber) {
      case "pic1":
        pic1.current.click();
        break;
      case "pic2":
        pic2.current.click();
        break;
      case "pic3":
        pic3.current.click();
        break;
      default:
        console.log("No pic selected");
    }
  };
  const HandleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);
    setErrorMessage(null);
    try {
      var pictures = {
        pic1: image1,
        pic2: image2,
        pic3: image3
      };
      var profile = await ProfileEdit(token, { longBio: longBio });
      var picUpload = await UploadPictures(pictures);
      profile.success && picUpload.success
        ? router.push("/profile/preferences")
        : Swal.fire({
            icon: "error",
            title: profile.message + " " + picUpload.message
          });
    } catch (error) {
      console.log(error.message);
    }
    setLoader(false);
  };
  return (
    <div className="mx-auto w-10/12 lg:w-3/5">
      <div className="bg-white md:px-10 md:py-8 p-5 rounded-xl">
        <div className="text-center space-y-3 py-5">
          <h1 className="auth-header">Profile Section</h1>
          <p className="font-extralight text-sm">
            All details here would show on your public feed
          </p>
        </div>
        {errorMessage ? (
          <div className="flex justify-center gap-2 py-5 [&>*]:self-center">
            <AiFillInfoCircle />
            <span className="text-center text-red-500">{errorMessage}</span>
          </div>
        ) : (
          <></>
        )}
        <div className="flex mx-auto w-fit gap-2 md:gap-5 [&>*]:self-center [&>*]:cursor-pointer">
          <div className="cursor-pointer group relative">
            <img
              src={image1 ? image1 : "/images/profile-1.png"}
              className="border-2 border-purple-500 rounded-full w-32 h-32 self-center object-cover group-hover:opacity-60"
            />
            <div className="hidden absolute top-0 group-hover:flex justify-center w-full h-full">
              <AiOutlineCamera
                onClick={() => handleImageSelection("pic1")}
                className="self-center text-3xl text-white"
              />

              <input
                type="file"
                name="pic1"
                onChange={handleImageDisplayForPic1}
                alt=""
                ref={pic1}
                className="hidden"
              />
            </div>
          </div>
          <div className="cursor-pointer group relative">
            <img
              src={image2 ? image2 : "/images/profile-2.png"}
              className="border-2 border-purple-500 rounded-full w-32 h-32 self-center object-cover group-hover:opacity-60"
            />
            <div className="hidden absolute top-0 group-hover:flex justify-center w-full h-full">
              <AiOutlineCamera
                onClick={() => handleImageSelection("pic2")}
                className="self-center text-3xl text-white"
              />

              <input
                type="file"
                name="pic2"
                onChange={handleImageDisplayForPic2}
                alt=""
                ref={pic2}
                className="hidden"
              />
            </div>
          </div>
          <div className="cursor-pointer group relative">
            <img
              src={image3 ? image3 : "/images/profile-3.png"}
              className="border-2 border-purple-500 rounded-full w-32 h-32 self-center object-cover group-hover:opacity-60"
            />
            <div className="hidden absolute top-0 group-hover:flex justify-center w-full h-full">
              <AiOutlineCamera
                onClick={() => handleImageSelection("pic3")}
                className="self-center text-3xl text-white"
              />

              <input
                type="file"
                name="pic3"
                onChange={handleImageDisplayForPic3}
                alt=""
                ref={pic3}
                className="hidden"
              />
            </div>
          </div>
        </div>
        <form
          className="flex flex-col gap-5 py-5 mx-auto w-7/12"
          onSubmit={HandleSubmit}
        >
          <h3 className="text-center text-2xl font-medium">
            Tell us about yourself
          </h3>
          <textarea
            onChange={(e) => {
              setLongBio(e.target.value);
            }}
            required
            className="focus:outline-none focus:border border-[#584296] rounded-xl p-5 bg-inputBg h-32"
          />
          <button
            type="submit"
            className="bg-[#584296] text-white mx-auto w-fit md:px-24 rounded-lg py-4 md:text-2xl font-medium md:self-center"
          >
            {loader ? <ButtonLoader /> : "Save"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ProfileSection;
