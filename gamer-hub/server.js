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

function SteamAccountName(steamid)
{
	(async () => {
		// steamids=${steamid} change it after testing
		const response = await axios.get(`https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=${key}&steamids=${steamid}`);
		const data = await response.data;
		console.log(data["response"]["players"]);
	})();
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
	const email = req.body.email;
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
	
			else{
				return res.send("ok");
			}
	
		})
	
		


})






// login checker to database
app.post('/login', (req, res)=>{

	// let compare = await bcrypt.compare(req.body.password, hash);
	// res.render('passwordResult', {
	// 	password: req.body.password,
	// 	hash: hash,
	// 	compare: compare
	// });
	
	
	const dbsql = "SELECT * FROM users WHERE email = ? AND password = ?";
	const values = [
		req.body.email,
		req.body.password
	]


	db.query(dbsql, [req.body.email, req.body.password], async(err,data)=>{
		if(err) return res.json(err);

		if(data.length > 0){
			console.log(data);
			const SESS = data[0].user_id;
			console.log("User ID: " + SESS);

			req.session.userId=SESS;
			
			console.log("Session ID: " + req.session.userId);




		//let compare = await bcrypt.compare(JSON.stringify(req.body.password), data[0].password);
		//if(compare === true){
			return res.json("Login Successfull")

		}else{
			return res.json("No such Record")
		}
	})
})


app.get('/login', (req, res)=>{

})



app.get('/game/:appid', async (req, res) => {
	const appid = req.params.appid;
	const gameData = await SteamGameData2(appid);
  
	if (gameData) {
	  res.json(gameData);
	} else {
	  res.status(404).json({ error: 'Game not found' });
	}
  });



app.get('/', async (req, res) => {

});


app.get('/api/auth/steam', passport.authenticate('steam', {failureRedirect: '/'}), function (req, res) {
	res.redirect('http://localhost:3000/home');
   });

app.get('/api/auth/steam/return', passport.authenticate('steam', {failureRedirect: '/'}), function (req, res) {
	console.log(req.user.id);
	res.redirect('http://localhost:3000/home');
   });

// app.get('/getReview', async (req, res) => {
// 	res.send(await SteamGameReview(220));
// });

app.get('/getSteamReview', async (req, res) => {
	(async () => {
		const response = await fetch(`http://api.steampowered.com/ISteamApps/GetAppList/v0002/?key=${key}&format=json`);
		const data = await response.json();
		index = data["applist"]["apps"].map(function(e) {return e.name;}).indexOf(JSON.stringify(req.body.game_name));
		res.send(data["applist"]["apps"][index]);
		appid = data["applist"]["apps"][index]["appid"];
		res.send(SteamGameData(appid));
	})();
});

app.post('/addNewGame', async (req, res) => {
	// SteamGameData();
	// await db.get(`INSERT INTO Game_Catalog (Name, Image, Description, Game_Info, Video, User_Rating, Price)
	// VALUES (?, ?, ?, ?, ?, ?, ?)` (req.body.data.name, req.body.data.screenshots, req.body.data.about_the_game, req.body.data.pc_requirements, req.body.data.movies, req.body.data.metacritic.score, req.body.data.price_overview.final_formatted));
	res.json({});
});

app.post('/addReview', async (req, res) => {
	const userID =req.body.user;
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

	db.query( "INSERT INTO Review (userID, gameID, vote_up_num, review, playtime_hour, playtime_minutes, playtime_seconds, rating, comp_status, difficulty, wtp) VALUES(?,?,?,?,?,?,?,?,?,?,?)", 
	[userID, gameID, votes, review, playtime_h, playtime_m, playtime_s, rating, comp_status, difficulty, wtp], (error, result) =>{
			
			console.log("error is " + JSON.stringify(error));
			console.log("results are " + result);

			// if (JSON.stringify(error).indexOf("username_UNIQUE") >0 ){
			// 	return res.send("error");
	
			// }

			// else if (JSON.stringify(error).indexOf("email_UNIQUE") >0 ){
			// 	return res.send("error2");
	
			// }
	
			// else{
			// 	return res.send("ok");
			// }
	
		})
});

app.post('/addForum', async (req, res) => {
	const userID = req.body.user;
	const gameID = req.body.game;
	const title = req.body.title;
	const text = req.body.text;
	const picture = req.body.picture;

	db.query( "INSERT INTO Fourm (userID, gameID, title, text, picture) VALUES(?,?,?,?)", [userID, gameID, title, text, picture], (error, result) =>{
			
			console.log("error is " + JSON.stringify(error));
			console.log("results are " + result);
			
			// if (JSON.stringify(error).indexOf("username_UNIQUE") >0 ){
			// 	return res.send("error");
	  
			// }

			// else if (JSON.stringify(error).indexOf("email_UNIQUE") >0 ){
			// 	return res.send("error2");
	
			// }
	
			// else{
			// 	return res.send("ok");
			// }
	
		})
});


app.listen(port, () => console.log(`Server listening on port ${port}`));
