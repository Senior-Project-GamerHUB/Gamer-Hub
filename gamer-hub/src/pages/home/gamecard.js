import React, { useState } from 'react';

const GameCard = ({ game }) => {
  const defaultImage = 'default_image_url.jpg';
  const [isHovered, setIsHovered] = useState(false);

  const handleHover = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleClick = () => {
    // Add your click handling logic here
    console.log('Card Clicked!');
  };

  const textColor = isHovered ? 'purple' : 'white';

  return (
    <div className="col-sm-2">
      <div
        className={`card card-hover`}
        style={{
          width: '300px',
          height: '350px',
          marginBottom: '40px',
          backgroundColor: isHovered ? 'rgb(60, 60, 68)' : 'rgb(46, 46, 52)',
          transition: 'background-color 0.3s ease',
          border: `3px solid white`,
        }}
        onMouseEnter={handleHover}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
      >
        <div className="card-container" style={{ width: '100%', height: '70%', overflow: 'hidden' }}>
          <a href={`/game/${game.id}`}>
            <img
              src={game.background_image || defaultImage}
              className="card-img"
              alt={game.name || 'Unknown Title'}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </a>
        </div>
        <div
          className="card-body custom-bg-color"
          style={{
            height: '30%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            transition: 'background-color 0.3s ease',
          }}
        >
          <div>
            <h5 className="card-title" style={{ fontSize: '14px', color: textColor, transition: 'color 0.3s ease' }}>
              {game.name || 'Unknown Title'}
            </h5>
          </div>
          <div>
            <p style={{ fontSize: '12px', color: textColor, margin: 0, transition: 'color 0.3s ease' }}>
              Platforms: {game.platforms && game.platforms.map((platform) => platform.platform.name).join(', ')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameCard;