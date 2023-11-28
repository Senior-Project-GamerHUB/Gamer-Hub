import React, { useEffect, useState} from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './submit2.css'


const Submit2 = () => {
    const heroStyle = {
        backgroundImage: 'url("https://i.redd.it/vo9vm1fcqrp71.jpg")', 
      };
    
      const [gameData, setGameData] = useState(null);
      const { appid } = useParams();
    
    
      useEffect(() => {
        const fetchGameDetails = async () => {
          try {
            const response = await axios.get(`https://api.rawg.io/api/games/${appid}`, {
              params: {
                key: '3f02ae9693244e86b768ab662105fd14', 
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
      const [completionStatus, setCompletionStatus] = useState(0); 
      const [difficulty, setDifficulty] = useState(0); 
      const [rating, setRating] = useState(0);
      const [worthPrice, setWorthPrice] = useState(0);

      //When Selected
      // ...
      const [selectedRating, setSelectedRating] = useState('');
      const [selectedCompletionStatus, setSelectedCompletionStatus] = useState('');
      const [selectedDifficulty, setSelectedDifficulty] = useState('');
      const [selectedWorthPrice, setSelectedWorthPrice] = useState('');
      // ...

       
      const handlePlaytimeHoursChange = (e) => {
        setPlaytimeHours(e.target.value);
      }
    
      const handlePlaytimeMinutesChange = (e) => {
        setPlaytimeMinutes(e.target.value);
      }
    
      const handlePlaytimeSecondsChange = (e) => {
        setPlaytimeSeconds(e.target.value);
      }

      const handleRatingChange = (value) => {
        // Convert the star rating to a numerical value (e.g., 1 to 5)
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

      const handleButtonClick = () => {
        if (!areAllFieldsFilled()) {
          alert('Please fill in all required fields.');
          return;
        }
      
        // If all fields are filled, proceed with the submission
        handleSubmit();
      };
      
      const handleSubmit = async () => {
        // Remove the (e) parameter as it's not used
        const playtime = `${playtimeHours} hours ${playtimeMinutes} minutes ${playtimeSeconds}`;
      
        try {
          const response = await axios.post('YOUR_BACKEND_API_ENDPOINT', {
            playtime,
            rating,
            completionStatus,
            difficulty,
            worthPrice,
            // Include any other relevant data
          });
      
          console.log('Review submitted successfully:', response.data);
          // You can show a success message or redirect the user after a successful submission
        } catch (error) {
          console.error('Error submitting review: ', error);
          // Handle error (e.g., show an error message to the user)
        }
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
                    {gameData.stores.map((store) => {
                    console.log("Store URL:", store.url);
                    return (
                      <li key={store.store.id}>
                        <a href={store.url} >
                          {store.store.name}
                        </a>
                      </li>
                    );
                  })}
                
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
                pattern="\d+" // Use a regular expression to allow only positive integers
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