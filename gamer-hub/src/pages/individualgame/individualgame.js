import React, { useEffect, useState } from 'react';
import "./individualgame.css";
import PieApexChart from "./PieApexchart"
import StackApexChart from "./StackApexchart"
import DonutApexChart from "./DonutApexChart"
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
    if (!savedGames.find((savedGame) => savedGame.id === gameData.id)) {
      const newSavedGames = [...savedGames, gameData];
      setSavedGames(newSavedGames);

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
                <p>Release Date: {gameData.released || 'TBD'}</p>
                <p>Genre: {gameData.genres && gameData.genres.map((genre) => genre.name).join(', ')}</p>
                <p>Platforms: {gameData.platforms && gameData.platforms.map((platform) => platform.platform.name).join(', ')}</p>
                <p>GamerHub Rating: {'Not Yet Rated'}</p>
                {gameData.stores && gameData.stores.length > 0 && (
                  <div>
                    <h5>Available at:</h5>
                    <ul>
                      {gameData.stores.map((store) => {
                        console.log('Store URL:', store.url);
                        return (
                          <li key={store.store.id}>
                            <a href={store.url} rel="noopener noreferrer" target="_blank">
                              {store.store.name}
                            </a>
                          </li>
                        );
                      })}
                    </ul>
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
              {gameData && (
                  <Link to={`/forum/game/${gameData.id}`}>
                    <button className="btnForum">Forum</button>
                  </Link>
                )}  
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

          <div className='completion'>
            <p>Average Completion Time: </p>
          </div>
          
          <div className='charts'>
            <h2>Completion</h2>
            <PieApexChart />
          </div>
          <div className='charts'>
            <h2>Difficulty</h2>
            <StackApexChart />
          </div>
          <div className='charts'>
            <h2>Worth the Price</h2>
            <DonutApexChart />
          </div>
          

        </div>
      </div>
    </div>
  );
};

export default IndividualGame;