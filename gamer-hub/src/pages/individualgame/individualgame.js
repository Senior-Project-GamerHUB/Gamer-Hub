import React, { useEffect, useState} from 'react';
import "./individualgame.css";
import ReactApexChart from 'react-apexcharts';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const IndividualGame = () => {
  
  const heroStyle = {
    backgroundImage: 'url("https://i.redd.it/vo9vm1fcqrp71.jpg")', // Replace this URL with the actual image URL
  };

  const [gameData, setGameData] = useState(null);
  const { appid } = useParams(); // Get the appid from the URL

  const chartOptions = {
    series: [{
      name: 'Marine Sprite',
      data: [44, 55, 41, 37, 22, 43, 21]
    }, {
      name: 'Striking Calf',
      data: [53, 32, 33, 52, 13, 43, 32]
    }, {
      name: 'Tank Picture',
      data: [12, 17, 11, 9, 15, 11, 20]
    }, {
      name: 'Bucket Slope',
      data: [9, 7, 5, 8, 6, 9, 4]
    }, {
      name: 'Reborn Kid',
      data: [25, 12, 19, 32, 25, 24, 10]
    }],
    chart: {
      type: 'bar',
      height: 350,
      stacked: true,
    },

  };


  useEffect(() => {
    axios.get(`http://localhost:8080/game/${appid}`)
      .then((response) => {
        setGameData(response.data);

  
      })
      .catch((error) => {
        console.error('Error fetching game data: ', error);
      });
  }, [appid]);

  return (
    <div>
      <section className="page-top-section set-bg" style={heroStyle}>
        <div className="page-info">
          <h2>Game</h2>
          <div className="site-breadcrumb">
            <a href="/">Home</a> /
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
          <div className="summary">
            {gameData ? (
              <p> {gameData.detailed_description.replace(/<[^>]+>/g, '')}</p>  
            ) : (
              <p>Loading...</p>
            )}

          </div>
          <h1>User Statistics</h1>
          <h3>Difficulty</h3>
          <ReactApexChart options={chartOptions} series={chartOptions.series} type="bar" height={400} width={500} />
      

    
        </div>
      </div>
    </div>
  );
};

export default IndividualGame;