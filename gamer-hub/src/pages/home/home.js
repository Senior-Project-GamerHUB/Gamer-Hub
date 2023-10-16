import React from 'react';
import "./home.css";

const Home = () => {
    return(
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

                <div className="col-sm-2">
                  <div className="card card-hover" style={{ width: "130px", height: "230px" }}>
                    <div className="card-container" style={{ width: "100%", height: "85%" }}>
                      <img
                        src="https://howlongtobeat.com/games/68151_Elden_Ring.jpg?width=100"
                        className="card-img-top"
                        alt="Your Image"
                        style={{ objectFit: "cover", width: "100%", height: "100%" }}
                      />
                    </div>
                    <div className="card-body custom-bg-color">
                      <h5 className="card-title" style={{ fontSize: "10px", color: "white" }}>Elden Ring</h5>
                    </div>
                  </div>
                </div>

                <div className="col-sm-2">
                  <div className="card card-hover" style={{ width: "130px", height: "230px" }}>
                    <div className="card-container" style={{ width: "100%", height: "85%" }}>
                      <img
                        src="https://howlongtobeat.com/games/27100_Red_Dead_Redemption_2.jpg?width=100"
                        className="card-img-top"
                        alt="Your Image"
                        style={{ objectFit: "cover", width: "100%", height: "100%" }}
                      />
                    </div>
                    <div className="card-body custom-bg-color"style={{ width: "128px", height: "55px" }}>
                      <h5 className="card-title" style={{ fontSize: "10px", color: "white" }}>Red Dead Redemption 2</h5>
                    </div>
                  </div>
                </div>

                <div className="col-sm-2">
                  <div className="card card-hover" style={{ width: "130px", height: "230px" }}>
                    <div className="card-container" style={{ width: "100%", height: "85%" }}>
                      <img
                        src="https://howlongtobeat.com/games/Cyberpunk-2077-2.jpg?width=100"
                        className="card-img-top"
                        alt="Your Image"
                        style={{ objectFit: "cover", width: "100%", height: "100%" }}
                      />
                    </div>
                    <div className="card-body custom-bg-color">
                      <h5 className="card-title" style={{ fontSize: "10px", color: "white" }}>Cyberpunk 2077</h5>
                    </div>
                  </div>
                </div>

                <div className="col-sm-2">
                  <div className="card card-hover" style={{ width: "130px", height: "230px" }}>
                    <div className="card-container" style={{ width: "100%", height: "85%" }}>
                      <img
                        src="https://howlongtobeat.com/games/68033_Baldurs_Gate_3.jpg?width=100"
                        className="card-img-top"
                        alt="Your Image"
                        style={{ objectFit: "cover", width: "100%", height: "100%" }}
                      />
                    </div>
                    <div className="card-body custom-bg-color">
                      <h5 className="card-title" style={{ fontSize: "10px", color: "white" }}>Baldur's Gate 3</h5>
                    </div>
                  </div>
                </div>

                <div className="col-sm-2">
                  <div className="card card card-hover" style={{ width: "130px", height: "230px" }}>
                    <div className="card-container" style={{ width: "100%", height: "85%" }}>
                      <img
                        src="https://howlongtobeat.com/games/92418_Lies_Of_P.jpg?width=100"
                        className="card-img-top"
                        alt="Your Image"
                        style={{ objectFit: "cover", width: "100%", height: "100%" }}
                      />
                    </div>
                    <div className="card-body custom-bg-color">
                      <h5 className="card-title" style={{ fontSize: "10px", color: "white" }}>Lies of P</h5>
                    </div>
                  </div>
                </div>

                <div className="col-sm-2">
                  <div className="card card-hover" style={{ width: "130px", height: "230px" }}>
                    <div className="card-container" style={{ width: "100%", height: "85%" }}>
                      <a href="/game"> {/* Add the URL you want to link to */}
                        <img
                          src="https://howlongtobeat.com/games/57445_Starfield.jpg?width=100"
                          className="card-img-top"
                          alt="Your Image"
                          style={{ objectFit: "cover", width: "100%", height: "100%" }}
                        />
                      </a>
                    </div>
                    <div className="card-body custom-bg-color">
                      <h5 className="card-title" style={{ fontSize: "10px", color: "white" }}>Starfield</h5>
                    </div>
                  </div>
                </div>
                
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
   );
};


export default Home;