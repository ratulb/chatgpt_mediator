import { loadConversations } from "./common";
import UserPrompt from "./UserPrompt";
import FinalRender from "./bot/FinalRender";

const SavedConversations = ({ prompts, setTextAreaContent }) => {
  const savedConversations = loadConversations();
  if (savedConversations?.length === 0) {
    return <></>;
  }
  //console.log("Saved: ", savedConversations);
  //console.log("prompts: ", prompts);
  const conversations = savedConversations.filter(
    (conv1) => !prompts.some((conv2) => conv2.messageId === conv1.messageId)
  );
  //console.log("conversations: ", conversations);

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
