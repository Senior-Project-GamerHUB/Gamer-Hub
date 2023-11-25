import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import PostForm from './postForm/postForm'
import PostCard from './postCard/postCard';
import './forum2.css'

const Forum2 = () => {
  const heroStyle = {
    backgroundImage: 'url("https://i.redd.it/vo9vm1fcqrp71.jpg")',
  };

  const [gameData, setGameData] = useState(null);
  const { appid } = useParams();

  const [posts, setPosts] = useState([]);
  const [showPostForm, setShowPostForm] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`/api/posts/${gameData?.id}`);
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts: ', error);
      }
    };

    if (gameData) {
      fetchPosts();
    }
  }, [gameData]);

  useEffect(() => {
    const fetchGameDetails = async () => {
      try {
        const response = await axios.get(`https://api.rawg.io/api/games/${appid}`, {
          params: {
            key: '3f02ae9693244e86b768ab662105fd14',
          },
        });

        setGameData(response.data);
      } catch (error) {
        console.error('Error fetching game data: ', error);
      }
    };

    fetchGameDetails();
  }, [appid]);

  const handlePostSubmit = (newPost) => {
    // You can perform actions with the new post data, such as sending it to the server
    console.log('New Post:', newPost);

    // For this example, just updating the state with the new post
    setPosts((prevPosts) => [...prevPosts, newPost]);
    // Hide the post form after submission
    setShowPostForm(false);
  };

  return (
    <div>
      <section className="page-top-section set-bg" style={heroStyle}>
        <div className="page-info">
          <h2>Game Forum </h2>
          <div className="site-breadcrumb">
            <a href="/home">Home</a> /
            <a href="/forum">Forum Search</a> /
            <span>Game Forum</span>
          </div>
        </div>
      </section>

      <div className="page-container">
        <div className="game-container">
          {gameData ? (
            <div>
              <h1>{gameData.name}</h1>
              <div className="game-image">
                <a href={`/game/${gameData.id}`}>
                  <img src={gameData.background_image} alt={gameData.name} />
                </a>
              </div>
              <div className="game-info-container">
                <p>Developer: {gameData.developers && gameData.developers.map((dev) => dev.name).join(', ')}</p>
                <p>Publisher: {gameData.publishers && gameData.publishers.map((pub) => pub.name).join(', ')}</p>
                <p>Release Date: {gameData.released}</p>
                <p>Genre: {gameData.genres && gameData.genres.map((genre) => genre.name).join(', ')}</p>
                <p>Platforms: {gameData.platforms && gameData.platforms.map((platform) => platform.platform.name).join(', ')}</p>
                {gameData.stores && gameData.stores.length > 0 && (
                  <div>
                    <h5>Available at:</h5>
                    <ul>
                      {gameData.stores.map((store) => (
                        <li key={store.store.id}>
                          <a href={store.url}>{store.store.name}</a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>

        <div className="right-content">
          <button onClick={() => setShowPostForm(true)} class="create-post-button">
            Create Post
          </button>

          {showPostForm && (
          <div>
            {/* Render the PostForm component */}
            <PostForm onPostSubmit={handlePostSubmit} />
          </div>
          )}

          {posts.map((post) => (
            // Use the PostCard component here
            <PostCard key={post.id} post={post} />
          ))}

        </div>
      </div>
    </div>
  );
};

export default Forum2;