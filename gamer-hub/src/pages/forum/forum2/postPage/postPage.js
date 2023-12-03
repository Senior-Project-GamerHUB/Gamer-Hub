import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './postPage.css';

const PostPage = () => {
  const heroStyle = {
    backgroundImage: 'url("https://i.redd.it/vo9vm1fcqrp71.jpg")',
  };

  const [showCommentForm, setShowCommentForm] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState([]);

  const dummyData = {
    title: 'Title this bitch',
    text: "Text me or I won't talk to you",
  };
  const [postData, setPostData] = useState(dummyData);
  

  const handleAddComment = () => {
    setShowCommentForm(true);
  };

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    const submittedComment = {
      username: 'Current User',
      content: newComment,
    };
    setComments((prevComments) => [...prevComments, submittedComment]);
    setNewComment('');
    setShowCommentForm(false);
  };

  const { postId } = useParams();

  useEffect(() => {
    console.log('Fetching post data for postId:', postId);
  
    const fetchPostData = async () => {
      try {
        const response = await axios.get(`/getPost/${postId}`);
        console.log('Response from server:', response.data);
        setPostData(response.data);
      } catch (error) {
        console.error('Error fetching post data:', error);
        setPostData(null);
      }
    };
  
    if (postId !== undefined && postId !== null) {
      console.log('Calling fetchPostData');
      fetchPostData();
    }
  }, [postId]);

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
          <div className="backgroundPost">
            {postData ? (
              <div>
                <h2>Title: {postData.title}</h2>
                <p>Text: {postData.text}</p>
              </div>
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </div>

        {showCommentForm && (
          <div className="comment-form">
            <form onSubmit={handleCommentSubmit}>
              <textarea
                className='submitComment'
                value={newComment}
                onChange={handleAddComment}
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
