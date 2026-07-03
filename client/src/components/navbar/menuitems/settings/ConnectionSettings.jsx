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
  const [temperature, setTemperature] = useState(existing.temperature ?? 0.1);
  const [maxTokens, setMaxTokens] = useState(existing.maxTokens ?? 2000);
  const [systemPrompt, setSystemPrompt] = useState(existing.systemPrompt || "");

  const handleSave = (e) => {
    e.preventDefault();
    if (mode === "direct") {
      saveConnectionSettings({ apiKey, baseUrl, model, temperature, maxTokens, systemPrompt });
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
                <div className="row">
                  <label htmlFor="temperature">Temperature</label>
                  <input
                    id="temperature"
                    type="number"
                    step="0.1"
                    min="0"
                    max="2"
                    value={temperature}
                    onChange={(e) => setTemperature(parseFloat(e.target.value))}
                    className="settings-input"
                  />
                </div>
                <div className="row">
                  <label htmlFor="maxTokens">Max tokens</label>
                  <input
                    id="maxTokens"
                    type="number"
                    step="1"
                    min="1"
                    value={maxTokens}
                    onChange={(e) => setMaxTokens(parseInt(e.target.value, 10))}
                    className="settings-input"
                  />
                </div>
                <div className="row">
                  <label htmlFor="systemPrompt">System prompt</label>
                  <textarea
                    id="systemPrompt"
                    value={systemPrompt}
                    onChange={(e) => setSystemPrompt(e.target.value)}
                    placeholder="Optional: set a system-level instruction"
                    className="settings-input"
                    rows="3"
                  />
                </div>
                <div className="row byok-note">
                  <p>Your API key is stored in your browser's localStorage and never sent to any server — it goes directly to the LLM provider you configure.</p>
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
