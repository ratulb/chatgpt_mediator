import * as presets from "./Constants";
import { getUserVoicePreferences } from "../common/";

const synthesizer = window.speechSynthesis;

var currentSpeech = null;
var speechOn = true;

export function setSpeechOn() {
  speechOn = true;
}

export function isSpeechOff() {
  return speechOn === false;
}
export function isSpeechOn() {
  return speechOn === true;
}

export function setSpeechOff() {
  cancelSpeech("", true);
  speechOn = false;
}


export async function getVoices() {
  try {
    return synthesizer.getVoices();
  } catch (error) {
    console.error("Failure retrieving voices: ", error);
    return [];
  }
}

function defaultVoice(synthVoices) {
  const synthDefaultVoice = synthVoices.filter(voice => voice.default === true);
  return synthDefaultVoice.length > 0 ? synthDefaultVoice[0] : null;

}

async function getPreferredOrDefaultVoice(synthVoices) {
  var voicesPreferences = getUserVoicePreferences();
  if (Object.entries(voicesPreferences).length === 0) {
    return defaultVoice(synthVoices);
  }
  var voiceAndLang = voicesPreferences.voiceAndLang;
  if (voiceAndLang === undefined || voiceAndLang === null) {
    return defaultVoice(synthVoices);
  }
  var nameAndLang = voiceAndLang.split('~');


  var preferredVoice = synthVoices.filter((voice) => ((voice.name === nameAndLang[0])
    && (voice.lang === nameAndLang[1])));
  if (preferredVoice?.length > 0) {
    return preferredVoice[0];
  }
  return defaultVoice(synthVoices);
}


//Does the speaking
export async function speak(detailedSpeech) {
  try {
    //console.log("speak Speech status is off?: " + isSpeechOff());
    if (detailedSpeech === null) {
      return;
    }
    synthesizer.cancel();
    if (currentSpeech && currentSpeech.onSpeechComplete) {
      currentSpeech.onSpeechComplete();
    }
    currentSpeech = detailedSpeech;
    if (isSpeechOff()) {
      if (currentSpeech && currentSpeech.onSpeechComplete) {
        currentSpeech.onSpeechComplete();
      }
      return;
    }

    const synthVoices = await getVoices();
    const voice = getPreferredOrDefaultVoice(synthVoices);
    if (voice === null) {
      console.error("Could not retrieve default or preferred voice!");
      if (currentSpeech && currentSpeech.onSpeechComplete) {
        currentSpeech.onSpeechComplete();
      }
      return;
    }
    const utterance = new window.SpeechSynthesisUtterance();
    utterance.voice = await voice;
    const voicesPreferences = getUserVoicePreferences();
    utterance.text = currentSpeech.speech;
    utterance.lang = voicesPreferences.lang || presets.UTTERANCE_LANG;
    utterance.pitch =
      parseFloat(voicesPreferences.pitch, 10) || presets.UTTERANCE_PITCH;
    utterance.rate =
      parseFloat(voicesPreferences.rate, 10) || presets.UTTERANCE_RATE;
    utterance.volume =
      parseFloat(voicesPreferences.volume, 10) || presets.UTTERANCE_VOLUME;
    utterance.onend = (e) => {
      currentSpeech.onSpeechComplete();
    };

    utterance.onerror = (e) => {
      currentSpeech.onSpeechComplete();
    };
    synthesizer.speak(utterance);
  } catch (err) {
    console.error(err);
    if (currentSpeech && currentSpeech.onSpeechComplete) {
      currentSpeech.onSpeechComplete();
    }
  }
}

export function cancelSpeech(botMessageId, force = false) {
  if (isSpeechOff()) {
    return;
  }
  if (synthesizer && synthesizer.speaking) {
    try {
      if (force) {
        synthesizer.cancel();
        if (currentSpeech && currentSpeech.onSpeechComplete) {
          currentSpeech.onSpeechComplete();
        }
      } else if (
        botMessageId &&
        currentSpeech &&
        currentSpeech.botMessageId === botMessageId
      ) {
        synthesizer.cancel();
        if (currentSpeech && currentSpeech.onSpeechComplete) {
          currentSpeech.onSpeechComplete();
        }
      } else {
        /***console.log(
          "Synthesizer is speaking message: " + currentSpeech?.botMessageId
        );
        console.log(
          "Synthesizer not cancelled for message: " +
          currentSpeech?.botMessageId
        );***/
      }
    } catch (error) {
      console.error(error);
    }
  }
}


