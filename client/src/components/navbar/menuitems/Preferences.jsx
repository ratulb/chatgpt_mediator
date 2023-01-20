import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./settings.css";
import {
  cancelSpeech, getUserVoicePreferences,
  saveUserVoicePreferences, setUserPreferredStore, getUserPreferredStore
} from "../../common";
import SettingsSaveButton from "../../buttons/SettingsSaveButton";
import SettingsCancelButton from "../../buttons/SettingsCancelButton";

const Preferences = () => {
  cancelSpeech();

  const [voices, setVoices] = useState(window.speechSynthesis?.getVoices());
  const [voicesPreferences, setVoicePreferences] = useState(getUserVoicePreferences());
  const [storeType, setStoreType] = useState(getUserPreferredStore());
  const [visible, setVisible] = useState(true);

  const cancel = (e) => {
    e.preventDefault();
    //document.getElementById("voice_settings_form").reset();
    //document.getElementById("store_setting_form").reset();
    setVisible(false);
  }

  const saveVoiceSettings = (e) => {
    e.preventDefault();
    saveUserVoicePreferences(voicesPreferences);
  }

  const saveStorageSettings = (e) => {
    e.preventDefault();
    setUserPreferredStore(storeType);
  }

  useEffect(() => {
    if (voices?.length === 0) {
      setVoices(window.speechSynthesis?.getVoices());
    }
    setup();
    setVisible(true);
  }, [voices, visible]);

  function setup() {
    document.querySelectorAll('.settings-links a').forEach(link => link.classList.remove('active'));
    document.querySelectorAll('.settings-links a').forEach(link => {
      link.addEventListener('click', e => {
        e.preventDefault();
        document.querySelectorAll('.settings-links a').forEach(link => link.classList.remove('active'));
        e.target.classList.add('active');
        document.querySelectorAll('.settings-content > div').forEach(content => content.style.display = 'none');
        document.querySelector(e.target.hash).style.display = 'block';
      });
    });
  }

  const percentage = (value, base) => {
    return Math.round((parseFloat(value) / base) * 100);
  }

  const handleChange = (e) => {
    e.preventDefault();
    setVoicePreferences({ ...voicesPreferences, [e.target.id]: e.target.value });
  }

  return (
    <div>
      <div className="container">
        <div className="settings-links">
          <Link to="#audio" className="active">Audio</Link>
          <Link to="#storage">Storage</Link>
        </div>
        {visible &&
          <div className="settings-content">
            <div id="audio" className="active">
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

            <div id="storage">
              <div className="settings_container">
                <form id="store_setting_form">
                  <div className="row">
                    <label htmlFor="datastore">Data store</label>
                    <select name="datastore" defaultValue={storeType} onChange={(e) => setStoreType(e.target.value)}>
                      <option value="session">Session</option>
                      <option value="localStorage">Local storage</option>
                    </select>
                  </div>
                  <div className="row">
                    <SettingsCancelButton marginLeft="0" onClickHandler={cancel} direction="right" />
                    <SettingsSaveButton onClickHandler={saveStorageSettings} direction="right" />
                  </div>
                </form>
              </div>
            </div>
          </div>}
      </div>
    </div>
  );

};

export default Preferences;
