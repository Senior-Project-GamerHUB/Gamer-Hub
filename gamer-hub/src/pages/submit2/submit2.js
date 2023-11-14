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
        axios.get(`https://gamerhub-s7o6.onrender.com/game/${appid}`)
          .then((response) => {
            setGameData(response.data);
    
      
          })
          .catch((error) => {
            console.error('Error fetching game data: ', error);
          });
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
                    <img src={gameData.imageURL} alt={gameData.name} />
                  </div>
                  <div className="game-info-container">
                    <p>Developer: {gameData.developer}</p>
                    <p>Publisher: {gameData.publisher}</p>
                    <p>Release Date: {gameData.releaseDate}</p>
                    <p>Genre: {gameData.genre}</p>
                    <p>Metacritic Score: {gameData.rating}</p>
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
                {[1, 2, 3, 4, 5].map((value) => (
                  <input className = "input1"
                    type="radio"
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