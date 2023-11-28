import React, { useEffect, useState } from 'react';
import './profile.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [profilePicture, setProfilePicture] = useState(null);
  const [user_name, setUser_Name] = useState([]);
  const [userLog, setUserLog] = useState([]);
  const [userid, setUserID] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    // Fetch user data from your database or API
    // Replace the following line with your actual fetchUserData function
    // const userId = /* Get the user ID, you may get it from authentication */;
    // fetchUserData(userId)
    //   .then((data) => setUserData(data))
    //   .catch((error) => console.error('Error fetching user data:', error));

    // Example mock data - replace this with your actual data fetching logic
    const mockUserData = {
      fullName: 'John Doe',
      avatar: 'https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp',
      // Add other user data fields as needed
    };

    // Simulate asynchronous data fetching
    const fetchData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setUserData(mockUserData);
    };

    fetchData();
  }, []); // The empty dependency array ensures the effect runs only once when the component mounts

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const heroStyle = {
    backgroundImage: 'url("https://i.redd.it/vo9vm1fcqrp71.jpg")',
  };

  if (!userData) {
    // Display a loading spinner or message while data is being fetched
    return <div>Loading...</div>;
  }


  const handleSubmit = (event) =>{
    event.preventDefault();

    console.log("CLICKED LOGOUT");

        axios.get('http://localhost:8080/loggout',  {withCredentials: true})
        .then(res => {

            console.log(res.data);
        
            
   
        })
        .catch(err => console.log(err));

        navigate('/');

      }


   axios.get('http://localhost:8080/loggedIn', {withCredentials: true})
                .then(res => {
                    console.log(res.data[0].username);
                    setUserLog(res.data[0].username);
                    setUser_Name(res.data[0].name);
                    setUserID(res.data[0].user_id);
    
                })
                .catch(err => console.log(err));
  




  return (
    <div className="profile-background">
      <section className="page-top-section set-bg" style={heroStyle}>
        <div className="page-info">
          <h2>Profile</h2>
          <div className="site-breadcrumb">
            <Link to="/home">Home</Link> /
            <span>Profile</span>
          </div>
        </div>
      </section>

      <section>
        <div className="container py-5">
          <div className="row">
            <div className="col-lg-4">
              <div className="card mb-4">
                <div className="card-body text-center">
                  <label htmlFor="profilePictureInput" className="profile-picture-label">
                    <img
                      src={profilePicture || userData?.avatar || 'https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp'}
                      alt="avatar"
                      className="rounded-circle img-fluid"
                      style={{ width: '150px', cursor: 'pointer' }}
                    />
                  </label>
                  <input
                    id="profilePictureInput"
                    type="file"
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={handleProfilePictureChange}
                  />
                  <h5 className="my-3">{userLog}</h5>
                </div>
              </div>
             
              <div className="d-flex justify-content-center mb-2">
                  <button type="button" className="btnlogout btn-danger" onClick= {handleSubmit}>
                    Log Out
                  </button>
              </div>
             
            </div>
            <div className="col-lg-8">
              <div className="card mb-4">
                <div className="card-body">
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Full Name</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">{user_name}</p>
                    </div>
                  </div>
                  {/* ... Other rows and content */}
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="card mb-4 mb-md-0">
                    <div className="card-body">
                      {/* ... Card content with inline styles */}
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="card mb-4 mb-md-0">
                    <div className="card-body">
                      {/* ... Card content with inline styles */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Profile;