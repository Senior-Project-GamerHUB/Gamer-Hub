import React from 'react';

const Header = () => {
  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <a className="navbar-brand" href="/"><strong>Gamer Hub</strong></a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <a className="nav-link" href="/home">Home <span className="sr-only"></span></a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/submit">Submit</a>
            </li>
          </ul>

  
          <form className="form-inline my-2 my-lg-0 mx-auto">
            <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
           
          </form>

          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <a className="nav-link" href="/profile">Username</a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;