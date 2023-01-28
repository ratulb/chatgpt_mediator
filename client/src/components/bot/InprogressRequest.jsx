import { useRef } from "react";
import { Loader, ProfiledMsgTemplate, CancelRequestButton } from "../common";
import Clock from "../common/clock/Clock";

const InprogressRequest = ({ botMessageId, prompt, loading, cancelRequest, timerStopHandle }) => {

  const loaderText = prompt?.trim().length === 0 ? " Umm... That's an ambiguous query! My asnwser would be as  ambiguous!" : "";

  return (
    <ProfiledMsgTemplate
      wrapper="wrapper ai"
      userProfile={false}
      messageId={botMessageId}
    >
      <>
        <Loader text={loaderText} loading={loading} />
        <div className="img_div">
          <Clock timerStopHandle={timerStopHandle} />
          <CancelRequestButton
            direction="left"
            onClickHandler={cancelRequest}
            messageId={botMessageId}
          />
        </div>
      </>
    </ProfiledMsgTemplate>
  );
};

export default InprogressRequest;
