import React from 'react';
import './submit.css'
const Submit = () => {

  const heroStyle = {
    backgroundImage: 'url("https://i.redd.it/vo9vm1fcqrp71.jpg")',
  };

    return(
      <div>
       <section className="page-top-section set-bg" style={heroStyle}>
          <div className="page-info">
            <h2>Submit</h2>
            <div className="site-breadcrumb">
              <a href="/home">Home</a> /
              <span>Submit</span>
            </div>
          </div>
       </section>
       <div className="page-container">
       <section className="search-box2">
          <input className= "input-search-box"
            type="text"
            placeholder="Search..."
           
          />
          <button type="button">Search</button>
        </section>
       </div>

     </div>
    );
};


export default Submit;