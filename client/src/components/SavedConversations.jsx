import { loadConversations } from "./common";
import UserPrompt from "./UserPrompt";
import FinalRender from "./bot/FinalRender";
import { useState, useEffect } from "react";

const SavedConversations = ({ prompts, setTextAreaContent }) => {
  const [savedConversations, _] = useState(loadConversations());
  const [conversations, setCoversations] = useState([]);

  useEffect(() => {
    setCoversations(savedConversations.filter(
      (conv1) => !prompts.some((conv2) => conv2.messageId === conv1.messageId)
    ));
  }, []);


  //console.log("SavedConversations loadConversations: ", savedConversations);
  //console.log("SavedConversations prompts: ", prompts);
  //console.log("SavedConversations filtered conversations: ", conversations);

  return (
    <>
      {conversations.map((conversation, index) => (
        <div key={index}>
          {conversation?.user ? (
            <UserPrompt
              messageId={conversation.messageId}
              prompt={conversation.prompt}
              setTextAreaContent={setTextAreaContent}
              type={conversation.type}
            />
          ) : (
            <FinalRender
              messageId={conversation.messageId}
              prompt={conversation.prompt}
              type={conversation.type}
            />
          )}
        </div>
      ))}
    </>
  );
};

export default SavedConversations;
