/* eslint-disable consistent-return */
require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const port = process.env.LOCAL_HOST;

const db = {
  users: [
    {
      login: 'Alex',
      password: 'qwerty',
      age: '23',
      isDeleted: false,
    },
  ],
};

app.use('/users', bodyParser.json());

app.get('/', (request, response) => {
  response.send('Hello from Express!');
});

app.get('/users', (request, response) => {
  response.send(JSON.stringify(db.users));
});

app.post('/users', (req, res, next) => {
  console.log(req.body);
});

app.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err);
  }
  console.log(`server is listening on ${port} click link \x1b[36m http://localhost:3000 \x1b[0m `);
});
