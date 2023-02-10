import { UTTERANCE_LANG } from "../speaker/Constants";
export const ABORT_RESPONSE = "ABORT_RESPONSE";
export const EMPTY_QUERY = "EMPTY_QUERY";
export const AMBIGUOUS_RESPONSE = "AMBIGUOUS_RESPONSE";
export const REQUEST_ABORT_MSG = "Request cancelled by user!";
export const NORMAL = "NORMAL";
export const COMM_FAILURE = "COMM_FAILURE";
export const COMMUICATION_FAILURE_MSG = "Communication failure due to heavy traffic! Please try after a moment";

const shouldUseLocalStorage = () => localStorage.getItem("store_type") === "localStorage";

export const setUserPreferredStore = (preferredStore) => {
  if (getUserPreferredStore() !== preferredStore) {
    const toLocal = preferredStore === "localStorage" ? true : false;
    moveData(toLocal);
  }
};

export const getUserPreferredStore = () => shouldUseLocalStorage() ? "localStorage" : "sessionStorage";

export const saveUserVoicePreferences = (userVoicePreferences) => {
  const currentPreferences = getUserVoicePreferences();
  const mergedPrefs = { ...currentPreferences, ...userVoicePreferences };
  const storage = getStorage();
  storage.setItem("voice_preferences", JSON.stringify(mergedPrefs));
};

function preferencesFromStore(store) {
  const userVoicePreferences = store.getItem("voice_preferences");
  if (userVoicePreferences) {
    try {
      return JSON.parse(userVoicePreferences);
    } catch (error) {
      console.error("Pref conversation error", error);
      return {};
    }
  }
  return {};
}

export const getUserVoicePreferences = () => {
  const storage = getStorage();
  return preferencesFromStore(storage);

}

export const getUserLang = () => {
  return getUserVoicePreferences().lang || UTTERANCE_LANG;
};

const getStorage = () =>
  shouldUseLocalStorage() ? localStorage : sessionStorage;

function conversationsFromStore(store) {
  const conversations = store.getItem("conversations");
  if (conversations) {
    try {
      return JSON.parse(conversations);
    } catch (error) {
      console.error("Conversations load error", error);
      return [];
    }
  }
  return [];
}

export const loadConversations = () => {
  const storage = getStorage();
  return conversationsFromStore(storage);
};

const preProcess = (conversations, conversation, fromUsr) => {
  let msgType;

  if (fromUsr) {
    if (conversation.prompt?.trim() === "") {
      msgType = EMPTY_QUERY;
    } else {
      msgType = NORMAL;
    }
  } else {
    let prompt = conversation.prompt;
    if (conversation.prompt === REQUEST_ABORT_MSG) {
      msgType = ABORT_RESPONSE;


    } else if (prompt.match(COMMUICATION_FAILURE_MSG)) {
      msgType = COMM_FAILURE;
    }

    else {

      if (conversations.length > 0) {
        var prevChat = conversations[conversations.length - 1];
        var prevChatId = prevChat.messageId + "_bot";
        var prevChatType = prevChat.type;
        if (conversation.messageId === prevChatId && prevChatType === EMPTY_QUERY) {
          msgType = AMBIGUOUS_RESPONSE;
        } else {
          msgType = NORMAL;
        }

      } else {
        msgType = NORMAL;
      }
    }
  }
  const typedMsg = { ...conversation, time: new Date().getTime(), user: fromUsr, type: msgType };
  return typedMsg;

}

export const saveConversation = (conversation, fromUsr) => {
  if (conversation === "" && !fromUsr) {
    return;
  }
  const storage = getStorage();
  var conversations = conversationsFromStore(storage);
  conversation = preProcess(conversations, conversation, fromUsr);
  conversations.push(conversation);
  storage.setItem("conversations", JSON.stringify(conversations));
  return conversation;
};

function moveData(toLocal) {
  var fromStore;
  var toStore;
  if (toLocal) {
    fromStore = sessionStorage;
    toStore = localStorage;
  } else {
    fromStore = localStorage;
    toStore = sessionStorage;
  }
  const conversations = conversationsFromStore(fromStore);
  if (conversations) {
    toStore.setItem("conversations", JSON.stringify(conversations));
    fromStore.removeItem("conversations");
  }
  const userVoicePreferences = preferencesFromStore(fromStore);
  if (userVoicePreferences) {
    toStore.setItem("voice_preferences", JSON.stringify(userVoicePreferences));
    fromStore.removeItem("voice_preferences");
  }
  if (toLocal) {
    localStorage.setItem("store_type", "localStorage");
  } else {
    localStorage.setItem("store_type", "sessionStorage");
  }
}

export const deleteConversation = (messageId) => {
  const conversations = loadConversations();
  if (conversations.length > 0) {
    const filteredConversations = conversations.filter(
      (conv) => !(conv.messageId === messageId)
    );
    const storage = getStorage();
    storage.setItem("conversations", JSON.stringify(filteredConversations));
  }
};
