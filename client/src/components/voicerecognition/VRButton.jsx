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
const QUESTION_STARTS = new Set(["who", "can", "will", "would", "should", "could", "what", "when", "where", "why", "how", "is", "are", "were", "was"]);


const VRButton = ({ SpeechRecognizer, setTextAreaContent }) => {

    const [recognitionOn, setRecognition] = useState(false);
    const [changed, setChanged] = useState(false);
    const displayed = useRef([]);
    const userAgent = useRef(navigator.userAgent);
    var currentRecognizer;

    function toggleSpeechRecognition(e) {
        setRecognition(!recognitionOn);
    }

    function update() {
        setChanged(value => !value);
    }

    function clearArray(array) {
        while (array.length > 0) {
            array.pop();
        }
    }

    function stopSpeechRecognition() {
        //console.log("Stopping recognition");
        if (currentRecognizer) {
            currentRecognizer.onend = (event) => {
                setRecognition(false);
            }
            currentRecognizer.stop();
        }
    }

    function deleteAll() {
        displayed.current = [];
        setTextAreaContent("");
        update();
    }

    function deleteLastSentence() {
        displayed.current.pop();
        setTextAreaContent("");
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
            currentRecognizer.continuous = false;
            currentRecognizer.lang = getUserLang();
            currentRecognizer.interimResults = false;
            currentRecognizer.maxAlternatives = 1;

            currentRecognizer.onend = (event) => {
                currentRecognizer.start();
            }
            currentRecognizer.addEventListener("result", (event) => {
                const transcript = Array.from(event.results).filter(recogResult => recogResult.isFinal)
                    .map(finalResult => finalResult.item(0))
                    .map(firstAlternative => firstAlternative.transcript)
                    .map(dot)
                    .map(comma)
                    .map(question)
                    .map(capitalizeFirstLetter)
                    .map(addPeriodOrQuestionMark)
                    .map(cleanUpAll)
                    .map(eraseLastSentence)
                    .flatMap(each => each);
                displayed.current.push(transcript);
                // console.log("data returned: ", displayed.current);
                update();
            });
        }
        currentRecognizer.start();
        //console.log("Starting recognition");
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

    //const commands = useRef([(transcripts) => comma(transcripts)], (transcripts) => dot(transcripts));
    //(transcript) => dot(transcript), (transcript) => cleanUpAll(transcript)]);

    function question(transcripts) {
        //console.log("The transcripts:", transcripts + "END");
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
        //console.log("The transcript dot:", transcript + "END");
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
        // console.log("The transcripts comma:", transcripts + "END");
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

    function addPeriodOrQuestionMark(transcripts) {
        const transcript = transcripts[0];
        //console.log("What is the type:", typeof transcripts);
        //console.log("The transcripts addPeriodOrQuestionMark:", transcripts + "END");
        const skip = transcript.endsWith(".") || transcript.endsWith(",") || transcript.endsWith("?");
        if (skip) {
            return transcripts;
        }
        const question = isQuestion(transcript);
        return question ? [transcript + "?"] : [transcript + "."];
    }

    function cleanUpAll(transcripts) {
        const transcript = transcripts[0];
        const match = transcript?.match("Delete all");
        if (match) {
            //console.log("cleanUpAll match:", { match });
            deleteAll();
            return [];
        }
        return transcripts;
    }

    function eraseLastSentence(transcripts) {
        const transcript = transcripts[0];
        const match =
            transcript?.match("Delete last");
        if (match) {
            deleteLastSentence();
            return [];
        }
        return transcripts;
    }


    function isQuestion(sentence) {
        try {
            return QUESTION_STARTS.has(sentence?.trim().split(" ")[0].toLowerCase());
        }catch(error){
            console.error(error);
            return false;
        }
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
        <Tooltip content="Toggle speech recognition. Say coma, delete all etc to punctuate/delete" direction="top">
            <button type="button" onClick={(e) => toggleSpeechRecognition(e)}>
                <img src={recognitionOn ? recognitionOnIcon : recognitionOffIcon} className={recognitionOn ? "recognition_on" : "recognition_off"} alt="Toggle voice recognition" />
            </button>
        </Tooltip>
    );
}

export default VRButton;
