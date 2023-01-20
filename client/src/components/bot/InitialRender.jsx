import { useState } from "react";
import WavySpeaker from "./WavySpeaker";

import {
  deleteConversation,
  MsgDeleteButton,
  ProfiledMsgTemplate,
  cancelSpeech
} from "../common";

const InitialRender = ({ text, botMessageId, setSpeechComplete, invokeWith, setDeleted, type }) => {
  const [visible, setVisible] = useState(true);
  const deleteMessage = (messageId) => {
    deleteConversation(messageId);
    cancelSpeech(botMessageId);
    setVisible(false);
    setDeleted(true);
  };

  if (!visible) {
    return <></>;
  }

  return (
    <ProfiledMsgTemplate
      wrapper="wrapper ai"
      userProfile={false}
      messageId={botMessageId}
    >
      <div>
        <WavySpeaker
          text={text}
          botMessageId={botMessageId}
          setSpeechComplete={setSpeechComplete}
          invokeWith={invokeWith}
          type={type}
        />
      </div>
      <div>
        <MsgDeleteButton
          direction="left"
          onClickHandler={deleteMessage}
          messageId={botMessageId}
        />
      </div >
    </ProfiledMsgTemplate >
  );
};

export default InitialRender;
