import React, { useState, useRef } from "react";
import Banner from "./Banner";
import Bot from "./Bot";
import UserPrompt from "./UserPrompt";

function Chat() {
  const [prompts, setPrompts] = useState([]);
  const [prompt, setPromptValue] = useState("");

  const uniqueId = () => {
    return "div_" + Math.random().toString(36).substr(2, 9);
  };
  const chatContainer = useRef(null);
  const handleSubmit = async (e) => {
    if (prompt == "" || prompt.length == 0) {
      return false;
    }
    e.preventDefault();

    setPromptValue("");
    chatContainer.current.scrollTop += chatContainer.current?.scrollHeight;
  };
  const onEnterPress = async (e) => {
    if (prompt == "" || prompt.length == 0) {
      return false;
    }

    if (e.keyCode == 13 && e.shiftKey == false) {
      e.preventDefault();
      setPrompts((prevs) => [
        ...prevs,
        { messageId: uniqueId(), prompt: prompt },
      ]);
      setPromptValue("");
      chatContainer.current.scrollTop += chatContainer.current?.scrollHeight;
    }
  };

  return (
    <div id="chat">
      <Banner />
      <div id="chat_container" ref={chatContainer}>
        {prompts.map((prompt, index) => (
          <div key={index}>
            <UserPrompt messageId={prompt.messageId} prompt={prompt.prompt} />
            <Bot messageId={prompt.messageId} prompt={prompt.prompt} />
          </div>
        ))}
      </div>

      <form autoComplete="true" onSubmit={handleSubmit}>
        <textarea
          required
          value={prompt}
          onChange={(e) => setPromptValue(e.target.value)}
          name="prompt"
          onKeyDown={onEnterPress}
          placeholder="Query ChatGPT..."
          rows="1"
          cols="1"
          autoFocus
        ></textarea>
        <button type="submit" disabled={!prompt}>
          <img src="src/assets/UserImage.png" alt="Send" />
        </button>
      </form>
    </div>
  );
}

export default Chat;
