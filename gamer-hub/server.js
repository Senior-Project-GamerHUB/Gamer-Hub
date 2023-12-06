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
const multer = require('multer');






const port = process.env.PORT || 8080;
key = '6FDE1CAA90BAA7010C02DF447AF228BE';

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

async function SteamAccountName(steamid)
{
	try{
		const response = await axios.get(`https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=${key}&steamids=${steamid}`);
		const data = await response.data;
		if(data["response"]["players"] != null ){
			const steamAccount = data["response"]["players"];
			return steamAccount;
		} else {
			return null;
		}
	} catch (error) {
		console.error('Error fetching steam account: '. error);
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
	returnURL: 'http://localhost:' + port + '/api/auth/steam/return',
	realm: 'http://localhost:' + port + '/',
	apiKey: '6FDE1CAA90BAA7010C02DF447AF228BE'
	}, function (identifier, profile, done) {
	 process.nextTick(function () {
	  profile.identifier = identifier;
	  return done(null, profile);
	 });
	}
));

// use this for steam sign in <a href="http://localhost:3000/api/auth/steam">Sign in</a>

app = express();
app.use(express.static(path.join(__dirname, 'static')));
app.use(express.json());
app.use(cors({
	origin: 'http://localhost:3000', 
    credentials: true,

}));

app.use(cookieParser());

app.use(bodyParser.urlencoded({extended: true}));

app.use(session({
	key: "userId",
	secret: 'secretKey',
	saveUninitialized: false,
	resave: false,

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





app.get('/', (req, res)=>{

	res.send("SERVER WELCOME")

})

app.get('/loggedIn', (req, res)=>{


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
	console.log(data);
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
			console.log(data);
			const SESS = data[0].user_id;
			console.log("User ID: " + SESS);

			req.session.userId=SESS;
			
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
	res.redirect('http://localhost:3000/profile');
   });

app.get('/api/auth/steam/return', passport.authenticate('steam', {failureRedirect: '/'}), async function (req, res) {
	const data = await SteamAccountName(req.user.id);
	db.query("UPDATE User SET username = ?, picture = ?, steamID = ? WHERE userID = ?", [data[0].personaname, data[0].avatarfull, data[0].steamid, req.session.userId], (error, result) =>{
			
		console.log("error is " + JSON.stringify(error));
		console.log("results are " + result);

		if (JSON.stringify(error).indexOf("steamID_UNIQUE") >0 ){
			console.log('error');
			// return res.send("error");
		}
		else{
			// return res.send("ok");
		}
	})
	res.redirect('http://localhost:3000/profile');
   });

app.post('/getSteamReview', async (req, res) => {
	(async () => {
		const response = await fetch(`http://api.steampowered.com/ISteamApps/GetAppList/v0002/?key=${key}&format=json`);
		const data = await response.json();
		index = data["applist"]["apps"].map(function(e) {return e.name;}).indexOf(JSON.stringify(req.body.game_name));
		res.send(data["applist"]["apps"][index]);
		appid = data["applist"]["apps"][index]["appid"];
		res.send(SteamGameData(appid));
	})();
});

app.post('/addReview', async (req, res) => {
	const userID = req.body.user;
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
	  "INSERT INTO Review (userID, userName, gameID, vote_up_num, review, playtime_hour, playtime_minutes, playtime_seconds, rating, comp_status, difficulty, wtp) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)",
	  [userID, username, gameID, votes, review, playtime_h, playtime_m, playtime_s, rating, comp_status, difficulty, wtp],
	  (error, result) => {
		console.log("error is " + JSON.stringify(error));
		console.log("results are " + result);
  
		if (error) {
		  res.status(500).send("Error inserting review.");
		} else {
		  res.status(200).send("Review inserted successfully.");
		}
	  }
	);
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
			"SELECT userID, userName, review, playtime_hour, playtime_minutes, rating, playtime_seconds, comp_status, difficulty, wtp FROM Review WHERE gameID = ?",
			[gameID],
			(error, result) => {
			if (error) {
				console.error("Error fetching reviews:", error);
				return res.status(500).json({ error: "Internal Server Error" });
			}

			console.log('Fetched reviews from the database:', result);

			const reviews = result.map((row) => ({
				userID: row.userID,
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
	const username = req.body.username;
	const text = req.body.text;
	const postID = req.body.post;
  
	db.query(
	  'INSERT INTO Comments (postID, userID, username, text) VALUES (?, ?, ?, ?)',
	  [postID, userID, username, text],
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
		  comment_id: result.insertId, // Make sure result.insertId is supported by your database driver
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
		'SELECT userName, title, text FROM Forum WHERE postID = ?',
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

  
  
  
  



app.listen(port, () => console.log(`Server listening on port ${port}`));
