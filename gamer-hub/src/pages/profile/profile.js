import React from 'react';
import './profile.css';

const Profile = () => {
    const heroStyle = {
        backgroundImage: 'url("https://i.redd.it/vo9vm1fcqrp71.jpg")', 
      };
    return(
      <div className= "background-1">
      <section className="page-top-section set-bg" style={heroStyle}>
        <div className="page-info">
          <h2>Profile</h2>
          <div className="site-breadcrumb">
            <a href="/home">Home</a> /
            <span>Game</span>
          </div>
        </div>
      </section>

      <div className="profile-container">
      <div className="left-sidebar">
        
        <img className= "user-img"
          src="user-profile-image.jpg" 
          alt="User Profile"
        />
        
        <ul className="profile-links">
          <li><a href="/page1">Profile</a></li>
          <li><a href="/page2">Saved Games</a></li>
          <li><a href="/page3">Reviewed Games</a></li>
        </ul>
      </div>
      <div className="right-content">
       
        <h2>Welcome to your profile</h2>
        <p>This is your profile content. You can add more information and components here.</p>
      </div>
    </div>

      
   
    </div>
    );
};


export default Profile;