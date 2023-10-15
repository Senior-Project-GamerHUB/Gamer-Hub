import React from 'react';
import { VictoryPie } from 'victory';
import "./individualgame.css";


const IndividualGame = () => {
  const pieChartData = [
    { x: 'Easy Peasy', y: 35 },
    { x: 'No Sweat', y: 20 },
    { x: 'Light Work No Reaction', y: 15 },
    { x: 'Got a Little Kick In It', y: 40 },
    { x: 'Rock Solid Hard', y: 65 },
  ];

  return (
    <div className="page-container">
      <div className="game-container">
        <h1>Starfield</h1>
        <div className="game-image">
          <img src='https://howlongtobeat.com/games/57445_Starfield.jpg?width=250' alt="Starfield" />
        </div>
        <div className="game-info-container">
          <div className="info">
            <p>Developer: Bethesda Game Studios</p>
          </div>
          <div className="info">
            <p>Publisher: ZeniMax Media</p>
          </div>
          <div className="info">
            <p>Release Date: 6 September 2023</p>
          </div>
          <div className="info">
            <p>Platform: Xbox Series X|S, PC</p>
          </div>
          <div className="info">
            <p>Genre: Adventure</p>
          </div>
          <div className="info">
            <p>Rating ESRB: M</p>
          </div>
        </div>
        <button className="addButton">Submit Your Review</button>
      </div>
    
      
      <div className="right-content">
        <div className="summary">
          <p>Starfield is the first new universe in 25 years from Bethesda Game Studios, the award-winning creators of The Elder Scrolls V: Skyrim and Fallout 4. In this next generation role-playing game set amongst the stars, create any character you want and explore with unparalleled freedom as you embark on an epic journey to answer humanity’s greatest mystery.</p>
        </div>
        <h1>User Statistics</h1>
        <h3>Difficulty</h3>

        <div className="victory-chart-container">
  <VictoryPie
    data={pieChartData}
    colorScale={['#0074D9', '#FF4136', '#2ECC40', '#9T74G9', '#004636']}
    innerRadius={0} // Adjust the size of the inner hole
    labelRadius={70} // Adjust the distance of the labels from the center
    style={{
      labels: {
        fontSize: 12, // Adjust label font size
        fill: 'gray', // Label text color
      },
    }}
    labels={({ datum }) => `${datum.x}: ${datum.y}%`}
  />
</div>

      </div>
    </div>
  
    
  );
};


export default IndividualGame;