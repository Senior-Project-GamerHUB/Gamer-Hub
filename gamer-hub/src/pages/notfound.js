import React from "react";

const NotFound = () => {

    const heroStyle = {
        backgroundImage: 'url("https://i.redd.it/vo9vm1fcqrp71.jpg")', // Replace this URL with the actual image URL
      };

  return (
    <div>

<section className="hero-section overflow-hidden">
        <div className="hero-slider owl-carousel">
          <div className="hero-item set-bg d-flex align-items-center justify-content-center text-center" style={heroStyle}>
            <div className="container">
             <h1>404 Not Found</h1>
             <h3>Sorry, the page you are looking for does not exist.</h3>
              <a href="#" className="site-btn">
                Read More <img src="img/icons/double-arrow.png" alt="#" />
              </a>
            </div>
          </div>
        </div>
        </section>
    
      
    </div>
  );
};

export default NotFound;