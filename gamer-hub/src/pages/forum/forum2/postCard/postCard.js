import React from 'react';
import { Link } from 'react-router-dom';
import './postCard.css';

const PostCard = ({ post }) => {
  return (
    <div className="post-card">
      <p className = "post-author">Author: {post.username}</p>
      <h2 className="post-title">{post.title}</h2>
      <p className="post-content">{post.text}</p>
      <Link to={`/forum/post/${post.id}`} className="read-more-link">
        Read More
      </Link>
    </div>
  );
};

export default PostCard;
