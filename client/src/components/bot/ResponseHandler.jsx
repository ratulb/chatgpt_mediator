import { useState } from "react";
import InitialRender from "./InitialRender";
import FinalRender from "./FinalRender";

const ResponseHandler = ({ text, botMessageId, type }) => {
  const [deleted, setDeleted] = useState(false);
  const [speechComplete, setSpeechComplete] = useState(false);

  if (deleted) {
    return <></>;
  }

  return (
    <>
      {!speechComplete ? (
        <InitialRender text={text}
          botMessageId={botMessageId}
          setSpeechComplete={setSpeechComplete}
          invokeWith={true}
          setDeleted={setDeleted}
          type={type}
        />

      ) : (
        <FinalRender messageId={botMessageId} prompt={text} type={type} />
      )
      }
    </>
  );
};

export default ResponseHandler;
