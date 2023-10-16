import React from 'react';
import { VictoryPie } from 'victory';
import "./individualgame.css";



const IndividualGame = () => {
  const difficultyPieChart = [
    { x: 'No Sweat', y: 35 },
    { x: 'Easy Peasy', y: 20 },
    { x: 'Light Work No Reaction', y: 15 },
    { x: 'Got a Little Kick In It', y: 25 },
    { x: 'Hard as Bedrock', y: 5 },
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
        <div>

    </div>
        <h1>User Statistics</h1>
        <h3>Difficulty</h3>

        <div className="victory-chart-container" style={{ width: "450px", height: "450px" }}>
          <VictoryPie
            data={difficultyPieChart}
            colorScale={['#14FFB1', '#14FF34', '#FFFF14', '#FF7B14', '#FF1414']}
            innerRadius={0} // Adjust the size of the inner hole
            labelRadius={90} // Adjust the distance of the labels from the center
            style={{
              labels: {
                fontSize: 10, // Adjust label font size
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