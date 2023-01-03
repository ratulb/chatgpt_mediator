import * as presets from "./Constants";

var voices = [];
const synthesizer = window.speechSynthesis;
// get voices from SpeechSynthesis and set default voice at index
export const getVoices = async () => {
  if (voices.length > 0) {
    return voices;
  }
  try {
    voices = synthesizer.getVoices();
    defaultVoiceAtZerothIndex(voices);
  } catch (error) {
    console.error(error);
    console.error("Failure retrieving voices");
    return [];
  }
};

const defaultVoiceAtZerothIndex = (voices) => {
  let index = voices.findIndex((voice) => voice.default === true);
  [voices[0], voices[index]] = [voices[index], voices[0]];
};
//Does the speaking
const speak = async (speechAndConfigs) => {
  let _voices = getVoices();
  if (_voices.length == 0) {
    console.log("Failed to get voices");
    return;
  }
  synthesizer.cancel();
  let utterance = new window.SpeechSynthesisUtterance();

  utterance.voice = _voices[0];
  utterance.text = speechAndConfigs.speech;
  utterance.lang = speechAndConfigs.lang || presets.UTTERANCE_LANG;
  utterance.pitch =
    parseFloat(speechAndConfigs.pitch, 10) || presets.UTTERANCE_PITCH;
  utterance.rate =
    parseFloat(speechAndConfigs.rate, 10) || presets.UTTERANCE_RATE;
  utterance.volume =
    parseFloat(speechAndConfigs.volume, 10) || presets.UTTERANCE_VOLUME;
  utterance.onend = (e) =>
    speechAndConfigs.onUtteranceComplete(presets.UTTERANCE_COMPLETE);
  synthesizer.speak(utterance);
};
export default speak;
