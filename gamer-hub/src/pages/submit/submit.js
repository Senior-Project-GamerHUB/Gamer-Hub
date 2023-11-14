import React, { useState, useEffect } from 'react';
import './submit.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Submit = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [games, setGames] = useState([]);
  const apiKey = '3f02ae9693244e86b768ab662105fd14';

  const heroStyle = {
    backgroundImage: 'url("https://i.redd.it/vo9vm1fcqrp71.jpg")',
  };

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await axios.get('https://api.rawg.io/api/games', {
          params: {
            key: apiKey,
            page_size: 5, 
            search: searchQuery,
          },
        });

        setGames(response.data.results);
      } catch (error) {
        console.error('Error fetching games:', error);
      }
    };

    if (searchQuery.trim() !== '') {
      fetchGames();
    } else {
      setGames([]);
    }
  }, [searchQuery, apiKey]);

  return (
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
          <input
            className="input-search-box"
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {games.length > 0 && (
            <p className="search-results">
              {games.map((game) => (
                <li key={game.id}>
                  <Link to={`/submit/game/${game.id}`}>{game.name}</Link>
                </li>
              ))}
            </p>
          )}
        </section>
      </div>
    </div>
  );
};

export default Submit;