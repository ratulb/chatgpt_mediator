import { useState } from "react";
import WavySpeaker from "./WavySpeaker";
import {
  deleteConversation, cancelSpeech, MsgDeleteButton,
  ProfiledMsgTemplate, ReplayButton, MsgCopyButton, NORMAL
} from "../common";

const FinalRender = ({ messageId, prompt, type }) => {
  const [visible, setVisible] = useState(true);
  const [replay, setReplay] = useState(false);

  const deleteMessage = (messageId) => {
    deleteConversation(messageId);
    cancelSpeech(messageId);
    setVisible(false);
  };

  if (!visible) {
    return <></>;
  }
  const msgClassStyle = (type === NORMAL) ? "" : "message_unusual";
  return (

    <ProfiledMsgTemplate
      wrapper="wrapper ai"
      userProfile={false}
      messageId={messageId}
    >
      <>{!replay ? (
        <>
          <span className={msgClassStyle} id={`${messageId}-span`}>{prompt}</span>
          <div className="img_div">
            <>{type == "NORMAL" &&
              <>
                <MsgCopyButton
                  direction="left"
                  messageId={messageId}
                />
                <ReplayButton
                  direction="left"
                  onClickHandler={setReplay}
                  invokeWith={true}
                />
              </>
            }
            </>
            <MsgDeleteButton
              direction="left"
              onClickHandler={deleteMessage}
              messageId={messageId}
            />
          </div>

        </>)
        : (
          <><div>
            <WavySpeaker
              text={prompt}
              botMessageId={messageId}
              setSpeechComplete={setReplay}
              invokeWith={false}
              type={type}
            />
          </div>
            <div>
              <MsgDeleteButton
                direction="left"
                onClickHandler={deleteMessage}
                messageId={messageId}
              />
            </div>
          </>
        )}
      </>
    </ProfiledMsgTemplate>
  );
};

export default FinalRender;
