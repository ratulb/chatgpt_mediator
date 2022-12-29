import Profile from "./Profile";

const UserPrompt = ({ messageId, prompt }) => {
  return (
    <div className="wrapper">
      <div className="chat">
        <Profile userProfile={true} />
        <div className="message" id={messageId}>
          {prompt}
        </div>
      </div>
    </div>
  );
};

export default UserPrompt;
