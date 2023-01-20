import React from "react";
import { Waves, NORMAL } from "../common";

const WavesAndText = ({ text, type }) => {

  const msgClassStyle = (type === NORMAL) ? "" : "message_unusual";
  return (
    <>
      <Waves />
      <span className={msgClassStyle}> {text} </span>
    </>
  );
};

export default WavesAndText;
