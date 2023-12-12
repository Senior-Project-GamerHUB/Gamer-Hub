import React from 'react';
import { Link } from 'react-router-dom';
import './postCard.css';

const PostCard = ({ post }) => {
  const defaultProfilePicture =
    'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/2048px-Default_pfp.svg.png';

  const profilePictureSize = {
    width: '20px',
    height: '20px',
    marginRight: '10px',
  };

  return (
    <div className="post-card">
      <div className="user-info">
        <p className="post-author">
        {post.picture ? (
          <img
            src={`data:image/png;base64,${post.picture}`}
            alt={`${post.username}'s Profile`}
            style={profilePictureSize}
          />
        ) : (
          <img
            src={defaultProfilePicture}
            alt="Default Profile"
            style={profilePictureSize}
          />
        )}
           {post.username}
        </p>
      </div>
      <h2 className="post-title">{post.title}</h2>
      <p className="post-content">{post.text}</p>
      <Link to={`/forum/post/${post.id}`} className="read-more-link">
        Read More
      </Link>
    </div>
  );
};

export default PostCard;