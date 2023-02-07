import React, { useState, useEffect } from 'react';
import SettingsSaveButton from "../../../buttons/SettingsSaveButton";
import SettingsCancelButton from "../../../buttons/SettingsCancelButton";

import { getUserVoicePreferences, saveUserVoicePreferences } from "../../../common";

const AudioPreferences = ({ id, activeTab, cancel }) => {
    const [voices, setVoices] = useState(window.speechSynthesis?.getVoices());
    const [voicesPreferences, setVoicePreferences] = useState(getUserVoicePreferences());

    const saveVoiceSettings = (e) => {
        e.preventDefault();
        saveUserVoicePreferences(voicesPreferences);
    }

    const handleChange = (e) => {
        e.preventDefault();
        setVoicePreferences({ ...voicesPreferences, [e.target.id]: e.target.value });
    }

    const percentage = (value, base) => {
        return Math.round((parseFloat(value) / base) * 100);
    }

    useEffect(() => {
        if (voices?.length === 0) {
            setVoices(window.speechSynthesis?.getVoices());
        }
    }, [voices]);

    return (
        activeTab === id ? <div id="audio" className="active">
            <div className="settings_container">
                <form id="voice_settings_form">
                    {voices?.length > 0 ? (
                        <>
                            <div className="row">
                                <label htmlFor="voice">Voice</label>
                                <select defaultValue={voicesPreferences.voiceAndLang} name="voiceAndLang" id="voiceAndLang" onChange={handleChange}>
                                    {voices.map((voice, index) =>
                                        <option key={index}> {voice.name}~{voice.lang}</option>
                                    )}
                                </select>
                            </div>
                            <div className="row">
                                <label htmlFor="volume">Volume</label>
                                <input className="slider" id="volume" name="volume" type="range" min="0" max="1" defaultValue={(voicesPreferences?.volume) ? voicesPreferences.volume : "1"} step="0.1" onChange={handleChange}></input>
                                <span className="percentage">{(voicesPreferences?.volume) ? percentage(voicesPreferences.volume, 1) : "100"}%</span>
                            </div>
                            <div className="row">
                                <label htmlFor="pitch">Pitch</label>
                                <input className="slider" id="pitch" name="pitch" type="range" min="0" max="2" defaultValue={(voicesPreferences?.pitch) ? voicesPreferences.pitch : "1"} step="0.1" onChange={handleChange}></input>
                                <span className="percentage">{(voicesPreferences?.pitch) ? percentage(voicesPreferences.pitch, 2) : "50"}%</span>
                            </div>
                            <div className="row">
                                <label htmlFor="rate">Rate</label>
                                <input className="slider" name="rate" type="range" min="0.1" max="10" defaultValue={(voicesPreferences?.rate) ? voicesPreferences.rate : "1"} id="rate" step="0.1" onChange={handleChange}></input>
                                <span className="percentage">{(voicesPreferences?.rate) ? percentage(voicesPreferences.rate, 10) : "10"}%</span>
                            </div>
                            <div className="row">
                                <SettingsCancelButton marginLeft="4.2rem" onClickHandler={cancel} direction="right" />
                                <SettingsSaveButton onClickHandler={saveVoiceSettings} direction="right" />
                            </div>
                        </>
                    ) : (<span className="message_unusual">Failed to retrieve voices.</span>)}
                </form>
            </div>
        </div>
            : null
    );
};

export default AudioPreferences;