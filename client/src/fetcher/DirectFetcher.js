import { REQUEST_ABORT_MSG } from "../components/common/StorageUtil";

const STORAGE_KEY = "direct_connection";
let abortController;

export function abort() {
  if (abortController) {
    abortController.abort();
  }
}

export function getConnectionSettings() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function saveConnectionSettings(settings) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
}

export function clearConnectionSettings() {
  localStorage.removeItem(STORAGE_KEY);
}

export async function fetchDirect(prompt) {
  const settings = getConnectionSettings();
  if (!settings || !settings.apiKey) {
    return "Direct mode is enabled but no API key is configured. Go to Settings > Connection.";
  }

  try {
    abortController = new AbortController();
    const response = await fetch(
      `${settings.baseUrl || "https://api.openai.com/v1"}/chat/completions`,
      {
        method: "POST",
        signal: abortController.signal,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${settings.apiKey}`,
        },
        body: JSON.stringify({
          model: settings.model || "gpt-4o-mini",
          messages: [{ role: "user", content: prompt }],
          temperature: settings.temperature ?? 0.1,
          max_tokens: settings.maxTokens ?? 2000,
        }),
      }
    );

    if (response.ok) {
      const resp = await response.json();
      return resp.choices[0].message.content.trim();
    } else {
      const err = await response.text();
      console.error({ err });
      let msg = `API error: ${response.status}`;
      try {
        const body = JSON.parse(err);
        if (body.error?.message) msg += ` — ${body.error.message}`;
      } catch {}
      return msg;
    }
  } catch (abortOrNetworkError) {
    console.error({ abortOrNetworkError });
    if (abortOrNetworkError.name === "AbortError") {
      return REQUEST_ABORT_MSG;
    }
    return "Communication failure. Please check your connection settings.";
  }
}
