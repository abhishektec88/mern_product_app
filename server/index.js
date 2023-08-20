/* eslint-disable no-undef */
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const bcrypt = require('bcryptjs')
const fs = require('fs');
const cors = require('cors');

const app = express()
app.use('/', express.static(path.join(__dirname, 'static')))
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(express.json());
app.use(cors({
    origin: '*'
}));


const usersFilePath = 'users.json';

const middleWare = (req, res, next) => {
	const { username } = req.body;
  
	if (!username) {
	  return res.status(400).json({ message: 'Username and password are required.' });
	}
  
	const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf8'));
	const user = users.find(user => user.username === username);

	if (!user) {
	  return res.status(401).json({ message: 'Invalid credentials.' });
	}

	if(!username) {
		return res.status(401).json({ message: 'Invalid credentials.' });
	}
	next();
};


app.post('/api/register', (req, res) => {
	const { username, password } = req.body;
  
	if (!username || !password) {
	  return res.status(400).json({ message: 'Username and password are required.' });
	}
  
	const hashedPassword = bcrypt.hashSync(password, 10);
	const newUser = { username, password: hashedPassword };
  
	let users = [];
	if (fs.existsSync(usersFilePath)) {
	  users = JSON.parse(fs.readFileSync(usersFilePath, 'utf8'));
	}
  
	const existingUser = users.find(user => user.username === username);
	if (existingUser) {
	  return res.status(409).json({ message: 'Username already exists.' });
	}
  
	users.push(newUser);
	fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
  
	res.status(201).json({ message: 'Registration successful.' });
  });


  
  app.post('/api/login', (req, res) => {
	const { username, password } = req.body;
  
	if (!username || !password) {
	  return res.status(400).json({ message: 'Username and password are required.' });
	}
  
	const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf8'));
	const user = users.find(user => user.username === username);
  
	if (!user || !bcrypt.compareSync(password, user.password)) {
	  return res.status(401).json({ message: 'Invalid credentials.' });
	}
  
	res.status(200).json({status: 'ok' , message: 'Login successful.', data: user });
  });


  
  app.post('/api/product', (req, res) => {
	const rawData = fs.readFileSync('data.json');
	const data = JSON.parse(rawData);
	res.json(data);
  });

  app.post('/api/total', middleWare, (req, res) => {
	const rawData = fs.readFileSync('data.json');
	const data = JSON.parse(rawData);
	const totalAmount = data.reduce((total, item) => total + item.amount, 0);
	res.json(totalAmount);
  });


app.listen(9999, () => {
	console.log('Server running at 9999')
})