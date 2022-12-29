import React, { useState } from "react";
import userImage from "../assets/UserImage.png";
import botImage from "../assets/BotImage.webp";

const Profile = ({ userProfile }) => {
  return (
    <div className="profile">
      <img
        src={userProfile ? userImage : botImage}
        alt={userProfile ? "user" : "bot"}
      />
    </div>
  );
};
export default Profile;
