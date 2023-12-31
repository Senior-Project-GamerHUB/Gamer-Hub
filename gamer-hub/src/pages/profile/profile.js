import React, { useEffect, useState } from 'react';
import './profile.css';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';


const Profile = () => {

  const { userName, userID } = useParams();
  const [user_name, setUser_Name] = useState([]);
  const [userLog, setUserLog] = useState([]);
  const [Email, setEmail] = useState([]);
  const [userid, setUserID] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [profilePicture, setProfilePicture] = useState(null);
  const [defaultProfilePicture, setDefaultProfilePicture] = useState('https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/2048px-Default_pfp.svg.png');
  const [userReviews, setUserReviews] = useState([]);
  const [savedGames, setSavedGames] = useState([]);
  

  const handleDeleteSavedGame = (gameID) => {
    axios.delete(`http://localhost:8080/deleteSavedGame/${userID}/${gameID}`, { withCredentials: true })
      .then((res) => {
        // Check if the server response indicates success
        if (res.status === 200) {
          // Update the state to reflect the changes (remove the deleted game)
          setSavedGames((prevSavedGames) => prevSavedGames.filter((game) => game.gameID !== gameID));
          console.log('Saved game deleted successfully');
        } else {
          console.error('Unexpected response:', res);
        }
      })
      .catch((error) => {
        console.error('Error deleting saved game:', error);
      });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
 
        const userReviewsResponse = await axios.get(`http://localhost:8080/getReviewsByUser?userID=${userID}`, {
          withCredentials: true,
        });
  
        const reviews = userReviewsResponse.data;
  
   
        const reviewGameIDs = reviews.map((review) => review.gameID);
  
     
        const reviewGameDetailsPromises = reviewGameIDs.map(async (gameID) => {
          const gameResponse = await axios.get(`https://api.rawg.io/api/games/${gameID}`, {
            params: {
              key: 'fecf056691bd489dac7a439f05843915',
            },
          });
  
          return gameResponse.data;
        });
  
       
        const reviewGameDetails = await Promise.all(reviewGameDetailsPromises);
  
   
        const userReviewsWithDetails = reviews.map((review, index) => ({
          ...review,
          gameDetails: reviewGameDetails[index],
        }));
  
       
        setUserReviews(userReviewsWithDetails);
  
      
        const savedGamesResponse = await axios.get(`http://localhost:8080/getSavedGames/${userID}`, {
          withCredentials: true,
        });
  
        const savedGames = savedGamesResponse.data;
  
        
        const savedGameIDs = savedGames.map((savedGame) => savedGame.gameID);
  
       
        const savedGameDetailsPromises = savedGameIDs.map(async (gameID) => {
          const gameResponse = await axios.get(`https://api.rawg.io/api/games/${gameID}`, {
            params: {
              key: 'fecf056691bd489dac7a439f05843915',
            },
          });
  
          return gameResponse.data;
        });
  
        const savedGameDetails = await Promise.all(savedGameDetailsPromises);
  
      
        const savedGamesWithDetails = savedGames.map((savedGame, index) => ({
          ...savedGame,
          gameDetails: savedGameDetails[index],
        }));
  
        
        setSavedGames(savedGamesWithDetails);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, [userID]);



  const navigate = useNavigate();

  const heroStyle = {
    backgroundImage: 'url("https://i.redd.it/vo9vm1fcqrp71.jpg")',
  };

 
  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePicture(URL.createObjectURL(file));
      setSelectedFile(file);
    }
  };

  const handleProfilePictureUpdate = async () => {
    const formData = new FormData();
    formData.append('profilePicture', selectedFile);

    try {
    
      await axios.post('http://localhost:8080/updateProfilePicture', formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

    
      setProfilePicture(URL.createObjectURL(selectedFile));
    } catch (error) {
      console.error('Error updating profile picture:', error);
    }
  };

  const handleSteamLogin = () => {
    // Redirect the user to the Steam authentication page
    window.location.href = 'http://localhost:8080/api/auth/steam';

  };
 

  const handleSubmit = (event) =>{
    event.preventDefault();

    axios.get('http://localhost:8080/loggout', { withCredentials: true })
      .then(res => {
        console.log(res.data);
      })
      .catch(err => console.log(err));

    navigate('/');
  };

  useEffect(() => {
    axios.get(`http://localhost:8080/loggedIn?userName=${userName}&userID=${userID}`, { withCredentials: true })
      .then(res => {
        setUserLog(res.data[0].username);
        setUser_Name(res.data[0].name);
        setEmail(res.data[0].email);
        setUserID(res.data[0].user_id);

        const arrayBuffer = new Uint8Array(res.data[0].picture.data);
        const base64String = btoa(String.fromCharCode.apply(null, arrayBuffer));
        setProfilePicture(base64String);
      })
      .catch(err => console.log(err));
  }, [userName, userID]);

  console.log(profilePicture);

  
  const handleUpdateProfilePicture = (event) => {
    event.preventDefault();
  
    if (selectedFile) {
      const formData = new FormData();
      formData.append('profilePicture', selectedFile);
  
      axios.post(`http://localhost:8080/updateProfilePicture/${userid}`, formData, { withCredentials: true })
        .then(res => {
        
          const newProfilePicture = res.data?.picture || res.data?.pathToPicture;
  
          console.log('Profile picture updated successfully');
          setProfilePicture(newProfilePicture);
          setSelectedFile(null); 
  
          
          window.location.reload();
        })
        .catch(err => {
          console.error('Error updating profile picture:', err);
        });
    }
  };

               
  return (
    <div className="profile-background">
    <section className="page-top-section set-bg" style={heroStyle}>
      <div className="page-info">
        <h2 style={{ color: 'white' }}>Profile</h2>
        <div className="site-breadcrumb">
          <Link to="/home" style={{ color: 'white' }}>Home</Link> /
          <span style={{ color: 'white' }}>Profile</span>
        </div>
      </div>
    </section>

    <section>
      <div className="container py-5">
        <div className="row">
          <div className="col-lg-4">
            <div className="card mb-4" style={{ backgroundColor: 'rgb(48, 46, 52)' }}>
              <div className="card-body text-center">
              <label htmlFor="profilePictureInput" className="profile-picture">
              <img
                src={
                  selectedFile
                    ? URL.createObjectURL(selectedFile)
                    : profilePicture
                      ? `data:image/png;base64,${profilePicture}`
                      : defaultProfilePicture
                }
                className="rounded-circle img-fluid"
                style={{
                  width: '150px',
                  height: '150px',
                  objectFit: 'cover',
                  cursor: 'pointer',
                }}
                onError={(e) => console.error('Error loading profile picture:', e)}
              />
              </label>
              <input
                id="profilePictureInput"
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={(e) => setSelectedFile(e.target.files[0])}
              />
              <h5 className="my-3" style={{ color: 'white' }}>{userLog}</h5>
              
              <button
                type="button"
                className="btn btn-success mt-3" 
                onClick={handleUpdateProfilePicture}
              >  
                Update Profile Picture
              </button>
              </div>
            </div>

            <div className="d-flex justify-content-center mb-2">
              <button type="button" className="btnlogout btn-danger" onClick={handleSubmit} style={{ color: 'white' }}>
                Log Out
              </button>
            </div>
          </div>

          <div className="col-lg-8">
            <div className="card mb-4" style={{ backgroundColor: 'rgb(48, 46, 52)' }}>
              <div className="card-body" style={{ backgroundColor: 'rgb(48, 46, 52)', color: 'white' }}>
                <div className="row border-bottom mb-2" style={{ padding: '8px 0' }}>
                  <div className="col-sm-9">
                    <p  style={{ color: 'white' }}>Full Name: {user_name}</p>
                  </div>
                </div>
                <div className="row border-bottom mb-2" style={{ padding: '8px 0' }}>
                  <div className="col-sm-9">
                    <p style={{ color: 'white' }}>Username: {userLog}</p>
                  </div>
                </div>
                <div className="row " style={{ padding: '8px 0' }}>
                  <div className="col-sm-9">
                    <p style={{ color: 'white' }}> Email: {Email}</p>
                  </div>
                </div>
                <button className="btn btn-outline-light btn-lg px-5" type="button" onClick={handleSteamLogin}>
                            Link with Steam
                  </button>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <div className="card mb-4 mb-md-0" style={{ backgroundColor: 'rgb(48, 46, 52)' }}>
                  <h5 style={{ display: 'inline', color: 'white' }}>Saved Games</h5>
                  <div className="card-body">
                  {savedGames.length > 0 ? (
                            <ul>
                              {savedGames.map((savedGame) => (
                                <li key={savedGame.gameID}>
                                  <p>{savedGame.gameDetails.name}</p>
                                  <a
                                    href={`/game/${savedGame.gameID}`} 
                                    style={{ textDecoration: 'none', color: 'inherit' }}
                                  >
                                    <img
                                      className='profileGameImg'
                                      src={savedGame.gameDetails.background_image}
                                      alt={`Game: ${savedGame.gameDetails.name}`}
                                      style={{ maxWidth: '150px', maxHeight: '150px' }}
                                    />
                                  </a>
                                  <button className='deleteButton' onClick={() => handleDeleteSavedGame(savedGame.gameID)}>
                                    <FontAwesomeIcon icon={faTimes} />
                                  </button>
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <p>You have no saved games.</p>
                          )}
                  </div>
                </div>
              </div>


              <div className="col-md-6">
                <div className="card mb-4 mb-md-0" style={{ backgroundColor: 'rgb(48, 46, 52)' }}>
                  <h5 style={{ display: 'inline', color: 'white' }}>Reviewed Games </h5>
                  <div className="card-body">
                  {userReviews.length > 0 ? (
                            <ul>
                              {userReviews.map((review) => (
                                <li key={review.gameID}>
                                  <p>{review.gameDetails.name}</p>
                                  <a
                                    href={`/game/${review.gameID}`} 
                                    style={{ textDecoration: 'none', color: 'inherit' }}
                                  >
                                    <img
                                      className='profileGameImg'
                                      src={review.gameDetails.background_image}
                                      alt={`Game: ${review.gameDetails.name}`}
                                      style={{ maxWidth: '150px', maxHeight: '150px' }}
                                    />
                                  </a>
                                 
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <p>You have not reviewed any games.</p>
                          )}
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