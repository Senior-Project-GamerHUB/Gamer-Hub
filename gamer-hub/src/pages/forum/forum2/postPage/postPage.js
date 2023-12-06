import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './postPage.css';

const PostPage = () => {
  const heroStyle = {
    backgroundImage: 'url("https://i.redd.it/vo9vm1fcqrp71.jpg")',
  };

  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState([]);
  const [postData, setPostData] = useState(null);
  const [username, setUserLog] = useState([]);
  const [userid, setUserID] = useState([]);
  const [profilePicture, setProfilePicture] = useState(null);

  const params = useParams();
  const { postId } = params;

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/getPost/${postId}`);
        setPostData(response.data);
      } catch (error) {
        console.error('Error fetching post data:', error);
        setPostData(null);
      }
    };
  
    const fetchComments = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/getComments/${postId}`);
        setComments(response.data);
      } catch (error) {
        console.error('Error fetching comments:', error);
        setComments([]);
      }
    };
  
    if (postId) {
      fetchPostData();
      fetchComments();
    }
  }, [postId]);

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  axios.get('http://localhost:8080/loggedIn', {withCredentials: true})
  .then(res => {
      console.log(res.data[0].username);
      setUserLog(res.data[0].username);
      setUserID(res.data[0].user_id);

  })

  const isCommentValid = newComment.trim() !== '';

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    if (!isCommentValid) {
  
      alert('Comment cannot be empty');
      return;
    }


    try {
      const response = await axios.post(`http://localhost:8080/addComments`, {
        user: userid,
        username: username,
        text: newComment,
        post: postId,
      });

      const submittedComment = response.data;

      setComments((prevComments) => [...prevComments, submittedComment]);
      setNewComment('');
    } catch (error) {
      console.error('Error submitting comment:', error);
    }
  };

  return (
    <div className="backgroundPost">
      <section className="page-top-section set-bg" style={heroStyle}>
        <div className="page-info">
          <h2>Post</h2>
          <div className="site-breadcrumb">
            <Link to="/home">Home</Link> /
            <Link to="/forum">Forum Search</Link> /
            <Link to={`/forum/game/${postId}`}>Game Forum</Link> /
            <span>Post</span>
          </div>
        </div>
      </section>

      <div className="thread-box">
        <div className="post-content">
          {postData ? (
            <div>
              <p>Author: {postData.userName}</p>
              <h2>{postData.title}</h2>
              <p>{postData.text}</p>
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>

        <div className="comment-form">
          <form onSubmit={handleCommentSubmit}>
            <textarea
              className="submitComment"
              value={newComment}
              onChange={handleCommentChange}
              placeholder="Write your comment here..."
              rows="4"
            />
            <button type="submit" className="submit-comment-button">
              Submit Comment
            </button>
          </form>
        </div>
      </div>

      <div className="thread-box">
        <h3 className="text-center mb-4 pb-2">Comments</h3>
        {comments.map((comment, index) => (
          <div key={index} className="comment-box">
            <p style={{ color: 'white' }}>
              <strong>{comment.username}:</strong> {comment.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostPage;