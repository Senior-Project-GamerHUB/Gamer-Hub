const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3');
const { open } = require('sqlite');
const cors = require('cors');
var bcrypt = require('bcryptjs');

PORT=8080;

// connect to db
let db;
(async () => {
	db = await open({
		filename: 'data.sqlite',
		driver: sqlite3.Database
	});
})();

app = express();
app.use(express.static(path.join(__dirname, 'static')));
app.use(express.json());
app.use(cors());

app.get('/', async (req, res) => {
	const game = await db.all(`SELECT * FROM Game_Catalog`)
	const forum = await db.all(`SELECT * FROM Forum`)
	const review = await db.all(`SELECT * FROM Review`)
	res.json({game, forum, review});
});

// app.get('/getGameInfo', async (req, res) => {
// 	const game = await db.all(`SELECT * FROM Game_Catalog`)
// 	res.json({game});
// });

app.post('/addNewUser', async (req, res) => {
	let hash = await bcrypt.hash(req.body.password, 10);
	db.get(`INSERT INTO User (Username, Email, Password, Account Type)
	VALUES (?, ?, ?, ?)`);
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
	const addGame = req.body.gameRequest;
	db.get(`INSERT INTO Game_Catalog (Name, Image, Description, Game_Info, Video, Price)
	VALUES (?, ?, ?, ?, ?, ?)`);
});

app.post('/addReview', async (req, res) => {
	db.get(`INSERT INTO Review (Rating, Text, gameID, userID, date)
	VALUES (?, ?, ?, ?, ?)`);
	
});

app.post('/addForum', async (req, res) => {
	db.get(`INSERT INTO Forum (Text, Comments, gameID, userID, date)
	VALUES (?, ?, ?, ?, ?)`);
	
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
