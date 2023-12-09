import React from 'react';


const StarRating = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const remainingStars = 5 - fullStars;
  const hasHalfStar = rating % 1 !== 0;

  const starElements = [];
  for (let i = 0; i < fullStars; i++) {
    starElements.push(<span key={i} className="star filled">★</span>);
  }

 
  for (let i = 0; i < remainingStars; i++) {
    starElements.push(<span key={`empty-${i}`} className="star">★</span>);
  }

  return <div className="star-rating">{starElements}</div>;
};

export default StarRating;