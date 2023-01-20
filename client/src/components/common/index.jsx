import fetchData, { timeout, abort } from "./Fetcher";
import {
  saveConversation,
  loadConversations,
  deleteConversation,
  setUserPreferredStore,
  saveUserVoicePreferences,
  getUserVoicePreferences,
  getUserPreferredStore,
  EMPTY_QUERY,
  ABORT_RESPONSE,
  AMBIGUOUS_RESPONSE,
  REQUEST_ABORT_MSG,
  NORMAL
} from "./StorageUtil";
import Typer from "./Typer";
import useFetch from "./useFetch";
import UploadHelper from "./UploadHelper";
import Tooltip from "./Tooltip";
import Loader from "./Loader";
import MsgDeleteButton from "./MsgDeleteButton";
import MsgResubmitButton from "./MsgResubmitButton";
import ProfiledMsgTemplate from "./ProfiledMsgTemplate";
import CancelRequestButton from "./CancelRequestButton";
import ReplayButton from "./ReplayButton";
import MsgCopyButton from "../buttons/MsgCopyButton";

import Waves from "../speaker/Waves";
import {
  setSpeechOn,
  isSpeechOff,
  cancelSpeech,
  setSpeechOff,
  isSpeechOn,
  speak
} from "../speaker/SpeechSynthesizer";
const generateUniqueId = (prefix = "div") => {
  return prefix + Math.random().toString(36).substr(2, 9);
};

export {
  fetchData,
  saveConversation,
  loadConversations,
  Typer,
  useFetch,
  UploadHelper,
  timeout,
  deleteConversation,
  Tooltip,
  setSpeechOn,
  isSpeechOff,
  cancelSpeech,
  setSpeechOff,
  isSpeechOn,
  Waves,
  MsgDeleteButton,
  MsgResubmitButton,
  ProfiledMsgTemplate,
  speak,
  Loader,
  abort,
  CancelRequestButton,
  ReplayButton,
  MsgCopyButton,
  setUserPreferredStore,
  saveUserVoicePreferences,
  getUserVoicePreferences,
  getUserPreferredStore,
  EMPTY_QUERY,
  ABORT_RESPONSE,
  AMBIGUOUS_RESPONSE,
  REQUEST_ABORT_MSG,
  NORMAL
};
export default generateUniqueId;
