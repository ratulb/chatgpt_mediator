import React from 'react';
import recognitionOnIcon from "../../assets/VoiceOnIcon.png";
import recognitionOffIcon from "../../assets/VoiceOffIcon.png";
import { Tooltip } from '../common';
import { useState } from 'react';
import { useEffect } from 'react';

import "./recognition.css";

const VoiceRecognitionButton = ({ recognizer, setTextAreaContent }) => {

    const [recognitionOn, setRecognition] = useState(false);
    const [recognitionIcon, setRecognitionIcon] = useState(recognitionOnIcon);

    const toggleSpeechRecognition = (e) => {
        setRecognition(!recognitionOn);

    };
    var recognition;

    useEffect(() => {
        if (recognitionOn) {
            setRecognitionIcon(recognitionOnIcon);
            if (!recognition) {
                recognition = new recognizer();
                console.log("Created a new recognition!");
                recognition.continuous = true;
                recognition.lang = 'en-US';
                recognition.interimResults = true;
                recognition.maxAlternatives = 1;

                recognition.onaudioend = (event) => {
                    console.log("audioend: ", { event });
                }

                recognition.onaudiostart = (event) => {
                    console.log("onaudiostart: ", { event });
                }

                recognition.onerror = (event) => {
                    console.log("onerror: ", { event });
                }

                recognition.onend = (event) => {
                    console.log("onend: ", { event });
                }

                recognition.onnomatch = (event) => {
                    console.log("onnomatch: ", { event });
                }

                recognition.onsoundend = (event) => {
                    console.log("onsoundend : ", { event });
                }

                recognition.onsoundstart = (event) => {
                    console.log("onsoundstart: ", { event });
                }

                recognition.onspeechend = (event) => {
                    console.log("onspeechend : ", { event });
                }

                recognition.onspeechstart = (event) => {
                    console.log("onspeechstart  : ", { event });
                }

                recognition.addEventListener("result", (e) => {
                    const speechContent = Array.from(e.results).map(results => results[0])
                        .map(result => result.transcript).join('');
                    console.log(speechContent);
                    setTextAreaContent(speechContent);

                });

            }
            recognition.start();
            console.log("Starting recognition");
        }
        else {
            setRecognitionIcon(recognitionOffIcon);
            console.log("Stopping recognition");
            if (recognition) {
                recognition.stop();
            }
        }
        return () => {
            if (recognition) {
                console.log("Returned handle stopping recognition")
                recognition.stop();
            }
        }
    }, [recognitionOn]);

    return (
        <Tooltip content="Toggle speech recognition" direction="top">
            <button type="button" onClick={(e) => toggleSpeechRecognition(e)}>
                <img src={recognitionIcon} className={recognitionOn ? "recognition_on" : "recognition_off"} alt="Toggle voice recognition" />
            </button>
        </Tooltip>
    );
}

export default VoiceRecognitionButton;
