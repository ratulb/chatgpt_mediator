import { useState, useEffect } from "react";
import WavesAndText from "./WavesAndText";
import { speak } from "../common";

const WavySpeaker = ({ text, botMessageId, setSpeechComplete, invokeWith, type }) => {
  const [complete, setComplete] = useState(false);
  const onSpeechComplete = () => {
    setComplete(true);
    setSpeechComplete(invokeWith);
  };

  useEffect(() => {
    let detailedSpeech = {
      speech: text,
      onSpeechComplete: onSpeechComplete,
      botMessageId: botMessageId,
    };
    speak(detailedSpeech);
  }, []);

  return <>{!complete ? <WavesAndText text={text} type={type} /> : null}</>;
};

export default WavySpeaker;
