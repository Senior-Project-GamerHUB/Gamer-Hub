import React, { useEffect, useState } from 'react';
import "./individualgame.css";
import ApexChart from "./apexchart"
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const IndividualGame = () => {
  const heroStyle = {
    backgroundImage: 'url("https://i.redd.it/vo9vm1fcqrp71.jpg")',
  };

  const [gameData, setGameData] = useState(null);
  const [savedGames, setSavedGames] = useState([]);
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

  const handleSaveGame = () => {
    // Check if the game is not already saved
    if (!savedGames.find((savedGame) => savedGame.id === gameData.id)) {
      const newSavedGames = [...savedGames, gameData];
      setSavedGames(newSavedGames);

      // Save to local storage (you can replace this with server-side storage)
      localStorage.setItem('savedGames', JSON.stringify(newSavedGames));
    }
  }; 

  return (
    <div>
      <section className="page-top-section set-bg" style={heroStyle}>
        <div className="page-info">
          <h2>Game</h2>
          <div className="site-breadcrumb">
            <a href="/home">Home</a> /
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
                <p>Release Date: {gameData.released || 'U'}</p>
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
          
          <div>
          <div className="button-container">
                {gameData && (
                  <Link to={`/submit/game/${gameData.id}`}>
                    <button className="btn3">Submit Review</button>
                  </Link>
                )}  
                  {gameData && (
                    <button className="btn3" onClick={handleSaveGame}>
                   Save Game
                 </button>
            )}
              </div>
          </div>
        </div>
        
        <div className="right-content">
          <div className="summary">
            {gameData ? (
              <p>{gameData.description_raw}</p>
            ) : (
              <p>Loading...</p>
            )}
             
          </div>
          
          <div>
            <h2>Completion</h2>
            <ApexChart />

            
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndividualGame;