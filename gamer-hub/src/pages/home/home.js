import React, { useEffect, useState } from 'react';
import './home.css';
import GameCard from './gamecard';
import axios from 'axios';




const Home = () => {



  const [gameData, setGameData] = useState(null);
  const appid  = '1817070';
  const heroStyle = {
    backgroundImage: 'url("https://i.redd.it/vo9vm1fcqrp71.jpg")', 
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
    <section className="hero-section overflow-hidden">
    <div className="hero-slider owl-carousel">
      <div className="hero-item set-bg d-flex align-items-center justify-content-center text-center" style={heroStyle}>
        <div className="container1">
          <h1>Game on!</h1>
          <a href="#background" className="btn1">
            Read More
          </a>
        </div>
      </div>
    </div>
   </section>
   
   
<section class="intro-section">
<div class="container">
  <div class="row">
    

  <div className="background">
  <div
    id="carouselMultiItemExample"
    className="carousel slide carousel-dark text-center"
    data-mdb-ride="carousel"
  >
    
    <div className="carousel-inner py-5">
      <div className="carousel-item active">
        <div className="container">
          <div className="row mx-auto">
          {gameData ? (
                <GameCard game={gameData} /> 
              ) : (
                <p>Loading game data...</p>
              )}
          </div>
        </div>
      </div>
      
      <button
        className="carousel-control-prev position-absolute start-0"
        type="button"
        data-mdb-target="#carouselMultiItemExample"
        data-mdb-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next position-absolute end-0"
        type="button"
        data-mdb-target="#carouselMultiItemExample"
        data-mdb-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>

    </div>
  </div>
</div>
  </div>
</div>
</section>
</div>

  );
};

export default Home;
