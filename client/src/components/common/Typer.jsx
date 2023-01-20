import { useState, useEffect } from "react";
import WavesAndText from "../bot/WavesAndText";
import { speak } from "../speaker/SpeechSynthesizer";

const Typer = ({ content, botMessageId, speed = 0 }) => {
  const [text, setText] = useState("");
  const [utteranceComplete, setUtteranceComplete] = useState(false);
  const handleTyping = () => {
    setText(content.substring(0, text.length + 1));
  };

  useEffect(() => {
    let detailedSpeech = {
      speech: content,
      onSpeechComplete: setUtteranceComplete,
      botMessageId: botMessageId,
    };
    speak(detailedSpeech);
  }, [content, botMessageId]);

  useEffect(() => {
    const timer = setTimeout(() => {
      handleTyping();
    }, speed);
    return () => clearTimeout(timer);
  });

  return (
    <>
      {!utteranceComplete ? (
        <div>
          <WavesAndText text={text} />
        </div>
      ) : (
        <div>{text}</div>
      )}
    </>
  );
};

export default Typer;
