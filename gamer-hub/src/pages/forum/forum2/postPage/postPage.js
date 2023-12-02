import React, { useState } from 'react';
import './postPage.css';

const PostPage = () => {
  const heroStyle = {
    backgroundImage: 'url("https://i.redd.it/vo9vm1fcqrp71.jpg")',
  };

  const post = {
    username: 'Author',
    date: '11-25-2023',
    title: 'Post Title',
    content:
      'This is the content of the sample post. This is the content of the sample post.This is the content of the sample post.This is the content of the sample post.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eu risus eget odio vehicula tincidunt non in nulla. Nullam eu libero eget metus fermentum laoreet.',
  };

  const [showCommentForm, setShowCommentForm] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState([]);

  const handleAddComment = () => {
    setShowCommentForm(true);
  };

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    // Add logic to submit the comment to the backend or store it in the state
    const submittedComment = {
      username: 'Current User', // Replace with the actual username from your authentication system
      content: newComment,
    };
    setComments((prevComments) => [...prevComments, submittedComment]);
    // Reset the comment form
    setNewComment('');
    // Hide the comment form after submission
    setShowCommentForm(false);
  };


  

  return (
    <div className="backgroundPost">
      <section className="page-top-section set-bg" style={heroStyle}>
        <div className="page-info">
          <h2>Post</h2>
          <div className="site-breadcrumb">
            <a href="/home">Home</a> /
            <a href="/forum">Forum Search</a> /
            <a href="/forum/game/:appid">Game Forum</a> /
            <span>Post</span>
          </div>
        </div>
      </section>

      <div className="thread-box">
        <div className="post-content">
        <p style={{ fontFamily: 'monospace', fontSize: '16px', marginBottom: '4px' }}>{post.username}</p>
        <p style={{ fontFamily: 'monospace', fontSize: '12px', marginTop: '0' }}>{post.date}</p>
          <h3 style={{ fontFamily: 'Georgia, serif', fontSize: '32px', color: 'lightblue' }}>{post.title}</h3>
          <p style={{ fontSize: '16px' }}>{post.content}</p>
          <button onClick={handleAddComment} className="add-comment-button">
            +
          </button>
        </div>
        {showCommentForm && (
          <div className="comment-form">
            <form onSubmit={handleCommentSubmit}>
              <textarea className='submitComment'
                value={newComment}
                onChange={handleCommentChange}
                placeholder="Write your comment here..."
                rows="4"
              />
              <button type="submit" className="submit-comment-button">Submit Comment</button>
            </form>
          </div>
        )}
      </div>

      
      <div className="thread-box">
        <h3 className="text-center mb-4 pb-2">Comments</h3>
        {comments.map((comment, index) => (
          <div key={index} className="comment-box">
            <p style={{ color: 'white' }}>
              <strong>{comment.username}:</strong> {comment.content}
            </p>
          </div>
        ))}
      </div>


    </div>
  );
};

export default PostPage;