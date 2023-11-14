import React from 'react';

const GameCard = ({ game }) => {
  const defaultImage = 'default_image_url.jpg';

  return (
    <div className="col-sm-2">
      <div className="card card-hover" style={{ width: "300px", height: "350px", marginBottom: '20px' }}>
        <div className="card-container" style={{ width: "100%", height: "70%", overflow: "hidden" }}>
          <a href={`/game/${game.id}`}>
            <img
              src={game.background_image || defaultImage}
              className="card-img"
              alt={game.name || 'Unknown Title'}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </a>
        </div>
        <div className="card-body custom-bg-color" style={{ height: "30%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div>
            <h5 className="card-title" style={{ fontSize: "14px", color: "black" }}>{game.name || 'Unknown Title'}</h5>
          </div>
          <div>
            <p style={{ fontSize: "12px", color: "gray", margin: 0 }}>
              Platforms: {game.platforms && game.platforms.map((platform) => platform.platform.name).join(', ')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameCard;