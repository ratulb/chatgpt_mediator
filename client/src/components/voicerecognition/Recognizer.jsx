import React from 'react';
import VRButton from './VRButton';

const Recognizer = ({ setTextAreaContent }) => {
    const speechRecognizer = window.SpeechRecognition || window.webkitSpeechRecognition;
    return (
        <div>
            {speechRecognizer && (<VRButton SpeechRecognizer={speechRecognizer} setTextAreaContent={setTextAreaContent} />)
            }
        </div>
    );
}

export default Recognizer;
