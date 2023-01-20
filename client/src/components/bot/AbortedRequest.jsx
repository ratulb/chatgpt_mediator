import { useState } from "react";
import {
  deleteConversation, MsgDeleteButton,
  ProfiledMsgTemplate,
} from "../common";

const AbortedRequest = ({ messageId, prompt }) => {

  const [visible, setVisible] = useState(true);
  const deleteMessage = (messageId) => {
    deleteConversation(messageId);
    setVisible(false);
  };

  if (!visible) {
    return <></>;
  }

  return (

    <ProfiledMsgTemplate
      wrapper="wrapper ai"
      userProfile={false}
      messageId={messageId}
    >
      <span className="message_unusual">{prompt}</span>
      <div>
        <MsgDeleteButton
          direction="left"
          onClickHandler={deleteMessage}
          messageId={messageId}
        />
      </div>
    </ProfiledMsgTemplate>
  );
};

export default AbortedRequest;
