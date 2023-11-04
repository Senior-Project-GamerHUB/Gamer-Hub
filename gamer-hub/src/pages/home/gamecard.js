import React from 'react';

const GameCard = ({ game }) => {
  return (
    <div className="col-sm-2">
      <div className="card card-hover" style={{ width: "130px", height: "230px" }}>
        <div className="card-container" style={{ width: "100%", height: "85%" }}>
          <a href={`/game/${game.appid}`}>
            <img
              src={game.imageURL} 
              className="card-img-top"
              alt={game.name}
              style={{ objectFit: "cover", width: "100%", height: "100%" }}
            />
          </a>
        </div>
        <div className="card-body custom-bg-color">
          <h5 className="card-title" style={{ fontSize: "10px", color: "white" }}>{game.name}</h5>
        </div>
      </div>
    </div>
  );
};

export default GameCard;