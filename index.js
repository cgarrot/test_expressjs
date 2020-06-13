const express = require("express");
const faker = require("faker");
const bodyParser = require("body-parser");
require('dotenv').config();
const {google} = require('googleapis');
const app = express();

google.youtube('v3').search.list({
	key: process.env.YOUTUBE_TOKEN,
	part: 'snippet',
	q: 'MINECRAFT',
	maxResults: 10,
}).then((reponse) => {
	const {data} = reponse;

	data.items.forEach((item) => {
		console.log("Title: " + item.snippet.title + "\nURL: https://www.youtube.com/watch?v=" + item.id.videoId);
	})
}).catch((err) => console.log(err));

console.log(process.env.YOUTUBE_TOKEN);

const users = [];

for(let i = 0; i < 10; i++) {
	users.push({
		firstname: faker.name.firstName(),
		lastname: faker.name.lastName(),
		email: faker.internet.email()
	})
}

const versionApi = "/api/v1";

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get(versionApi + "/users", (req, res) => {
	res.json({
		data: users
	})
});

app.get(versionApi + "/users/:id", (req, res) => {
	const id = req.params.id - 1;
	res.json({
		data: users[id] || null
	})
});

app.post(versionApi + "/users", (req, res) => {
	const data = req.body;
	users.push(data);
	console.log(data);
	res.json({
		data: users[users.lenght - 1]
	})
});

app.put(versionApi + "/users/:id", (req, res) => {
	const id = req.params.id - 1;
	const data = req.body;
	users[id] = Object.assign(users[id], data);
	res.json({
		data: users[id]
	})
});

app.delete(versionApi + "/users/:id", (req, res) => {
	const id = req.params.id - 1;
	users.splice(id, 1);
	res.sendStatus(200);
});

app.listen(3000, () => console.log("Sur le port 3000"));