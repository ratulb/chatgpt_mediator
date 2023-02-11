import React, { useState, useRef, useEffect } from "react";
import "./chat.css";
import userImage from "../assets/UserImage.png";
import Bot from "./bot/Bot";
import UserPrompt from "./UserPrompt";
import SpeakerIcon from "./SpeakerIcon";
import SavedConversations from "./SavedConversations";
import { NORMAL } from "./common";
import VRButton from "./voicerecognition/VRButton";
import {
  default as uniqueId,
  saveConversation,
  UploadHelper,
  Tooltip,
} from "./common";

function Chat() {
  const [prompts, setPrompts] = useState([]);
  const [prompt, setPromptValue] = useState("");
  const [changed, setChanged] = useState(false);
  const speechRecognizer = window.SpeechRecognition || window.webkitSpeechRecognition;
  const chatContainer = useRef(null);
  const textAreaHandle = useRef(null);

  const setTextAreaContent = (textContent) => {
    setPromptValue(textContent);
    if (textAreaHandle.current) {
      textAreaHandle.current.focus();
    }
    chatContainer.current.scrollTop = chatContainer.current.scrollHeight;
  };

  useEffect(() => {
    let current = textAreaHandle.current;
    const listener = (e) => {
      if (current.validity.valueMissing) {
        current.setCustomValidity("Enter your query for chatGPT.");
      } else {
        current.setCustomValidity("");
      }
    };
    current.addEventListener('invalid', listener);
    chatContainer.current.scrollTop = chatContainer.current.scrollHeight;
    return () => current.removeEventListener('invalid', listener);
  }, [prompts]);

  const handleSubmit = async (e) => {
    if (prompt === "" || prompt.length === 0) {
      return false;
    }
    e.preventDefault();
    const msg = { messageId: uniqueId("user"), prompt: prompt };
    setPrompts((prevs) => [...prevs, msg]);
    saveConversation(msg, true);
    setPromptValue("");
  };

  const onEnterPress = async (e) => {
    if (prompt === "" || prompt.length === 0) {
      return false;
    }

    if (e.keyCode === 13 && e.shiftKey === false) {
      e.preventDefault();
      const msg = { messageId: uniqueId("user"), prompt: prompt };
      setPrompts((prevs) => [...prevs, msg]);
      saveConversation(msg, true);
      setPromptValue("");
    }
  };

  return (
    <div id="chat">
      <div id="chat_container" ref={chatContainer}>
        <SavedConversations
          prompts={prompts}
          setTextAreaContent={setTextAreaContent}
        />
        {prompts.map((prompt, index) => (
          <div key={index}>
            <UserPrompt
              messageId={prompt.messageId}
              prompt={prompt.prompt}
              setTextAreaContent={setTextAreaContent}
              type={prompt?.prompt.trim().length > 0 ? NORMAL : ""}
            />
            <Bot messageId={prompt.messageId} prompt={prompt.prompt} />
          </div>
        ))}
      </div>

      <>{speechRecognizer && <VRButton SpeechRecognizer={speechRecognizer} setTextAreaContent={setTextAreaContent} setChanged={setChanged} />
      }</>

      <form autoComplete="true" onSubmit={handleSubmit}>
        <textarea
          required
          ref={textAreaHandle}
          value={prompt}
          onChange={(e) => setPromptValue(e.target.value)}
          name="prompt"
          onKeyDown={onEnterPress}
          placeholder="Query ChatGPT..."
          rows="1"
          cols="1"
          autoFocus
        ></textarea>
        <Tooltip content="Query ChatGPT" direction="bottom">
          <button type="submit" id="send" disabled={prompt === ""}>
            <img src={userImage} alt="Send" />
          </button>
        </Tooltip>
        <Tooltip content="Upload text file" direction="bottom">
          <UploadHelper textHandler={setTextAreaContent} />
        </Tooltip>
        <Tooltip content="Toggle voice" direction="bottom">
          <SpeakerIcon />
        </Tooltip>

      </form>
    </div >
  );
}

export default Chat;
