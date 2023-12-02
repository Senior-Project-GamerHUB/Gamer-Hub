import React from 'react';

const StarRating = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  const starElements = [];
  for (let i = 0; i < fullStars; i++) {
    starElements.push(<span key={i} className="star filled">★</span>);
  }

  if (hasHalfStar) {
    starElements.push(<span key="half" className="star half">★</span>);
  }

  return <div className="star-rating">{starElements}</div>;
};

export default StarRating;