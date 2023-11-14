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
       
      const handlePlaytimeHoursChange = (e) => {
        setPlaytimeHours(e.target.value);
      }
    
      const handlePlaytimeMinutesChange = (e) => {
        setPlaytimeMinutes(e.target.value);
      }
    
      const handlePlaytimeSecondsChange = (e) => {
        setPlaytimeSeconds(e.target.value);
      }
     
      const handleCompletionStatusChange = (value) => {
        setCompletionStatus(value);
      }
    
      const handleDifficultyChange = (value) => {
        setDifficulty(value);
      }
    
      const handleRatingChange = (value) => {
        setRating(value);
      }
    
      const handleWorthPriceChange = (value) => {
        setWorthPrice(value);
      }
    
      const handleSubmit = (e) => {
        e.preventDefault();
        const playtime = `${playtimeHours} hours ${playtimeMinutes} minutes ${playtimeSeconds} seconds`;
      }
 
    
      return (
        <div>
          <section className="page-top-section set-bg" style={heroStyle}>
            <div className="page-info">
              <h2>Submit Review</h2>
              <div className="site-breadcrumb">
                <a href="/">Home</a> /
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
                <img src={gameData.background_image} alt={gameData.name} />
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
                          <a href={store.url} target="_blank" rel="noopener noreferrer">
                            {store.store.name}
                          </a>
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
                <input className = "input1"
                  type="number"
                  id="playtimeHours"
                  name="playtimeHours"
                  value={playtimeHours}
                  onChange={handlePlaytimeHoursChange}
                  placeholder="Hours"
                />
                <input className = "input1"
                  type="number"
                  id="playtimeMinutes"
                  name="playtimeMinutes"
                  value={playtimeMinutes}
                  onChange={handlePlaytimeMinutesChange}
                  placeholder="Minutes"
                />
                <input className = "input1"
                  type="number"
                  id="playtimeSeconds"
                  name="playtimeSeconds"
                  value={playtimeSeconds}
                  onChange={handlePlaytimeSecondsChange}
                  placeholder="Seconds"
                />
              </div>
              
              <div className="question">
                <label>Completion Status:</label>
                {[1, 2, 3, 4, 5].map((value) => (
                  <input className = "input1"
                    type="radio"
                    key={value}
                    value={value}
                    checked={completionStatus === value}
                    onChange={() => handleCompletionStatusChange(value)}
                  />
                ))}
              </div>
              <div className="question">
                <label>Difficulty:</label>
                {["Simple", "Easy Peasy", "Average", "Challenging", "Got a Big Kick"].map((value) => (
                  <input className = "input1 dynamic-button"
                    type="button"
                    key={value}
                    value={value}
                    checked={difficulty === value}
                    onChange={() => handleDifficultyChange(value)}
                  />
                ))}
              </div>
              <div className="question">
                <label>Rating:</label>
                {[1, 2, 3, 4, 5].map((value) => (
                  <input className = "input1"
                    type="radio"
                    key={value}
                    value={value}
                    checked={rating === value}
                    onChange={() => handleRatingChange(value)}
                  />
                ))}
              </div>
              <div className="question">
                <label>Worth Price:</label>
                {[1, 2, 3, 4, 5].map((value) => (
                  <input className = "input1"
                    type="radio"
                    key={value}
                    value={value}
                    checked={worthPrice === value}
                    onChange={() => handleWorthPriceChange(value)}
                  />
                ))}
              </div>
              <button className="submit">Submit Review</button>
            </form> 
                 
            </div>
               
    
        
            </div>
          </div>
        </div>
      );
};


export default Submit2;