import React from 'react';
import VoiceRecognitionButton from './VoiceRecognitionButton';

const Recognizer = ({ setTextAreaContent, textAreaHandle={textAreaHandle} }) => {
    const speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    return (
        <div>
            {speechRecognition && (<VoiceRecognitionButton recognizer={speechRecognition} setTextAreaContent={setTextAreaContent} textAreaHandle={textAreaHandle} />)
            }
        </div>
    );
}

export default Recognizer;
