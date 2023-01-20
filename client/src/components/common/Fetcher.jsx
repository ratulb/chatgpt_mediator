import { REQUEST_ABORT_MSG } from "./StorageUtil";
var abortController;

export function abort() {
  if (abortController) {
    abortController.abort();
  }
}

async function fetchData(prompt) {
  const BACKEND_URL = "https://chatgptmediator.onrender.com";
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
      //Takes care of spurious "," at the beginning of res
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
    if (abortOrNetworkError.name == 'AbortError') { // handle abort()
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
