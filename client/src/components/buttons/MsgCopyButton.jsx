import { useState } from "react";
import copyIcon from "../../assets/CopyIcon.png";
import Tooltip from "../common/Tooltip";

const MsgCopyButton = ({ direction, messageId }) => {
  const [content, setContent] = useState("Copy text");

  const copyMessage = (messageId) => {
    const contentDiv = document.getElementById(messageId + "-span");
    const copiedText = contentDiv.innerText;
    if (window.isSecureContext && navigator.clipboard) {
      navigator.clipboard.writeText(copiedText).then(() => { });
    } else {
      unsafeCopy(copiedText);
    }
    setContent("Copied");
  }
  const unsafeCopy = (text) => {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
    } catch (err) {
      console.error('Unable to copy to clipboard', { err });
    }
    document.body.removeChild(textArea);
  }

  const resetTooltipText = (e) => {
    if (content === "Copied") {
      setContent("Copy text");
    }
  }

  return (
    <Tooltip content={content} direction={direction}>
      <button type="button" onClick={(e) => copyMessage(messageId)}>
        <img src={copyIcon} alt="Copy" onMouseLeave={(e) => resetTooltipText(e)} />
      </button>
    </Tooltip>
  );
};

export default MsgCopyButton;
