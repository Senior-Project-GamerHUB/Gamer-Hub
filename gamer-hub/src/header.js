import React, {useEffect,useState} from 'react';
import './css/bootstrap.min.css'; 
import './css/slicknav.min.css';
import './css/magnific-popup.css';
import './css/animate.css';
import './css/style.css'; 
import axios from 'axios';



const test = "test this ";

const Header = () => {

    const [user, setUser] = useState([]);


    axios.get('http://localhost:8080/loggedIn', {withCredentials: true})
              .then(res => {
                  console.log(res.data[0].username);
                  setUser(res.data[0].username);
  
              })
              .catch(err => console.log(err));

    



  return (
	<header className="header-section">
    <div className="header-warp">
       
        <div className="header-bar-warp d-flex">
            <a href="/home" className="site-logo" style={{ marginRight: '20px' }}>
                GamerHub
            </a>
            <nav className="top-nav-area w-100">
                <div className="user-panel">
                    <a href="/profile/user/id">
                        {user}
                    </a>
                    <a href="/profile/user/id">   Picture</a>
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