import React, { useState } from 'react';
import './postForm.css'; // Create a separate CSS file for styling

const PostForm = ({ onPostSubmit }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform validation or additional checks if needed
    onPostSubmit({ title, content });
    // Reset the form after submission
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