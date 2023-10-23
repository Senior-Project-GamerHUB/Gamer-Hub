import React from 'react';
import "./individualgame.css";
import ReactApexChart from "react-apexcharts";


const IndividualGame = () => {
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
    // Add other chart options here
  };
  const heroStyle = {
    backgroundImage: 'url("https://i.redd.it/vo9vm1fcqrp71.jpg")', // Replace this URL with the actual image URL
  };
  return (
    <div>
      
      <section class="page-top-section set-bg" style={heroStyle}>
          <div class="page-info">
            <h2>Games</h2>
            <div class="site-breadcrumb">
              <a href="/">Home</a>  /
              <span>Game</span>
            </div>
          </div>
	  </section>

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
          <p>Affronting imprudence do he he everything. Sex lasted dinner wanted indeed wished out law. Far advanced settling say finished raillery. Offered chiefly farther of my no colonel shyness. Such on help ye some door if in. Laughter proposal laughing any son law consider. Needed except up piqued an.</p>

        </div>
        <div>

    </div>
        <h1>User Statistics</h1>
        <h3>Difficulty</h3>

        <ReactApexChart options={chartOptions} series={chartOptions.series} type="bar" height={350} />


      </div>
    </div>
  
    </div>
  );
};


export default IndividualGame;