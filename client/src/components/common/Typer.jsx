import { useState, useEffect } from "react";
import Spectrum from "../speaker/Spectrum";
import speak from "../speaker/SpeechSynthesizer";
const Typer = ({ content, speed = 20 }) => {
  const [text, setText] = useState("");
  const [utteranceComplete, setUtteranceComplete] = useState(false);
  const handleTyping = () => {
    setText(content.substring(0, text.length + 1));
  };

  useEffect(() => {
    let speechAndConfigs = {
      speech: content,
      onUtteranceComplete: setUtteranceComplete,
    };
    speak(speechAndConfigs);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      handleTyping();
    }, speed);
    return () => clearTimeout(timer);
  });

  return (
    <>
      {!utteranceComplete ? (
        <>
          <Spectrum />
          {text}
        </>
      ) : (
        <>{text}</>
      )}
    </>
  );
};

export default Typer;
