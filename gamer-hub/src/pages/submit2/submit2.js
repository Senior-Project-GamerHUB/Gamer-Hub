import React, { useEffect, useState} from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './submit2.css'
import { useNavigate } from 'react-router-dom';


const Submit2 = () => {
    const heroStyle = {
        backgroundImage: 'url("https://i.redd.it/vo9vm1fcqrp71.jpg")', 
      };
    
      const [gameData, setGameData] = useState(null);
      const { appid } = useParams();
      const [username, setUserLog] = useState([]);
      const [profilePicture, setProfilePicture] = useState(null);
    
    
    
      useEffect(() => {
        const fetchGameDetails = async () => {
          try {
            const response = await axios.get(`https://api.rawg.io/api/games/${appid}`, {
              params: {
                key: 'fecf056691bd489dac7a439f05843915', 
              },
            });
    
            setGameData(response.data);
          } catch (error) {
            console.error('Error fetching game data: ', error);
          }
        };
    
        fetchGameDetails();
      }, [appid]);
    
      const [playtimeHours, setPlaytimeHours] = useState('');
      const [playtimeMinutes, setPlaytimeMinutes] = useState('');
      const [playtimeSeconds, setPlaytimeSeconds] = useState('');
      const [completionStatus, setCompletionStatus] = useState(''); 
      const [difficulty, setDifficulty] = useState(''); 
      const [rating, setRating] = useState(0);
      const [worthPrice, setWorthPrice] = useState('');
      const [reviewText, setReviewText] = useState('');

      
      const [selectedRating, setSelectedRating] = useState('');
      const [selectedCompletionStatus, setSelectedCompletionStatus] = useState('');
      const [selectedDifficulty, setSelectedDifficulty] = useState('');
      const [selectedWorthPrice, setSelectedWorthPrice] = useState('');
  

       
      const handlePlaytimeHoursChange = (e) => {
        setPlaytimeHours(e.target.value);
      }
    
      const handlePlaytimeMinutesChange = (e) => {
     
        const minutesValue = Math.min(e.target.value, 60);
        setPlaytimeMinutes(minutesValue);
      };
    
      const handlePlaytimeSecondsChange = (e) => {
      
        const secondsValue = Math.min(e.target.value, 60);
        setPlaytimeSeconds(secondsValue);
      };

      const handleRatingChange = (value) => {
       
        const numericValue = parseInt(value, 10);
        setRating(numericValue);
        setSelectedRating(value);
      };
      

      const handleCompletionStatusChange = (value) => {
        setCompletionStatus(value);
        setSelectedCompletionStatus(value);
      }
      
      const handleDifficultyChange = (value) => {
        setDifficulty(value);
        setSelectedDifficulty(value);
      }
      
      const handleWorthPriceChange = (value) => {
        setWorthPrice(value);
        setSelectedWorthPrice(value);
      }


      const handleReviewTextChange = (e) => {
        setReviewText(e.target.value);
      };
      
    
      const [userid, setUserID] = useState([]);
      const navigate = useNavigate();

      useEffect(() => {
        const fetchUserData = async () => {
          try {
            const response = await axios.get('https://gamerhub-s7o6.onrender.com/loggedIn', { withCredentials: true });
            setUserID(response.data[0].user_id);
            setUserLog(response.data[0].username);
            setProfilePicture(response.data[0].picture);
            
          } catch (error) {
            console.error('Error fetching user data: ', error);
          }
        };
    
        fetchUserData();
      }, []);


  const handleSubmit = async () => {
    const playtime = `${playtimeHours} hours ${playtimeMinutes} minutes ${playtimeSeconds}`;

    try {
     
      const response = await axios.post('https://gamerhub-s7o6.onrender.com/addReview', {
        user: userid,
        username: username,
        game: appid,
        title: gameData.name,
        text: reviewText,
        playtime_hour: playtimeHours,
        playtime_minutes: playtimeMinutes,
        playtime_seconds: playtimeSeconds,
        review: rating,
        completion_status: completionStatus,
        difficulty: difficulty,
        worth_the_price: worthPrice,
      });

      console.log('Review submitted successfully:', response.data);
    } catch (error) {
      console.error('Error submitting review: ', error);
    }
  };

  const areAllFieldsFilled = () => {
    return (
      playtimeHours !== '' &&
      playtimeMinutes !== '' &&
      playtimeSeconds !== '' &&
      rating !== 0 &&
      completionStatus !== 0 &&
      difficulty !== 0 &&
      worthPrice !== 0
    );
  };

  const handleButtonClick = async (e) => {
    e.preventDefault(); 

    if (!areAllFieldsFilled() || reviewText.trim() === '') {
      alert('Please fill in all fields.');
      return;
    }
  
   
    await handleSubmit();



  
    alert('Thank you for your review!');
   
    navigate('/home');
  };

      return (
        <div>
          <section className="page-top-section set-bg" style={heroStyle}>
            <div className="page-info">
              <h2>Submit Review</h2>
              <div className="site-breadcrumb">
                <a href="/home">Home</a> /
                <a href="/submit">Submit</a> /
                <span>Game</span>
              </div>
            </div>
          </section>
    
          <div className="page-container">
          <div className="game-container">
          {gameData ? (
            <div>
              <h1>{gameData.name}</h1>
              <div className="game-image">
              <a href={`/game/${gameData.id}`}>
              <div className="game-image">
                <img src={gameData.background_image} alt={gameData.name} />
              </div>
            </a>
              </div>
              <div className="game-info-container">
                <p>Developer: {gameData.developers && gameData.developers.map((dev) => dev.name).join(', ')}</p>
                <p>Publisher: {gameData.publishers && gameData.publishers.map((pub) => pub.name).join(', ')}</p>
                <p>Release Date: {gameData.released}</p>
                <p>Genre: {gameData.genres && gameData.genres.map((genre) => genre.name).join(', ')}</p>
                <p>Platforms: {gameData.platforms && gameData.platforms.map((platform) => platform.platform.name).join(', ')}</p>
                {gameData.stores && gameData.stores.length > 0 && (
                  <div>
                    <h5>Available at:</h5>
                    {gameData.stores.map((store) => (
                      <li key={store.store.id}>
                          {store.store.name}
                    
                      </li>
                    ))}
                
                  </div>
                )}
              </div>
            </div>
          ) : (
            <p>Loading...</p>
          )}
        
        </div>
    
          <div className="right-content">
          <div className="survey">

            <form onSubmit={handleSubmit}>
            <div className="question">
              <label htmlFor="playtimeHours">Playtime:</label>
              <input
                className="input1"
                type="number"
                id="playtimeHours"
                name="playtimeHours"
                value={playtimeHours}
                onChange={handlePlaytimeHoursChange}
                placeholder="hr"
                min="0"
                pattern="\d+" 
                style={{ width: '80px' }}
              />
              <input
                className="input1"
                type="number"
                id="playtimeMinutes"
                name="playtimeMinutes"
                value={playtimeMinutes}
                onChange={handlePlaytimeMinutesChange}
                placeholder="min"
                min="0"
                pattern="\d+"
                style={{ width: '80px' }}
              />
              <input
                className="input1"
                type="number"
                id="playtimeSeconds"
                name="playtimeSeconds"
                value={playtimeSeconds}
                onChange={handlePlaytimeSecondsChange}
                placeholder="sec"
                min="0"
                pattern="\d+"
                style={{ width: '80px' }}
              />
            </div>

            <div className="question">
              <label>Rating:</label>
              <div className="star-container">
                {[1, 2, 3, 4, 5].map((value, index) => (
                  <label key={value} className={`star ${value <= rating ? 'filled' : ''}`} onClick={() => handleRatingChange(value)}>
                    ★
                  </label>
                ))}
              </div>
             </div>
              
              

              <div className="question">
                <label>Completion Status:</label>
                <div className="button-container">
                  {["Tried It", "Hooked", "Halfway", "Finished Most", "Conquered It"].map((value, index) => (
                    <label key={value} className={`dynamic-button button-${index} ${selectedCompletionStatus === value ? 'selected' : ''}`}>
                      <input
                        type="radio"
                        name="completionStatus"
                        value={value}
                        checked={selectedCompletionStatus === value}
                        onChange={() => handleCompletionStatusChange(value)}
                        style={{ display: 'none' }}
                      />
                      {value}
                    </label>
                  ))}
                </div>
              </div>

              <div className="question">
                <label>Difficulty:</label>
                <div className="button-container">
                  {["Easy Peasy", "Simple", "Moderate", "Challenging", "Relentless"].map((value, index) => (
                    <label key={value} className={`dynamic-button button-${index} ${difficulty === value ? 'selected' : ''}`}>
                      <input
                        type="radio"
                        name="difficulty"
                        value={value}
                        checked={difficulty === value}
                        onChange={() => handleDifficultyChange(value)}
                        style={{ display: 'none' }}
                      />
                      {value}
                    </label>
                  ))}
                </div>
              </div>

              <div className="question">
              <label>Worth The Price?:</label>
              <div className="button-container">
                {["Pass", "Wait For Sale", "Reasonable", "Great Deal", "Worth Every Penny"].map((value, index) => (
                  <label key={value} className={`dynamic-button button-${index} ${worthPrice === value ? 'selected' : ''}`}>
                    <input
                      type="radio"
                      name="worthPrice"
                      value={value}
                      checked={worthPrice === value}
                      onChange={() => handleWorthPriceChange(value)}
                      style={{ display: 'none' }}
                    />
                    {value}
                  </label>
                ))}
                </div>
              </div>

              <div className="question">
              <label htmlFor="reviewText">Review:</label>
                <textarea
                  id="reviewText"
                  name="reviewText"
                  value={reviewText}
                  onChange={handleReviewTextChange}
                  placeholder="Write your review here..."
                />
            
              </div>

              <button
                  className="submit"
                  type="button" 
                  onClick={handleButtonClick}
                >
              Submit Review
            </button>
            </form> 
           
               
            </div>
           
    
        
            </div>
          </div>
        </div>
      );
};


export default Submit2;