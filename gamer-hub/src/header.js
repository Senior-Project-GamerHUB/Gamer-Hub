import React from 'react';
import './css/bootstrap.min.css'; 
import './css/slicknav.min.css';
import './css/magnific-popup.css';
import './css/animate.css';
import './css/style.css'; 

const Header = () => {

  return (
	<header className="header-section">
    <div className="header-warp">
        <div className="header-social d-flex justify-content-end">
            {/* Add your social media icons or links here if needed */}
        </div>
        <div className="header-bar-warp d-flex">
            <a href="/" className="site-logo" style={{ marginRight: '20px' }}>
                GamerHub
            </a>
            <div className="search-box" style={{ marginLeft: '20px' }}>
                <input type="text" placeholder="Search" />
            </div>
            <nav className="top-nav-area w-100">
                <div className="user-panel">
                    <a href="/login">Login</a> / <a href="/signup">Sign Up</a>
                </div>
                <ul className="main-menu primary-menu">
                    <li><a href="/">Home</a></li>
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