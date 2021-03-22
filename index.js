/* eslint-disable consistent-return */
require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

const port = process.env.LOCAL_HOST;

const db = {
  users: [
    {
      id: 1,
      login: 'Alex',
      password: 'qwerty',
      age: '23',
      isDeleted: false,
    },
    {
      id: 2,
      login: 'Neal',
      password: '12345678',
      age: '30',
      isDeleted: false,
    },
  ],
};

app.use('/users', bodyParser.json());
app.use(cors());

app.get('/', (request, response) => {
  response.send('Hello from Express!');
});

app.get('/users', (request, response) => {
  response.send(JSON.stringify(db.users));
  console.log('111');
});

app.post('/users', (req, res, next) => {
  console.log(req.body);
});

app.put('/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  console.log(id);
});

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
