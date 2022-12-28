import React, { useState } from "react";
import Typer from "./common/Typer";
import Profile from "./Profile";

const Message = ({ messageId, fromUser, text }) => {
  let wrapper = fromUser ? "wrapper" : "wrapper ai";

  return (
    <div className={wrapper}>
      <div className="chat">
        <Profile userProfile={fromUser} />
        {fromUser ? (
          <div className="message" id={messageId}>
            {text}
          </div>
        ) : (
          <div className="message" id={messageId}>
            <Typer content={text} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Message;
