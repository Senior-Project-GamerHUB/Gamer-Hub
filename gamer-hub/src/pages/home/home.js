import React, { useEffect, useState } from 'react';
import './home.css';
import GameCard from './gamecard';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Home = () => {
  const [topGames, setTopGames] = useState([]);
  const [newGames, setNewGames] = useState([]);
  const apiKey = '3f02ae9693244e86b768ab662105fd14'; 
  const currentDate = new Date().toISOString().split('T')[0]; // Get current date in 'YYYY-MM-DD' format
  const LastYear = new Date();
  LastYear.setFullYear(LastYear.getFullYear() - 1);
  const lastYearDate = LastYear.toISOString().split('T')[0]; // Get date from one year ago in 'YYYY-MM-DD' format
  const [upcomingGames, setUpcomingGames] = useState([]);
  const nextYear = new Date();
  nextYear.setFullYear(nextYear.getFullYear() + 1);
  const nextYearDate = nextYear.toISOString().split('T')[0]; // Get date from one year in the future in 'YYYY-MM-DD' format
  const [searchQuery, setSearchQuery] = useState('');
  const [games, setGames] = useState([]);

  useEffect(() => {
    const fetchUpcomingGames = async () => {
      try {
        const response = await axios.get(`https://api.rawg.io/api/games`, {
          params: {
            key: apiKey,
            dates: `${currentDate},${nextYearDate}`,
            ordering: '-added',
            page_size: 10,
          },
        });

        setUpcomingGames(response.data.results);
      } catch (error) {
        console.error('Error fetching upcoming games:', error);
      }
    };

    fetchUpcomingGames();
  }, [apiKey, currentDate, nextYearDate]);

  
  useEffect(() => {
    const fetchTopGames = async () => {
      try {
        const response = await axios.get(`https://api.rawg.io/api/games`, {
          params: {
            key: apiKey,
            dates: `${lastYearDate},${currentDate}`,
            ordering: '-rating',
            page_size: 10,
          },
        });

        setTopGames(response.data.results);
      } catch (error) {
        console.error('Error fetching top games:', error);
      }
    };

    fetchTopGames();
  }, [apiKey, lastYearDate, currentDate]);

  useEffect(() => {
    const fetchNewGames = async () => {
      try {
        const response = await axios.get(`https://api.rawg.io/api/games`, {
          params: {
            key: apiKey,
            dates: `${lastYearDate},${currentDate}`,
            ordering: '+released',
            page_size: 10,
          },
        });

        setNewGames(response.data.results);
      } catch (error) {
        console.error('Error fetching new games:', error);
      }
    };

    fetchNewGames();
  }, [apiKey, lastYearDate, currentDate]);

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
      <section className="hero-section overflow-hidden">
        <div className="hero-slider owl-carousel">
          <div
            className="hero-item set-bg d-flex flex-column align-items-center justify-content-center text-center"
            style={heroStyle}
          >
          <section className="search-box2">
          <input
            className="input-search-box"
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {games.length > 0 && (
             <ul className="search-results">
             {games.map((game) => (
               <li key={game.id}>
                 <Link to={`/game/${game.id}`}>{game.name}</Link>
               </li>
             ))}
           </ul>
          )}
        </section>
          </div>
        </div>
      </section>
      <section className="intro-section">
        <div className="container">
          <div className="row">
            <div className="background">

              <div className="row mx-auto">
                <div className="col-md-4">
                  <h5 className='category-header'>Popular Games</h5>
                  <ul>
                    {topGames.map((game) => (
                      <GameCard key={game.id} game={game} />
                    ))}
                  </ul>
                </div>
                <div className="col-md-4">
                  <h5 className='category-header'>New Releases</h5>
                  <ul>
                    {newGames.map((game) => (
                      <GameCard key={game.id} game={game} />
                    ))}
                  </ul>
                </div>
                <div className="col-md-4">
                  <h5 className='category-header'>Upcoming Games</h5>
                  <ul>
                    {upcomingGames.map((game) => (
                      <GameCard key={game.id} game={game} />
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;