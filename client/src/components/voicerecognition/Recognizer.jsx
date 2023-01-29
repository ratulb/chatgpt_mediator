import React from 'react';
import VRButton from './VRButton';

const Recognizer = ({ setTextAreaContent, setChanged }) => {
    const speechRecognizer = window.SpeechRecognition || window.webkitSpeechRecognition;
    return (
        <div>
            {speechRecognizer && (<VRButton SpeechRecognizer={speechRecognizer} setTextAreaContent={setTextAreaContent} setChanged={setChanged} />)
            }
        </div>
    );
}

export default Recognizer;
