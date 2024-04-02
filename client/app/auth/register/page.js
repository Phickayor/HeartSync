"use client";

import Register from "@/components/Auth/Registration/Register";
import About from "@/components/Auth/Registration/About";
import Description from "@/components/Auth/Registration/Description";
import ProfileSection from "@/components/Auth/Registration/ProfileSection";
import React, { useState } from "react";
import RegistrationComp from "@/components/Auth/Registration/RegistrationComp";
import Preference from "@/components/Auth/Registration/Preference";
import CardPreview from "@/components/Auth/Registration/CardPreview";

function page() {
  var [counter, setCounter] = useState(0);

  const handleNext = () => {
    setCounter(counter++);
  };
  const components = [
    <Register onNext={handleNext} />,
    <About onNext={handleNext} />,
    <Description onNext={handleNext} />,
    <ProfileSection onNext={handleNext} />,
    <CardPreview onNext={handleNext} />,
    <Preference action={"creation"} />
  ];

  return <RegistrationComp>{components[counter]}</RegistrationComp>;
}

export default page;
