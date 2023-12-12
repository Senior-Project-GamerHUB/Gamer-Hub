import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './css/bootstrap.min.css';
import './css/slicknav.min.css';
import './css/magnific-popup.css';
import './css/animate.css';
import './css/style.css';
import axios from 'axios';
import logoImage from './fleatkim.png';

const Header = () => {
  const [user, setUser] = useState({});
  const [profilePicture, setProfilePicture] = useState(null);

  useEffect(() => {
    axios.get('https://gamer-hub-server.onrender.com/loggedIn', { withCredentials: true })
      .then(res => {
        setProfilePicture(res.data[0].picture);
        setUser(res.data[0]);
         const arrayBuffer = new Uint8Array(res.data[0].picture);
         const base64String = btoa(String.fromCharCode.apply(null, arrayBuffer));
         setProfilePicture(base64String);
      })
      .catch(err => console.log(err));
  }, []);

  const defaultProfilePicture = 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/2048px-Default_pfp.svg.png';
 
  return (
    <header className="header-section">
      <div className="header-warp">
        <div className="header-bar-warp d-flex">
          <Link to="/home" className="site-logo" style={{ marginRight: '20px' }}>
          <img className = "header-logo"
              src={logoImage}
              alt="GamerHub Logo"
              style={{ width: '80px', height: 'auto', marginTop: '-30px', marginBottom: '10px'}}
            />
          </Link>
          <nav className="top-nav-area w-100">
            <div className="user-panel">
              <img
                src={`data:image/png;base64,${profilePicture}`|| defaultProfilePicture}
                style={{ width: '30px', height: '30px', borderRadius: '50%', marginRight: '5px' }}
                onError={(e) => {
                    e.target.src = defaultProfilePicture; 
                  }}
              />
              <Link to={`/profile/${user.username}/${user.user_id}`}>
                {user.username}
              </Link>
            </div>
            <ul className="main-menu primary-menu">
              <li><Link to="/home">Home</Link></li>
              <li><Link to="/forum">Forum</Link></li>
              <li><Link to="/submit">Submit</Link></li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;