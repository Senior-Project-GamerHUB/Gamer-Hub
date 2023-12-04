import React from 'react';
import './reviewCard.css'

const ReviewCard = ({review}) => {
  return (
    <div className="review-card">
      <p>Author: {review.userName}</p>  
      <p className="review-text" >
        {review.review}
      </p>
    </div>
  );
};

export default ReviewCard;