import { useState, useEffect } from "react";
import { setSpeechOn, setSpeechOff } from "./common";
import speakerOnIcon from "../assets/VoiceOnIcon.png";
import speakerOffIcon from "../assets/VoiceOffIcon.png";

const SpeakerIcon = () => {
  const [isOn, setIsOn] = useState(true);
  const toggle = () => {
    setIsOn((prevState) => !prevState);
  };

  useEffect(() => {
    if (isOn) {
      setSpeechOn();
    } else {
      setSpeechOff();
    }
  }, [isOn]);

  return (
    <button type="button" onClick={() => toggle()}>
      <img
        src={isOn ? speakerOnIcon : speakerOffIcon}
        alt={isOn ? "On" : "Off"}
      />
    </button>
  );
};

export default SpeakerIcon;
