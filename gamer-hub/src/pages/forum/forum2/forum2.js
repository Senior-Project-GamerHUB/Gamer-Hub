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
  const [showPostForm, setShowPostForm] = useState(false);
  const [userid, setUserID] = useState([]);
  const [forumPosts, setForumPosts] = useState([]);
  const [username, setUserLog] = useState([]);


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

    axios.get('http://localhost:8080/loggedIn', {withCredentials: true})
    .then(res => {
        setUserID(res.data[0].user_id);
        setUserLog(res.data[0].username);
    })
    .catch(err => console.log(err));

   
    const handlePostSubmit = async (newPost) => {
      try {
        const response = await axios.post('http://localhost:8080/addForum', {
          user: userid,
          username: username, 
          game: appid,
          title: newPost.title,
          text: newPost.content,
        });
    
        console.log('Server response:', response.data);
    
        setForumPosts((prevForumPosts) => [...prevForumPosts, response.data]);
    
        setShowPostForm(false);
      } catch (error) {
        console.error('Error submitting post:', error);
      }
    };
  

    useEffect(() => {
      const fetchForumPosts = async () => {
        try {
          console.log('Fetching forum posts for gameID:', appid);
          const response = await axios.get('http://localhost:8080/getForumPosts', {
            params: {
              gameID: appid,
            },
          });
          console.log('Fetched forum posts:', response.data);
          setForumPosts(response.data);
        } catch (error) {
          console.error('Error fetching forum posts:', error);
        }
      };
    
      fetchForumPosts();
    }, [appid]);

    const handleCancel = () => {
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
                          {store.store.name}
                    
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
            <PostForm onPostSubmit={handlePostSubmit} onCancel={handleCancel} />
          </div>
          )}

          {forumPosts.map((post) => (
            <PostCard key={post.postID} post={{ id: post.postID, username: post.userName, title: post.title, text: post.text }}/>
          ))}


        

          

        </div>
      </div>
    </div>
  );
};

export default Forum2;