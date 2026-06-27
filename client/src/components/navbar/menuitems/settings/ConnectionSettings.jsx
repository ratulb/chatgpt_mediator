import React, { useState } from "react";
import SettingsSaveButton from "../../../buttons/SettingsSaveButton";
import SettingsCancelButton from "../../../buttons/SettingsCancelButton";
import {
  getConnectionSettings,
  saveConnectionSettings,
  clearConnectionSettings,
} from "../../../../fetcher/DirectFetcher";

const ConnectionSettings = ({ id, activeTab, cancel }) => {
  const existing = getConnectionSettings() || {};
  const [mode, setMode] = useState(existing.apiKey ? "direct" : "backend");
  const [apiKey, setApiKey] = useState(existing.apiKey || "");
  const [baseUrl, setBaseUrl] = useState(existing.baseUrl || "https://api.openai.com/v1");
  const [model, setModel] = useState(existing.model || "gpt-4o-mini");

  const handleSave = (e) => {
    e.preventDefault();
    if (mode === "direct") {
      saveConnectionSettings({ apiKey, baseUrl, model });
    } else {
      clearConnectionSettings();
    }
  };

  return (
    activeTab === id ? (
      <div id="connection" className="active">
        <div className="settings_container">
          <form id="connection_settings_form">
            <div className="row">
              <label htmlFor="mode">Mode</label>
              <select
                name="mode"
                value={mode}
                onChange={(e) => setMode(e.target.value)}
              >
                <option value="backend">Backend (server)</option>
                <option value="direct">Direct (browser)</option>
              </select>
            </div>

            {mode === "direct" && (
              <>
                <div className="row">
                  <label htmlFor="apiKey">API Key</label>
                  <input
                    id="apiKey"
                    type="password"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder="sk-..."
                    className="settings-input"
                  />
                </div>
                <div className="row">
                  <label htmlFor="baseUrl">Base URL</label>
                  <input
                    id="baseUrl"
                    type="text"
                    value={baseUrl}
                    onChange={(e) => setBaseUrl(e.target.value)}
                    className="settings-input"
                  />
                </div>
                <div className="row">
                  <label htmlFor="model">Model</label>
                  <input
                    id="model"
                    type="text"
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                    placeholder="gpt-4o-mini"
                    className="settings-input"
                  />
                </div>
              </>
            )}

            <div className="row">
              <SettingsCancelButton marginLeft="0" onClickHandler={cancel} direction="right" />
              <SettingsSaveButton onClickHandler={handleSave} direction="right" />
            </div>
          </form>
        </div>
      </div>
    ) : null
  );
};

export default ConnectionSettings;
