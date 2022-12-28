import { useState, useEffect } from "react";

const fetchData = async (url, prompt) => {
  let data;
  /***
   * Begin spinner loading
   */
  try {
    const response = await fetch(url, {
      method: "POST",
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
        console.log(err);
        data =
          "Communication failure due to heavy traffic! Please try after a moment!";
      } catch (error) {
        console.log(error);
        data =
          "Communication failure due to heavy traffic! Please try after a moment!!";
      }
    }
  } catch (accessError) {
    console.log(accessError);
    data =
      "Communication failure due to heavy traffic! Please try after a moment!!!";
  }
  /***
   * Clear spinner here
   */
  return data;
};

export default fetchData;
