import React, { useEffect, useState } from 'react';
import "./individualgame.css";
import PieApexChart from "./PieApexchart"
import StackApexChart from "./StackApexchart"
import DonutApexChart from "./DonutApexChart"
import StarRating from './StarRating';
import ReviewCard from './reviewCard/reviewCard';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const IndividualGame = () => {
  const heroStyle = {
    backgroundImage: 'url("https://i.redd.it/vo9vm1fcqrp71.jpg")',
  };

  const [gameData, setGameData] = useState(null);
  const { appid } = useParams();
  const [reviews, setReviews] = useState([]);
  const [averagePlaytime, setAveragePlaytime] = useState(null);

  useEffect(() => {
    const fetchGameDetails = async () => {
      try {
        const response = await axios.get(`https://api.rawg.io/api/games/${appid}`, {
          params: {
            key: '3f02ae9693244e86b768ab662105fd14',
          },
        });
  
        setGameData(response.data);
      } catch (error) {
        console.error('Error fetching game data: ', error);
      }
    };
  
    fetchGameDetails();
  }, [appid]);
  

 useEffect(() => {
  const fetchReviews = async () => {
    try {
      const reviewsResponse = await axios.get(`http://localhost:8080/getReviewsForGame`, {
        params: {
          gameID: appid,
        },
      });

      const formattedReviews = reviewsResponse.data.map((review) => ({
        userID: review.userID,
        userName: review.userName,
        review: review.review,
        playtime_seconds: review.playtime_seconds,
        playtime_minutes: review.playtime_minutes,
        playtime_hour: review.playtime_hour,
        completion_status: review.completion_status,
        difficulty: review.difficulty,
        worth_the_price: review.worth_the_price,
        rating: review.rating,
      }));

      setReviews(formattedReviews);
      console.log('Fetched Reviews:', formattedReviews); // Log the fetched reviews

      const totalPlaytimeInSeconds = formattedReviews.reduce(
        (total, review) =>
          total +
          review.playtime_hour * 3600 +
          review.playtime_minutes * 60 +
          review.playtime_seconds,
        0
      );

      const totalReviews = formattedReviews.length;

      const avgPlaytimeInSeconds = totalReviews > 0 ? totalPlaytimeInSeconds / totalReviews : 0;

      const avgPlaytimeHour = Math.floor(avgPlaytimeInSeconds / 3600);
      const avgPlaytimeMinute = Math.floor((avgPlaytimeInSeconds % 3600) / 60);
      const avgPlaytimeSecond = Math.floor(avgPlaytimeInSeconds % 60);

      const totalRating = formattedReviews.reduce((total, review) => total + review.rating, 0);
      const avgRating = totalReviews > 0 ? totalRating / totalReviews : 0;

      const roundedAvgRating = Math.round(avgRating * 100) / 100;

      setAveragePlaytime({
        hour: avgPlaytimeHour,
        minute: avgPlaytimeMinute,
        second: avgPlaytimeSecond,
        rating: roundedAvgRating,
      });
    } catch (error) {
      console.error('Error fetching reviews for the game: ', error);
    }
  };

  fetchReviews();
}, [appid]);


  return (
    <div>
      <section className="page-top-section set-bg" style={heroStyle}>
        <div className="page-info">
          <h2>Game</h2>
          <div className="site-breadcrumb">
            <a href="/home">Home</a> /
            <span>Game</span>
          </div>
        </div>
      </section>

      <div className="page-container">
        <div className="game-container">
          {gameData ? (
            <div>
              <h1>{gameData.name}</h1>
              <div className="game-image">
                <img src={gameData.background_image} alt={gameData.name} />
              </div>
              <div className="game-info-container">
                <p>Developer: {gameData.developers && gameData.developers.map((dev) => dev.name).join(', ')}</p>
                <p>Publisher: {gameData.publishers && gameData.publishers.map((pub) => pub.name).join(', ')}</p>
                <p>Release Date: {gameData.released || 'TBD'}</p>
                <p>Genre: {gameData.genres && gameData.genres.map((genre) => genre.name).join(', ')}</p>
                <p>Platforms: {gameData.platforms && gameData.platforms.map((platform) => platform.platform.name).join(', ')}</p>
                {gameData.stores && gameData.stores.length > 0 && (
                  <div>
                    <h5>Available at:</h5>
                    <ul>
                    {gameData.stores.map((store) => (
                      <li key={store.store.id}>
                          {store.store.name}
                    
                      </li>
                    ))}
                    </ul>
                  </div>
                )}
              </div>
              
            </div>

          ) : (
            <p>Loading...</p>
          )}
          
          <div>
          <div className="button-container">
                {gameData && (
                  <Link to={`/submit/game/${gameData.id}`}>
                    <button className="btn3">Submit Review</button>
                  </Link>
                )}  
                  {gameData && (
                    <button className="btn3" >
                   Save Game
                 </button>
                )}
                 
              </div>
              {gameData && (
                  <Link to={`/forum/game/${gameData.id}`}>
                    <button className="btnForum">Forum</button>
                  </Link>
                )}  
          </div>
        </div>
        
        <div className="right-content">
          <div className="summary">
            {gameData ? (
              <p>{gameData.description_raw}</p>
            ) : (
              <p>Loading...</p>
            )}
  
          </div>

          <div className='rating'>
            <p>GamerHub Rating: {averagePlaytime?.rating ? <StarRating rating={averagePlaytime?.rating} />: 'Not rated yet'}</p>
          </div>
          
          <div className='completion'>
            {averagePlaytime ? (
              <p>
                Average Completion Time:{' '}{`${averagePlaytime?.hour}h ${averagePlaytime?.minute}m ${averagePlaytime?.second}s`}
              </p>
            ) : (
              <p>No reviews available to calculate average completion time.</p>
            )}
          </div>


         <div className='charts'>
          <h2>Completion</h2>
          {reviews.length > 0 ? (
            <PieApexChart completionStatusData={reviews.map(review => review.completion_status)} />
          ) : (
            <p>No reviews available to display completion chart.</p>
          )}
        </div>

        <div className='charts'>
        <h2>Difficulty</h2>
        {reviews.length > 0 ? (
          <StackApexChart />
        ) : (
          <p>No reviews available to display difficulty chart.</p>
        )}
      </div>
      
        <div className='charts'>
          <h2>Worth the Price</h2>
          {reviews.length > 0 ? (
            <DonutApexChart />
          ) : (
            <p>No reviews available to display worth the price chart.</p>
          )}
        </div>

          <h2>Reviews</h2>
          {reviews.length > 0 ? (
            reviews.map((review, index) => (
              <ReviewCard key={index} review={review} />
            ))
          ) : (
            <p>No written review yet for this game. Be the first one to submit a written review!</p>
          )}

     
          

        </div>
      </div>
    </div>
  );
};

export default IndividualGame;