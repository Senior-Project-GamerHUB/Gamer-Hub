import React from 'react';
import './header.css';

const Header = () => {
  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-dark bg-gold-yellow">
        <a className="navbar-brand logo" href="/"><strong>Gamer Hub</strong></a>

        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <a className="nav-link" href="/submit">Submit</a>
          </li>
        </ul>

        <form className="form-inline my-2 my-lg-0 mx-auto">
          <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
        </form>

        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <a className="nav-link" href="/profile">
              <i className="fas fa-user"></i> Username
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;