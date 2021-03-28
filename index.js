// Addition .env config file
import dotenv from 'dotenv';

// Addition packages in project
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mainPageHandler from './handlers/main-page';
import getUsersHandler from './handlers/get-users';

dotenv.config();

// Addition database
const db = require('./db/db');

// classes
const User = require('./utils/createUser');

// Create server
const app = express();
const port = process.env.LOCAL_HOST;

// Middlewears
app.use('/users', bodyParser.json());
app.use(cors());

// GET requests
app.get('/', mainPageHandler);

app.get('/users', getUsersHandler);

app.get('/users/:id', (req, res) => {
  const { id } = req.params;

  console.log(`id: ${id}`);

  const userObject = db.users.find((user) => user.id === id && !user.isDeleted);
  res.send(JSON.stringify(userObject));
});

// POST requests
app.post('/users', (req, res) => {
  const { login, password, age } = req.body;
  if (db.users.some((user) => user.login === login && !user.isDeleted)) {
    res.send('This user already created');
  } else if (db.users.some((user) => user.login === login && user.isDeleted)) {
    res.send('This user already was deleted');
  } else {
    const newUser = new User(login, password, age);
    db.users.push(newUser);
    res.send(db.users);
  }
});

// PUT requests
app.put('/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  console.log(id);
});

/* app.put('/users/:id', , (req, res) => {
  if (req.userData.role === 'superadmin') {
    const id = req.userData.userId;
    User.findOneAndUpdate({ _id: id }, { $set: req.body }, { new: true }, (err, doc) => {
      if (err) return res.send(err.message);
      if (doc) return res.send(doc);
    });
  } else {

  }
}); */

app.delete('/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  console.log(id);
});

app.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err);
  }
  console.log(`server is listening on ${port} click link \x1b[36m http://localhost:3000 \x1b[0m `);
});
