import { REQUEST_ABORT_MSG } from "./StorageUtil";
import { fetchDirect, getConnectionSettings, abort as directAbort } from "../../fetcher/DirectFetcher.js";
var abortController;

export function abort() {
  if (getConnectionSettings()?.apiKey) {
    directAbort();
  } else if (abortController) {
    abortController.abort();
  }
}

async function fetchData(prompt) {
  if (getConnectionSettings()?.apiKey) {
    return fetchDirect(prompt);
  }

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";
  let data;
  try {
    abortController = new AbortController();
    const response = await fetch(BACKEND_URL, {
      method: "POST",
      signal: abortController.signal,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: prompt,
      }),

    });

    if (response.ok) {
      const resp = await response.json();
      const dataTrimmed = resp.bot.trim().replace(/^,/, "").trim();
      data = dataTrimmed;
    } else {
      try {
        const err = await response.text();
        console.log({ err });
        data =
          "Communication failure due to heavy traffic! Please try after a moment!";
      } catch (error) {
        console.log({ error });
        data =
          "Communication failure due to heavy traffic! Please try after a moment!!";
      }
    }
  } catch (abortOrNetworkError) {
    console.error({ abortOrNetworkError });
    if (abortOrNetworkError.name == 'AbortError') {
      console.log("Request aborted!", abortOrNetworkError.message);
      data = REQUEST_ABORT_MSG;
    } else {
      data =
        "Communication failure due to heavy traffic! Please try after a moment!!!";
    }
  }
  return data;
};
export const timeout = (delay) => {
  return new Promise((res) => setTimeout(res, delay));
};

export default fetchData;
