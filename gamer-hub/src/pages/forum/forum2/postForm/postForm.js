import React, { useState } from 'react';
import './postForm.css'; 

const PostForm = ({ onPostSubmit, onSubmissionComplete, gameID, userID }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


    await onPostSubmit({
      title,
      content,
      gameID,
      userID,
    });

    setTitle('');
    setContent('');

  
  };

  return (
    <div className="post-form-container">
      <h2>Create a New Post</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={handleTitleChange}
            className="input-field"
            required
          />
        </div>
        <div>
          <label htmlFor="content">Content:</label>
          <textarea
            id="content"
            value={content}
            onChange={handleContentChange}
            className="textarea-field"
            required
          />
        </div>
        <div>
          <button type="submit" className="submit-button">
            Submit Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostForm;