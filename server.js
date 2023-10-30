const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3');
const { open } = require('sqlite');
const cors = require('cors');
var bcrypt = require('bcryptjs');
const fetch = require(`node-fetch`);

PORT=8080;

// connect to db
let db;
(async () => {
	db = await open({
		filename: 'data.sqlite',
		driver: sqlite3.Database
	});
})();

function SteamGameData(appid){
	(async () => {
		const response = await fetch("https://store.steampowered.com/api/appdetails?appids=220")
		const data = await response.json();
		console.log(data["220"].data.name);
		console.log(data["220"].data.about_the_game);
		console.log(data["220"].data.pc_requirements);
		console.log(data["220"].data.price_overview.final_formatted);
		console.log(data["220"].data.metacritic.score);
		console.log(data["220"].data.screenshots);
		console.log(data["220"].data.movies);
		console.log(data["220"].data.release_date.date);
	})();
}

function SteamReviewData(appid){
	(async () => {
		const response = await fetch("https://store.steampowered.com/appreviews/220?json=1")
		const data = await response.json();
		//console.log(data);
		//from 0-19 as of right now
		console.log(data["reviews"][0]);
		console.log(data["reviews"][0].author);
		console.log(data["reviews"][0].review);
		console.log(data["reviews"][0].weighted_vote_score);
		console.log(data["reviews"][0].votes_up);
		console.log(data["reviews"][0].steam_purchase);
	})();
}

// Needs api key from steam
function SteamAccountName(steamid)
{
	(async () => {
		const response = await fetch("https://partner.steam-api.com/ISteamUser/GetPlayerSummaries/v2/")
		const data = await response.json();
		console.log(data);
	})();
}

app = express();
app.use(express.static(path.join(__dirname, 'static')));
app.use(express.json());
app.use(cors());

app.get('/', async (req, res) => {
	SteamAccountName();
	res.json({});
});

app.get('/getGameInfo', async (req, res) => {
	// SteamGameData();
	// const game = await db.all(`SELECT * FROM Game_Catalog`)
	// res.json({game});
});

app.get('/getSteamReview', async (req, res) => {
	SteamReviewData();
	// const game = await db.all(`SELECT * FROM Review`)
	// res.json({game});
});

app.post('/addNewUser', async (req, res) => {
	let hash = await bcrypt.hash(req.body.password, 10);
	
});

app.post('/loginUser', async (req, res) => {
	let compare = await bcrypt.compare(req.body.password, hash);
	res.render('passwordResult', {
		password: req.body.password,
		hash: hash,
		compare: compare
	});
	// res.json({});
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

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
