import React from 'react';


const GameCard = ({ game }) => {
  return (
    <div className="col-sm-2">
      <div className="card card-hover" style={{ width: "130px", height: "230px",  marginBottom:'20px' }}>
        <div className="card-container" style={{ width: "100%", height: "85%" }}>
          <a href={`/game/${game.id}`}>
            <img 
              src={game.background_image || 'default_image_url.jpg'} 
              className="card-img"
              alt={game.name || 'Game Title'} 
              style={{ width: "300px", height: "170px" }}
            />
          </a>
        </div>
        <div className="card-body custom-bg-color">
          <h5 className="card-title" style={{ fontSize: "10px", color: "black" }}>{game.name || 'Unknown Title'}</h5>
        </div>
      </div>
    </div>
  );
};

export default GameCard;