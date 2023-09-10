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

app.get('', async (req, res) => {
	res.json({});
});

app.post('', async (req, res) => {
	res.json({});
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
