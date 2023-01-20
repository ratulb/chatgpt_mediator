import Profile from "../Profile";
const ProfiledMsgTemplate = ({ wrapper, userProfile, messageId, children }) => {
  return (
    <div className={wrapper}>
      <div className="chat">
        <Profile userProfile={userProfile} />
        <div className="message" id={messageId}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default ProfiledMsgTemplate;
