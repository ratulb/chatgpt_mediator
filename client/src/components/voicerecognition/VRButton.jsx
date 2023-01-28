import React, { useState, useEffect, useRef } from 'react';
import recognitionOnIcon from "../../assets/VoiceOnIcon.png";
import recognitionOffIcon from "../../assets/VoiceOffIcon.png";
import { getUserLang, Tooltip } from '../common';
import "./recognition.css";


const FULL_STOP = "full stop";
const QUESTION_MARK = "question mark";
const COMMA = "comma";
const PASS_THROUGH_FULL_STOP = ".";
const PASS_THROUGH_QUESTION_MARK = "?";
const PASS_THROUGH_COMMA = ",";


const VRButton = ({ SpeechRecognizer, setTextAreaContent }) => {

    const [recognitionOn, setRecognition] = useState(false);
    const [changed, setChanged] = useState(false);
    const displayed = useRef([]);
    var currentRecognizer;

    function toggleSpeechRecognition(e) {
        setRecognition(!recognitionOn);
    }

    const update = () => {
        setChanged(value => !value);
        console.log("Current length: ", displayed.current.length);
        console.log("************************");
        const all = displayed.current;
        console.log({ all });
        console.log("************************");
    }

    function clearArray(array) {
        while (array.length > 0) {
            array.pop();
        }
        return array;
    }

    function stopSpeechRecognition() {
        console.log("Stopping recognition");
        if (currentRecognizer) {
            currentRecognizer.stop();
        }
    }

    function deleteAll() {
        displayed.current = [];
        update();
    }

    useEffect(() => {
        setTextAreaContent("");
        if (displayed.current.length > 0) {
            setTextAreaContent(displayed.current.join(" "));
        }
    }, [changed]);


    function startSpeechRecognition() {
        if (!currentRecognizer) {
            currentRecognizer = new SpeechRecognizer();
            currentRecognizer.continuous = true;
            currentRecognizer.lang = getUserLang();
            currentRecognizer.interimResults = true;
            currentRecognizer.maxAlternatives = 1;

            currentRecognizer.onend = (event) => {
                setRecognition(false);
            }

            currentRecognizer.addEventListener("result", (event) => {
                const transcript = Array.from(event.results).filter(recogResult => recogResult.isFinal)
                    .map(finalResult => finalResult.item(0))
                    .map(firstAlternative => firstAlternative.transcript)
                    .map(dot)
                    .map(comma)
                    .map(question)
                    .map(capitalizeFirstLetter)
                    .map(cleanUpAll)
                    .filter(each => each?.length > 0);

                displayed.current = transcript;
                update();
            });
        }
        currentRecognizer.start();
        console.log("Starting recognition");
    }

    useEffect(() => {

        if (recognitionOn) {
            startSpeechRecognition();
        }
        else {
            stopSpeechRecognition();
        }
        return () => stopSpeechRecognition();

    }, [recognitionOn]);

    const commands = useRef([(transcripts) => comma(transcripts)], (transcripts) => dot(transcripts));
    //(transcript) => dot(transcript), (transcript) => cleanUpAll(transcript)]);

    function question(transcripts) {
        console.log("The transcripts:", transcripts + "END");
        const transcript = transcripts[0];
        const match = transcript.match(QUESTION_MARK);

        if (match) {
            const matched = match[0];
            const input = match.input;
            if (input.length === matched.length) {
                return [input.replace(matched, "?")];
            }
            return [input.replace(" " + matched, "?")];
        }
        return transcripts;
    }

    function dot(transcript) {
        console.log("The transcript:", transcript + "END");
        const match =
            transcript.match(FULL_STOP) ||
            transcript.match("period");

        if (match) {
            const matched = match[0];
            const input = match.input;
            //console.log("The match:", matched);
            //console.log("The input:", input);
            if (input.length === matched.length) {
                return [input.replace(matched, ".")];
            }
            return [input.replace(" " + matched, ".")];

        }
        return [transcript];
    }


    function comma(transcripts) {
        //console.log("The transcripts:", transcripts + "END");
        const transcript = transcripts[0];
        const match = transcript.match(COMMA);

        if (match) {
            const matched = match[0];
            const input = match.input;
            if (input.length === matched.length) {
                return [input.replace(matched, ",")];
            }
            return [input.replace(" " + matched, ",")];
        }
        return transcripts;
    }

    function cleanUpAll(transcripts) {
        var match;
        try {
            var transcript = transcripts[0];
            match =
                transcript.match("Clear all") ||
                transcript.match("Clean up") ||
                transcript.match("Delete all");
            if (match) {
                console.log("cleanUpAll match:", { match });
                deleteAll();
                return [];
            } else {
                return [transcript];
            }
        } catch (error) {
            console.error(error);
            return [];
        }
    }


    function isQuestion(sentence) {
        if (sentence.endsWith("?")) {
            return true;
        }
        const words = ["who", "what", "when", "where", "why", "how"];
        for (let i = 0; i < words.length; i++) {
            if (sentence.startsWith(words[i])) {
                return true;
            }
        }
        return false;
    }

    function isLowerCase(s) {
        return s === s.toLowerCase() && s !== s.toUpperCase();
    }

    function capitalizeFirstLetter(input) {

        //console.log("capitalizeFirstLetter:", input + "END");

        if (input?.length === 0) {
            return input;
        }
        const string = input.shift();
        if (string?.trim() === "") {
            input.unshift(string);
            return input;
        }
        if (string === PASS_THROUGH_FULL_STOP) {
            input.unshift(".");
            return input;
        }
        if (string === PASS_THROUGH_QUESTION_MARK) {
            input.unshift("?");
            return input;
        }
        if (string === PASS_THROUGH_COMMA) {
            input.unshift(",");
            return input;
        }
        if (string.startsWith(' ')) {
            if (!isLowerCase(string[1])) {
                input.unshift(string);
                return input;
            }
            const firstWord = " " + string.charAt(1).toUpperCase() + string.slice(2);
            input.unshift(firstWord);
            return input;
        } else {
            if (!isLowerCase(string[0])) {
                input.unshift(string);
                return input;
            }
            const firstWord = string.charAt(0).toUpperCase() + string.slice(1);
            input.unshift(firstWord);
            return input;
        }
        return input;
    }

    return (
        <Tooltip content="Toggle speech recognition. Say coma, full stop etc to punctuate" direction="top">
            <button type="button" onClick={(e) => toggleSpeechRecognition(e)}>
                <img src={recognitionOn ? recognitionOnIcon : recognitionOffIcon} className={recognitionOn ? "recognition_on" : "recognition_off"} alt="Toggle voice recognition" />
            </button>
        </Tooltip>
    );
}

export default VRButton;
