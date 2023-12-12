const express = require('express');
const path = require('path');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const mysql = require('mysql2');
const passport = require('passport');
const session = require('express-session');
const passportSteam = require('passport-steam');
const SteamStrategy = passportSteam.Strategy;
const axios = require('axios');
const cookieParser = require('cookie-parser');
const bodyParser = require("body-parser");
const multer = require("multer");

const port = process.env.PORT || 8080;
key = '6FDE1CAA90BAA7010C02DF447AF228BE';

var sessID = null;
var sessUser = null;

function CurrentUser(id, name){
	sessID = id;
	sessUser = name
}

async function SteamGameReview(appid){
	try {
		const response = await axios.get(`https://store.steampowered.com/appreviews/${appid}?json=1`);
		const data = response.data;
		if (data.success == 1) {
			console.log(data["query_summary"]);
			const reviewData = {
				summary: data["query_summary"],
				review: data["reviews"],
		  	};
		  
			return reviewData;
		} else {
		  return null;
		}
	  } catch (error) {
		console.error('Error fetching review data: ', error);
		return null;
	  }
}



// Required to get data from user for sessions
passport.serializeUser((user, done) => {
	done(null, user);
   });

passport.deserializeUser((user, done) => {
	done(null, user);
   });

// Initiate Strategy
passport.use(new SteamStrategy({
	returnURL: 'https://gamer-hub-server.onrender.com/api/auth/steam/return',
	realm: 'https://gamer-hub-server.onrender.com/',
	apiKey: '6FDE1CAA90BAA7010C02DF447AF228BE'
	}, function (identifier, profile, done) {
	 process.nextTick(function () {
		db.query("UPDATE users SET picture = ?, username = ?, steamID = ? WHERE user_id = ?", [profile._json['avatarfull'], profile._json['personaname'], profile._json['steamid'], sessID], (error, result) =>{
			
			console.log("error is " + JSON.stringify(error));
			console.log("results are " + result);
	
			if (JSON.stringify(error).indexOf("steamID_UNIQUE") >0 ){
				console.log("error");
			}
			else{
				console.log("ok");
			}
		})
	  profile.identifier = identifier;
	  return done(null, profile);
	 });
	}
));

const buildPath = path.join(__dirname, 'build');

app = express();
app.use(express.static(buildPath));
app.use(express.json());
app.use(cors({
	origin: '*', 
    credentials: true,
	headers: {
		'Content-Type': 'application/json',
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Credentials': true,
		'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
	  }

}));

app.use(cookieParser());

app.use(bodyParser.urlencoded({extended: true}));

app.use(session({
	key: "userId",
	secret: 'secretKey',
	saveUninitialized: false,
	resave: true,

	cookie: {
		secure: false,
	 	maxAge: 3600000
	}
}));



app.use(passport.initialize());
app.use(passport.session());




// mysql database
const db = mysql.createConnection({
	host: "database-1.c4ukfhv2ecav.us-east-2.rds.amazonaws.com",
	user: "databaseGamerHub",
	password: "Gamerhub23",
	database: "GamerHub_DATA"
})





// app.get('*', (req, res)=>{
// 	res.sendFile(path.join(buildPath, 'index.html'));
// })

app.get('/', (req, res) => {
	res.send("SERVER WELCOME");
})

app.get('/loggedIn', (req, res)=>{

	console.log("Current Session: " + req.session.userId);
	if (req.session.userID === undefined){
		req.session.userId = sessID;
	}
	db.query("SELECT * FROM users WHERE user_id = ?", [req.session.userId], (error, data)=>{

		if(error){
			throw error;
		}
		else{
			res.send(data)
		}

	});

})


app.get('/loggout', (req, res)=>{

	req.session.destroy(err=>{
		if(err){
			return res.send(err);
		}

	res.clearCookie("userId");
	return res.send("Deleted Session");
})


})


app.get('/users', (req, res)=>{

	db.query("SELECT * FROM users ", (error, data)=>{

		if(error){
			throw error;
		}
		else{
			res.json(data)
		}

	});


})


// signup data into mysql
app.post('/signup', async(req, res)=>{

	const name_user =req.body.name;
	const username = req.body.username;
	var email = null;
	var email_error = false;
	const response = await axios.get(`https://api.kickbox.com/v2/verify?email=${req.body.email}&apikey=live_2e405c5c10c7856d5a5d7473f26c2115d311f27ece979004159891439f2086d9`)
	const data = await response.data;
	if(data.result == 'deliverable' | data.reason == 'low_deliverability') {
		email = req.body.email;
	} else {
		email_error = true;
	}
	
	const password = await bcrypt.hash(JSON.stringify(req.body.password), 10);


	db.query( "INSERT INTO users (name, username, email, password) VALUES(?,?,?,?)", [name_user, username, email, password], (error, result) =>{
			
			console.log("error is " + JSON.stringify(error));
			console.log("results are " + result);

			if (JSON.stringify(error).indexOf("username_UNIQUE") >0 ){
				return res.send("error");
	
			}

			else if (JSON.stringify(error).indexOf("email_UNIQUE") >0 ){
				return res.send("error2");
	
			}

			else if (email_error == true){
				return res.send("error4");
			} 
			
			else if(JSON.stringify(error).indexOf("cannot be null") >0 ){
				return res.send("error3");
			} 

			else{
				return res.send("ok");
			}
	
		})
	
		


})

// login checker to database
app.post('/login', (req, res)=>{
	
	const dbsql = "SELECT * FROM users WHERE email = ?";
	const values = [
		req.body.email,
		req.body.password
	]


	db.query(dbsql, [req.body.email], async(err,data)=>{
		if(err) return res.json(err);
		if(data.length > 0){
			const SESS = data[0].user_id;
			console.log("User ID: " + SESS);

			req.session.userId=SESS;
			req.session.save();
			CurrentUser(req.session.userId, data[0].username);
			console.log("Session ID: " + req.session.userId);




		let compare = await bcrypt.compare(JSON.stringify(req.body.password), data[0].password);
		if(compare === true){
			return res.json("Login Successfull")

		}else{
			return res.json("No such Record")
		}
	}
	})
})



app.get('/api/auth/steam', passport.authenticate('steam', {failureRedirect: '/'}), function (req, res) {
	res.redirect(`https://gamer-hub-website.onrender.com/profile/${sessUser}/${sessID}`);
   });

app.get('/api/auth/steam/return', passport.authenticate('steam', {failureRedirect: '/'}), async function (req, res) {
	res.redirect(`https://gamer-hub-website.onrender.com/profile/${sessUser}/${sessID}`);
   });

app.post('/getSteamReview', async (req, res) => {
	const response = await fetch(`http://api.steampowered.com/ISteamApps/GetAppList/v0002/?key=${key}&format=json`);
	const data = await response.json();
	index = data["applist"]["apps"].map(function(e) {return e.name;}).indexOf(JSON.stringify(req.body.game_name));
	appid = data["applist"]["apps"][index]["appid"];
	SteamGameReview(appid);
});

app.post('/addReview', async (req, res) => {
    const userID = req.body.user;
	const picture = req.body.picture;
    const username = req.body.username;
    const gameID = req.body.game;
    const votes = req.body.title;
    const review = req.body.text;
    const playtime_h = req.body.playtime_hour;
    const playtime_m = req.body.playtime_minutes;
    const playtime_s = req.body.playtime_seconds;
    const rating = req.body.review;
    const comp_status = req.body.completion_status;
    const difficulty = req.body.difficulty;
    const wtp = req.body.worth_the_price;

    db.query(
        "INSERT INTO Review (userID, picture, userName, gameID, vote_up_num, review, playtime_hour, playtime_minutes, playtime_seconds, rating, comp_status, difficulty, wtp) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?) " +
        "ON DUPLICATE KEY UPDATE " +
        "userID = VALUES(userID), picture = VALUES(picture), userName = VALUES(userName), vote_up_num = VALUES(vote_up_num), review = VALUES(review), playtime_hour = VALUES(playtime_hour), " +
        "playtime_minutes = VALUES(playtime_minutes), playtime_seconds = VALUES(playtime_seconds), rating = VALUES(rating), comp_status = VALUES(comp_status), " +
        "difficulty = VALUES(difficulty), wtp = VALUES(wtp)",
        [userID, picture, username, gameID, votes, review, playtime_h, playtime_m, playtime_s, rating, comp_status, difficulty, wtp],
        (error, result) => {
            console.log("error is " + JSON.stringify(error));
            console.log("results are " + result);

            if (error) {
                res.status(500).send("Error inserting/updating review.");
            } else {
                res.status(200).send("Review inserted/updated successfully.");
            }
        }
    );
});

app.post('/saveGame', async (req, res) => {
	const userID = req.body.user;
	const gameID = req.body.game;
  

	db.query(
	  "SELECT * FROM SavedGames WHERE userID = ? AND gameID = ?",
	  [userID, gameID],
	  (selectError, selectResult) => {
		if (selectError) {
		  console.error("Error checking existing record:", selectError);
		  res.status(500).json({ error: "Error checking existing record." });
		  return;
		}
  
		if (selectResult.length > 0) {
		  
		  res.status(200).json({ message: "Game is already saved.", isGameSaved: true });
		} else {
		 
		  db.query(
			"INSERT INTO SavedGames (userID, gameID) VALUES (?, ?)",
			[userID, gameID],
			(insertError, insertResult) => {
			  if (insertError) {
				console.error("Error saving game:", insertError);
				res.status(500).json({ error: "Error saving game." });
			  } else {
				res.status(200).json({ message: "Game saved successfully.", isGameSaved: true });
			  }
			}
		  );
		}
	  }
	);
  });

  app.get('/getSavedGames/:userID', (req, res) => {
	const userID = req.params.userID;
  
	db.query(
	  "SELECT * FROM SavedGames WHERE userID = ?",
	  [userID],
	  (error, results) => {
		console.log("error is " + JSON.stringify(error));
		console.log("results are " + JSON.stringify(results));
  
		if (error) {
		  res.status(500).send("Error retrieving saved games.");
		} else {
		  res.status(200).json(results);
		}
	  }
	);
  });

  app.delete('/deleteSavedGame/:userID/:gameID', (req, res) => {
	try {
	  const { userID, gameID } = req.params;
  
	  // Check if the saved game exists before attempting to delete
	  db.query('SELECT * FROM SavedGames WHERE userID = ? AND gameID = ?', [userID, gameID], (error, results) => {
		if (error) {
		  console.error('Error checking saved game:', error);
		  return res.status(500).json({ error: 'Internal Server Error' });
		}
  
		if (results.length === 0) {
		  // If no saved game is found, respond with a 404 status
		  return res.status(404).json({ error: 'Saved game not found' });
		}
  
		// The saved game exists, proceed to delete
		db.query('DELETE FROM SavedGames WHERE userID = ? AND gameID = ?', [userID, gameID], (deleteError, deleteResult) => {
		  if (deleteError) {
			console.error('Error deleting saved game:', deleteError);
			return res.status(500).json({ error: 'Internal Server Error' });
		  }
  
		  // Send a success response
		  res.status(200).json({ message: 'Saved game deleted successfully' });
		});
	  });
	} catch (error) {
	  console.error('Error deleting saved game:', error);
	  res.status(500).json({ error: 'Internal Server Error' });
	}
  });


  app.get('/getReviewsForGame', async (req, res) => {
	try {
		// const response = await fetch(`http://api.steampowered.com/ISteamApps/GetAppList/v0002/?key=${key}&format=json`);
		// const data = await response.json();
		// var index = data["applist"]["apps"].map(function(e) {return e.name;}).indexOf(JSON.stringify(req.body.game_name));
		// var appid = data["applist"]["apps"][index]["appid"];
		// var reviewList = SteamGameData(appid);
		
		const { gameID } = req.query;

		if (!gameID) {
			return res.status(400).json({ error: "Missing gameID parameter" });
		}

		console.log('Received gameID:', gameID);

		db.query(
			"SELECT userID, picture, userName, review, playtime_hour, playtime_minutes, rating, playtime_seconds, comp_status, difficulty, wtp FROM Review WHERE gameID = ?",
			[gameID],
			(error, result) => {
			if (error) {
				console.error("Error fetching reviews:", error);
				return res.status(500).json({ error: "Internal Server Error" });
			}

			console.log('Fetched reviews from the database:', result);

			const reviews = result.map((row) => ({
				userID: row.userID,
				picture: row.picture,
				userName: row.userName,
				review: row.review,
				rating: row.rating,
				playtime_hour: row.playtime_hour,
				playtime_minutes: row.playtime_minutes,
				playtime_seconds: row.playtime_seconds,
				completion_status: row.comp_status,
				difficulty: row.difficulty,
				worth_the_price: row.wtp,
			}));

			console.log('Extracted reviews:', reviews);

			res.json(reviews);
			}
	);
	} catch (error) {
	  console.error("Unexpected error:", error);
	  res.status(500).json({ error: "Internal Server Error" });
	}
  });

  app.get('/getReviewsByUser', async (req, res) => {
	try {
	  const { userID } = req.query;
  
	  if (!userID) {
		return res.status(400).json({ error: "Missing userID parameter" });
	  }
  
	  console.log('Received userID:', userID);
  
	  db.query(
		"SELECT gameID FROM Review WHERE userID = ?",
		[userID],
		(error, result) => {
		  if (error) {
			console.error("Error fetching reviews by user:", error);
			return res.status(500).json({ error: "Internal Server Error" });
		  }
  
		  console.log('Fetched reviews from the database:', result);
  
		  const reviews = result.map((row) => ({
			gameID: row.gameID,

		  }));
  
		  console.log('Extracted reviews:', reviews);
  
		  res.json(reviews);
		}
	  );
	} catch (error) {
	  console.error("Unexpected error:", error);
	  res.status(500).json({ error: "Internal Server Error" });
	}
  });

  app.post('/addForum', async (req, res) => {
	const userID = req.body.user;
	const gameID = req.body.game;
	const title = req.body.title;
	const text = req.body.text;
	const username = req.body.username; 
	
	db.query(
	  'INSERT INTO Forum (userID, userName, gameID, title, text) VALUES (?, ?, ?, ?, ?)',
	  [userID, username, gameID, title, text],
	  (error, result) => {
		if (error) {
		  console.error('Error adding forum post:', error);
  
		  if (error.code === 'ER_DUP_ENTRY') {
			return res.status(400).json({ error: 'Duplicate entry for user and game' });
		  } else {
			return res.status(500).json({ error: 'Internal Server Error' });
		  }
		}
  
		const insertedPost = {
		  post_id: result.insertId,
		  username: username, 
		  user_id: userID,
		  game_id: gameID,
		  title: title,
		  text: text,
		  created_at: new Date(),
		};
  
		res.json(insertedPost);
	  }
	);
  });

  app.post('/addComments', async (req, res) => {
	const userID = req.body.user;
	const picture = req.body.picture;
	const username = req.body.username;
	const text = req.body.text;
	const postID = req.body.post;
  
	db.query(
	  'INSERT INTO Comments (postID, picture, userID, username, text) VALUES (?, ?, ?, ?, ?)',
	  [postID, picture, userID, username, text],
	  (error, result) => {
		if (error) {
		  console.error('Error adding comments:', error);
  
		  if (error.code === 'ER_DUP_ENTRY') {
			return res.status(400).json({ error: 'Duplicate entry for user and game' });
		  } else {
			return res.status(500).json({ error: 'Internal Server Error' });
		  }
		}
  
		const insertedComment = {
		  comment_id: result.insertId, 
		  picture: picture,
		  post_id: postID,
		  username: username,
		  user_id: userID,
		  text: text,
		  created_at: new Date(),
		};
  
		res.json(insertedComment);
	  }
	);
  });

  app.get('/getComments/:postID', async (req, res) => {
	const postID = req.params.postID;
  
	db.query(
	  'SELECT * FROM Comments WHERE postID = ?',
	  [postID],
	  (error, results) => {
		if (error) {
		  console.error('Error getting comments:', error);
		  return res.status(500).json({ error: 'Internal Server Error' });
		}
  
		res.json(results);
	  }
	);
  });

  app.get('/getForumPosts', async (req, res) => {
	try {
	  const { gameID } = req.query;
  
	  if (!gameID) {
		return res.status(400).json({ error: "Missing gameID parameter" });
	  }
  
	  console.log('Received gameID:', gameID);
  
	  db.query("SELECT * FROM Forum WHERE gameID = ?", [gameID], (error, result) => {
		if (error) {
		  console.error("Error fetching forum posts:", error);
		  return res.status(500).json({ error: "Internal Server Error" });
		}
  
		console.log("Fetched forum posts:", result); 
  
		res.json(result);
	  });
	} catch (error) {
	  console.error("Unexpected error:", error);
	  res.status(500).json({ error: "Internal Server Error" });
	}
  });

  app.get('/getPost/:postID', async (req, res) => {
	try {
	  const { postID } = req.params;
  
	  if (!postID) {
		console.error('Missing postID parameter');
		return res.status(400).json({ error: 'Missing postID parameter' });
	  }
  
	  console.log('Received postID:', postID);
  
	  db.query(
		'SELECT userName, picture, title, text FROM Forum WHERE postID = ?',
		[postID],
		(error, result) => {
		  if (error) {
			console.error('Error fetching posts:', error);
			return res.status(500).json({ error: 'Internal Server Error' });
		  }
  
		  console.log('Fetched Forum posts from the database:', result);
  
		  const post = result[0]; 
		  const postData = {
			userName: post.userName,
			picture: post.picture,
			title: post.title,
			text: post.text,
			};

			res.json(postData);
			
		}
	  );
	} catch (error) {
	  console.error('Unexpected error:', error);
	  res.status(500).json({ error: 'Internal Server Error' });
	}
  });

  const storage = multer.memoryStorage();
  const upload = multer({
	storage: storage,
	limits: {
	   fileSize: 1024 * 1024 * 5,
	},
 });

 app.post('/updateProfilePicture/:userId', upload.single('profilePicture'), (req, res) => {
	const userId = req.params.userId;
	const file = req.file;
 
	if (!file) {
	   return res.status(400).send('No file uploaded.');
	}
 
	
	const query = 'UPDATE users SET picture = ? WHERE user_id = ?';
	db.query(query, [file.buffer, userId], (err, result) => {
	   if (err) {
		  console.error('Error updating profile picture in database:', err);
		  return res.status(500).send('Internal Server Error');
	   }
 
	 
	   res.json({ success: true, picture: `data:image/jpeg;base64,${file.buffer.toString('base64')}` });
	});
 });
 
  
  
  



app.listen(port, () => console.log(`Server listening on port ${port}`));
