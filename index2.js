const express = require("express");
const faker = require("faker");
const bodyParser = require("body-parser");
const app = express();

// app.get('/', function (req, res) {
// 	res.send('hello world')
// })

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