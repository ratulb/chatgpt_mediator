import { useState, useEffect } from "react";
const Typer = ({ content, speed = 300 }) => {
  const [text, setText] = useState("");

  const handleTyping = () => {
    setText(content.substring(0, text.length + 1));
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      handleTyping();
    }, speed);
    return () => clearTimeout(timer);
  });

  return <>{text}</>;
};

export default Typer;
