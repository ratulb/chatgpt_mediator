import { useState, useEffect, useRef } from "react";
import { fetchData, saveConversation, abort, cancelSpeech } from "../common";
import InprogressRequest from "./InprogressRequest";
import ResponseHandler from "./ResponseHandler";
import AbortedRequest from "./AbortedRequest";

const Bot = ({ messageId, prompt }) => {
  const [loading, setLoading] = useState(true);
  const [response, setResponse] = useState("");
  const [aborted, setAborted] = useState(false);
  const [conversationType, setConversationType] = useState("");
  const timerStopHandle = useRef(null);
  ///bot response with _bot suffix
  const botMessageId = messageId + "_bot";

  const cancelRequest = (e) => {
    abort();
    cancelSpeech(botMessageId);
    setLoading(false);
    if (timerStopHandle.current) {
      timerStopHandle.current();
    }
    setAborted(true);
  }


  useEffect(() => {
    fetchData(prompt).then((data) => {
      setResponse(data);
      setLoading(false);
      if (timerStopHandle.current) {
        timerStopHandle.current();
      }

      const msg = { messageId: botMessageId, prompt: data };
      setConversationType(saveConversation(msg, false).type);
    });
  }, []);

  if (aborted) {
    return <AbortedRequest messageId={botMessageId} prompt={response} />
  }

  return (
    <>
      {loading ? (
        <InprogressRequest
          botMessageId={botMessageId}
          prompt={prompt}
          loading={loading}
          cancelRequest={cancelRequest}
          timerStopHandle={timerStopHandle}
        />
      ) : (
        <ResponseHandler text={response} botMessageId={botMessageId} type={conversationType} />
      )}
    </>
  );
};

export default Bot;
