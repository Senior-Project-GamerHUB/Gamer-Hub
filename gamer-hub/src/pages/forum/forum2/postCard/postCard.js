import React from 'react';
import { Link } from 'react-router-dom';
import './postCard.css'

const PostCard = ({ post }) => {
  return (
    <div className="post-card">
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      <Link to={`/forum/post/${post.id}`}>Read More</Link>
    </div>
  );
};

export default PostCard;