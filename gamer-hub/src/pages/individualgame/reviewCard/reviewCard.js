import React from 'react';
import './reviewCard.css';

const ReviewCard = ({ review }) => {
  const defaultProfilePicture =
    'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/2048px-Default_pfp.svg.png';

  const profilePictureSize = {
    width: '20px',
    height: '20px',
    marginRight: '10px',
  };

  const getProfilePicture = () => {
    if (review.picture) {
      try {
        const base64String = Buffer.from(review.picture, 'binary').toString('base64');
        return `data:image/png;base64,${base64String}`;
      } catch (error) {
        console.error('Error converting buffer to base64:', error);
      }
    }
    return defaultProfilePicture;
  };

  return (
    <div className="review-card">
      <div className="user-info">
        <p>
          <img
            src={getProfilePicture()}
            alt={review.userName}
            style={profilePictureSize}
          />
          {review.userName}
        </p>
      </div>
      <p className="review-text">{review.review}</p>
    </div>
  );
};

export default ReviewCard;