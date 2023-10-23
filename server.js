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

function SteamData(appid){
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
app = express();
app.use(express.static(path.join(__dirname, 'static')));
app.use(express.json());
app.use(cors());

app.get('/', async (req, res) => {
	res.json({});
});

app.get('/getGameInfo', async (req, res) => {
	SteamData();
	// const game = await db.all(`SELECT * FROM Game_Catalog`)
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
	res.json({});
});

app.post('/addReview', async (req, res) => {
	res.json({});
});

app.post('/addForum', async (req, res) => {
	res.json({});
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
