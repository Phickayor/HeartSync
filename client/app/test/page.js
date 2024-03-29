"use client";
import React, { useState } from "react";

// Component to render above the page
const AbovePageComponent = ({ onClose, name }) => {
  return (
    <div
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        background: "white",
        padding: "20px",
        border: "1px solid black"
      }}
    >
      <h2>This is the component above the page</h2>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

// Component to trigger rendering above the page
const TriggerComponent = () => {
  const [showAbovePageComponent, setShowAbovePageComponent] = useState(false);

  const handleClick = () => {
    setShowAbovePageComponent(true);
  };

  const handleClose = () => {
    setShowAbovePageComponent(false);
  };

  return (
    <div>
      <h1>This is the current page</h1>
      <button onClick={handleClick}>Render Component Above</button>
      {showAbovePageComponent && <AbovePageComponent onClose={handleClose} />}
    </div>
  );
};

export default TriggerComponent;
