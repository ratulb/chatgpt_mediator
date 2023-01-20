import { useState } from "react";
import {
  deleteConversation,
  MsgResubmitButton,
  MsgDeleteButton,
  ProfiledMsgTemplate,
  NORMAL
} from "./common";

const UserPrompt = ({ messageId, prompt, setTextAreaContent, type }) => {
  const [visible, setVisible] = useState(true);

  const resubmit = (e) => {
    setTextAreaContent(prompt);
  };

  const deleteMessage = (messageId) => {
    deleteConversation(messageId);
    setVisible(false);
  };

  if (!visible) {
    return <></>;
  }
  const msgClassStyle = (type === NORMAL) ? "" : "message_unusual";
  return (
    <ProfiledMsgTemplate
      wrapper="wrapper"
      userProfile={true}
      messageId={messageId}
    >
      <span className={msgClassStyle}>{prompt}</span>
      <div className="img_div">
        {type === NORMAL && <MsgResubmitButton direction="left" resubmitHandler={resubmit} />}
        <MsgDeleteButton
          direction="left"
          onClickHandler={deleteMessage}
          messageId={messageId}
        />
      </div>
    </ProfiledMsgTemplate>
  );
};

export default UserPrompt;
