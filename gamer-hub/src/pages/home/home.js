import React, { useEffect, useState} from 'react';
import './home.css';
import GameCard from './gamecard';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const heroStyle = {
    backgroundImage: 'url("https://i.redd.it/vo9vm1fcqrp71.jpg")', // Replace this URL with the actual image URL
  };
  const scrollToIntro = () => {
    const introSection = document.getElementById('intro-section');
    if (introSection) {
      introSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const gameData = [
    {
      appid: 1817070,
      imageURL: 'https://cdn.akamai.steamstatic.com/steam/apps/1817070/header.jpg?t=1695916105',
      name: 'Spiderman Remastered',
    }
  ];
  
  return (
      <div>
        <section className="hero-section overflow-hidden">
        <div className="hero-slider owl-carousel">
          <div className="hero-item set-bg d-flex align-items-center justify-content-center text-center" style={heroStyle}>
            <div className="container">
              <h1>Game on!</h1>
              <h5>
                Take a look at the selection of our games you can review and see existing reviews.
              </h5>
              <button onClick={scrollToIntro} className="scroll-button">
                Immerse
              </button>
            </div>
          </div>
        </div>
        </section>
       
       
    <section class="intro-section">
    <div class="container">
			<div class="row">
        <div className="background">
        <div class="category-row">
          <div class="row-header">
            <h1></h1>
          </div>
          <div class="carousel">
            <div class="carousel-container">
              <div class="carousel-track">
                {gameData.map((game, index) => (
                  <GameCard key={index} game={game} />
                ))}
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
