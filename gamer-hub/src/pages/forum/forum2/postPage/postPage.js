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
      'This is the content of the sample post. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eu risus eget odio vehicula tincidunt non in nulla. Nullam eu libero eget metus fermentum laoreet.',
  };

  const [showCommentForm, setShowCommentForm] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState([]);
  const [replyToComment, setReplyToComment] = useState(null);
  const [replyContent, setReplyContent] = useState('');


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

  const handleReply = (username) => {
    setReplyToComment(username);
    // You can also implement logic to scroll to the reply form or focus on the input field
  };
  
  const handleReplySubmit = (e, username) => {
  e.preventDefault();
  // Add logic to submit the reply to the backend or store it in the state
  const submittedReply = {
    username: 'Current User', // Replace with the actual username from your authentication system
    content: replyContent,
  };
  // Find the parent comment and add the reply to its replies array
  const updatedComments = comments.map((comment) =>
    comment.username === username
      ? { ...comment, replies: [...(comment.replies || []), submittedReply] }
      : comment
  );
  setComments(updatedComments);
  // Reset the reply form state
  setReplyToComment(null);
  setReplyContent('');
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
            Add Comment
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
              <button type="submit">Submit Comment</button>
            </form>
          </div>
        )}
      </div>

      
      <div className="backgroundPost">
        <section className="gradient-custom">
          <div className="container my-5 py-5">
            <div className="row d-flex justify-content-center">
              <div className="col-md-12 col-lg-10 col-xl-8">
                <div className="card">
                  <div className="card-body p-4">
                    <h3 className="text-center mb-4 pb-2">Comments</h3>
                    {comments.map((comment, index) => (
                      <div key={index} className="comment-box">
                        <p style={{ color: 'black' }}>
                          <strong>{comment.username}:</strong> {comment.content}
                        </p>
                        <button onClick={() => handleReply(comment.username)} className="reply-button">
                          Reply
                        </button>
                        {replyToComment === comment.username && (
                          <div className="comment-form">
                            <form onSubmit={(e) => handleReplySubmit(e, comment.username)}>
                              <textarea
                                value={replyContent}
                                onChange={(e) => setReplyContent(e.target.value)}
                                placeholder="Write your reply here..."
                                rows="4"
                              />
                              <button type="submit">Submit Reply</button>
                            </form>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>

  );
};

export default PostPage;