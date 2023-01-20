import React, { useRef } from "react";
import uploadIcon from "../../assets/UploadIcon.png";

const AttachmentHandler = ({ textHandler }) => {
  const inputFile = useRef();

  const openFile = (e) => {
    const currentFile = inputFile.current;
    inputFile.current?.click();
  };

  const readAndInvokeTextHandler = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    e.target.value = null;
    if (file) {
      const reader = new FileReader();
      reader.readAsText(file);
      reader.onload = (e) => {
        const text = reader.result;
        textHandler(text);
      };
    }
  };

  return (
    <>
      <button type="button" onClick={(e) => openFile(e)} id="attach">
        <img src={uploadIcon} alt="Upload" />
      </button>
      <input
        type="file"
        id="file-upload"
        accept=".txt,.md"
        ref={inputFile}
        onChange={readAndInvokeTextHandler}
        style={{ display: "none" }}
      />
    </>
  );
};

export default AttachmentHandler;
