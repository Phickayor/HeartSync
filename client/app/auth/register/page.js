"use client";

import Register from "@/components/Auth/Registration/Register";
import About from "@/components/Auth/Registration/About";
import Description from "@/components/Auth/Registration/Description";
import ProfileSection from "@/components/Auth/Registration/ProfileSection";
import React, { useState } from "react";
import RegistrationComp from "@/components/Auth/Registration/RegistrationComp";
import Preference from "@/components/Auth/Registration/Preference";
import CardPreview from "@/components/Auth/Registration/CardPreview";

function Page() {
  let [counter, setCounter] = useState(0);
  const handleNext = () => {
    setCounter(counter++);
  };
  
  const components = [
    <Register key="register" onNext={handleNext} />,
    <About key="about" onNext={handleNext} />,
    <Description key="description" onNext={handleNext} />,
    <ProfileSection key="profile" onNext={handleNext} />,
    <CardPreview key="cardPreview" onNext={handleNext} action={"creation"} />,
    <Preference key="preference" action={"creation"} />
  ];

  return <RegistrationComp>{components[counter]}</RegistrationComp>;
}

export default Page;
