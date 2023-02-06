import React, { useState } from "react";
import "./settings.css";
import { cancelSpeech } from "../../common";
import AudioPreferences from "./preferences/AudioPreferences";
import StoragePreferences from "./preferences/StoragePreferences";
import TabNavItem from "./preferences/TabNavItem";

const Preferences = () => {
  cancelSpeech();

  const [activeTab, setActiveTab] = useState("");

  const cancel = (e) => {
    e.preventDefault();
    setActiveTab("");
  }

  return (
    <div>
      <div className="container">
        <ul className="settings-links">
          <TabNavItem title="Audio" id="audio_tab" activeTab={activeTab} setActiveTab={setActiveTab} />
          <TabNavItem title="Storage" id="storage_tab" activeTab={activeTab} setActiveTab={setActiveTab} />
        </ul>
        <div className="settings-content">
          <AudioPreferences id="audio_tab" activeTab={activeTab} cancel={cancel} />
          <StoragePreferences id="storage_tab" activeTab={activeTab} cancel={cancel} />
        </div>
      </div>
    </div>
  );
};

export default Preferences;
