import React, { useState, useRef, useEffect } from "react";
import Banner from "./Banner";
import fetchData from "./common/Fetcher";
import Message from "./Message";

function Chat() {
  const BACKEND_URL = "https://chatgptmediator.onrender.com";
  const [messages, setMessages] = useState([]);
  const [prompt, setPromptValue] = useState("");
  const [loading, setLoading] = useState(false);

  const messageId = () => {
    return `id-${Date.now()}-${Math.random().toString(16)}`;
  };
  const chatContainer = useRef(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessages([
      ...messages,
      { messageId: messageId(), fromUser: true, text: prompt },
    ]);
    fetchData(BACKEND_URL, prompt).then((data) => {
      setMessages((prevs) => [
        ...prevs,
        { messageId: messageId(), fromUser: false, text: data },
      ]);
    });

    setPromptValue("");
    setLoading(true);
    chatContainer.current.scrollTop += chatContainer.current?.scrollHeight;
  };
  const onEnterPress = async (e) => {
    if (e.keyCode == 13 && e.shiftKey == false) {
      e.preventDefault();
      setMessages((prevs) => [
        ...prevs,
        { messageId: messageId(), fromUser: true, text: prompt },
      ]);
      setLoading(true);
      fetchData(BACKEND_URL, prompt).then((data) => {
        console.log(prompt);
        console.log(data);
        setLoading(false);
        setMessages((prevs) => [
          ...prevs,
          { messageId: messageId(), fromUser: false, text: data },
        ]);
      });
      setPromptValue("");

      chatContainer.current.scrollTop += chatContainer.current?.scrollHeight;
    }
  };

  return (
    <div id="chat">
      <Banner />
      <div id="chat_container" ref={chatContainer}>
        {messages
          .filter((msg) => msg.text != "")
          .map((msg, index) => (
            <div key={index}>
              <Message fromUser={msg.fromUser} text={msg.text} />
            </div>
          ))}
      </div>

      <form autoComplete="true" noValidate onSubmit={handleSubmit}>
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
        <button type="submit">
          <img src="src/assets/send.svg" alt="Send" />
        </button>
      </form>
    </div>
  );
}

export default Chat;
