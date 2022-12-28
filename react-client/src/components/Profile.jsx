import React, {useState} from 'react';
import userImage from '../assets/userImage.jpg';
import botImage from '../assets/botImage.webp';

const Profile = ({userProfile}) => {
  return (
    <div className='profile'>
        <img src={userProfile? userImage: botImage} alt={userProfile? 'user': 'bot'} />
    </div>
  )
}

export default Profile;