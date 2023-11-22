import React, {useState} from 'react';
import './css/bootstrap.min.css'; 
import './css/slicknav.min.css';
import './css/magnific-popup.css';
import './css/animate.css';
import './css/style.css'; 


const Header = () => {



  return (
	<header className="header-section">
    <div className="header-warp">
       
        <div className="header-bar-warp d-flex">
            <a href="/home" className="site-logo" style={{ marginRight: '20px' }}>
                GamerHub
            </a>
            <nav className="top-nav-area w-100">
                <div className="user-panel">
                    <a href="/profile/user/:user">UserName</a>
                    <a href="/profile/user/:user">   Picture</a>
                </div>
                <ul className="main-menu primary-menu">
                    <li><a href="/home">Home</a></li>
                    <li><a href="/forum">Forum</a></li>
                    <li><a href="/submit">Submit</a></li>
                
                </ul>
            </nav>
        </div>
    </div>
</header>
  );
};

export default Header;