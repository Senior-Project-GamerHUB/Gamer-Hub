const express = require('express');
const path = require('path');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const fetch = require(`node-fetch`);
const mysql = require('mysql2');
const passport = require('passport');
const session = require('express-session');
const passportSteam = require('passport-steam');
const SteamStrategy = passportSteam.Strategy;

const port = process.env.PORT || 8080;
key = '6FDE1CAA90BAA7010C02DF447AF228BE';
// connect to db


function SteamGameData(appid){
	(async () => {
		const response = await fetch(`https://store.steampowered.com/api/appdetails?appids=${appid}&l=english`)
		const data = await response.json();
		console.log(`Name: ${data[String(appid)].data.name}`);
		console.log(`Description: ${data[String(appid)].data.about_the_game}`);
		console.log(`Spec: ${data[String(appid)].data.pc_requirements}`);
		console.log(`Price: ${data[String(appid)].data.price_overview.final_formatted}`);
		console.log(`User Score: ${data[String(appid)].data.metacritic.score}`);
		console.log(`Screenshots: ${data[String(appid)].data.screenshots}`);
		console.log(`Videos: ${data[String(appid)].data.movies}`);
		console.log(`Release date: ${data[String(appid)].data.release_date.date}`);
	})();
}

function SteamReviewData(appid){
	(async () => {
		const response = await fetch(`https://store.steampowered.com/appreviews/${appid}?json=1`)
		const data = await response.json();
		//console.log(data);
		//from 0-19 as of right now
		console.log(`Summary: ${data["query_summary"]}`);
		for (var i = 0; i < 20; i++){
			console.log(`Author: ${data["reviews"][i].author.steamid}`);
			console.log(`Review: ${data["reviews"][i].review}`);
			console.log(`Score: ${data["reviews"][i].weighted_vote_score}`);
			console.log(`Votes Up: ${data["reviews"][i].votes_up}`);
			console.log(`If Purchase: ${data["reviews"][i].steam_purchase}`);
		}
	})();
}

function SteamAccountName(steamid)
{
	(async () => {
		// steamids=${steamid} change it after testing
		const response = await fetch(`https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=${key}&steamids=${steamid}`);
		const data = await response.json();
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
app.use(cors());
app.use(session({
	secret: 'Whatever_You_Want',
	saveUninitialized: true,
	resave: false,
	cookie: {
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

// signup data into mysql
app.post('/signup',(req, res)=>{
	const dbsql = "INSERT INTO users (name, username, email, password) VALUES(?)";
	const values = [
		req.body.name,
		req.body.username,
		req.body.email,
		req.body.password
	]
	db.query(dbsql,[values], (err,data)=>{
		if(err){
			return res.json(err)
		}
		return res.json(data);
			console.log("1 record added!");
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

	db.query(dbsql, [req.body.email, req.body.password], (err,data)=>{
		if(err) return res.json(err);
		if(data.length > 0){
			return res.json("Login Successfull")
		}else{
			return res.json("No such Record")
		}
	})
})

app.get('/', async (req, res) => {
	
});

app.get('/SteamLogin', async (req, res) => {
	//res.send(req.user);
	SteamAccountName();
	//res.json({});
});

app.get('/api/auth/steam', passport.authenticate('steam', {failureRedirect: '/'}), function (req, res) {
	res.redirect('/SteamLogin');
   });

app.get('/api/auth/steam/return', passport.authenticate('steam', {failureRedirect: '/'}), function (req, res) {
	res.redirect('/SteamLogin');
   });

app.get('/getGameInfo', async (req, res) => {
	// SteamGameData();
	// const game = await db.all(`SELECT * FROM Game_Catalog`)
	// res.json({game});
});

app.get('/getSteamReview', async (req, res) => {
	SteamReviewData(220);
	// const game = await db.all(`SELECT * FROM Review`);
	// res.json({game});
});

app.get('/getSteamList', async (req, res) => {
	(async () => {
		const response = await fetch(`http://api.steampowered.com/ISteamApps/GetAppList/v0002/?key=${key}&format=json`);
		const data = await response.json();
		index = data["applist"]["apps"].map(function(e) {return e.name;}).indexOf('ELDEN RING');
		res.send(data["applist"]["apps"][index]);
		appid = data["applist"]["apps"][index]["appid"];
		SteamGameData(appid);
	})();
});

app.post('/addNewGame', async (req, res) => {
	// SteamGameData();
	// await db.get(`INSERT INTO Game_Catalog (Name, Image, Description, Game_Info, Video, User_Rating, Price)
	// VALUES (?, ?, ?, ?, ?, ?, ?)` (req.body.data.name, req.body.data.screenshots, req.body.data.about_the_game, req.body.data.pc_requirements, req.body.data.movies, req.body.data.metacritic.score, req.body.data.price_overview.final_formatted));
	res.json({});
});

app.post('/addReview', async (req, res) => {
	//await db.get(`INSERT INTO Review (Rating, Text, gameID, userID, date)
	//VALUES (?, ?, ?, ?, ?)` (req.body.author, req.body.review, req.body.weighted_vote_score));
});

app.post('/addForum', async (req, res) => {
	res.json({});
});


app.listen(port, () => console.log(`Server listening on port ${port}`));
