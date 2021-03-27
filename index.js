require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { v1: uuidv1 } = require('uuid');

const app = express();

const port = process.env.LOCAL_HOST;

const db = {
  users: [
    {
      id: uuidv1(),
      login: 'Alex',
      password: 'qwerty',
      age: '23',
      isDeleted: false,
    },
    {
      id: uuidv1(),
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

app.get('/users/:id', (req, res) => {
  const { id } = req.params;

  console.log(`id: ${id}`);

  const userObject = db.users.find((user) => user.id === id && !user.isDeleted);
  res.send(JSON.stringify(userObject));
});

app.post('/users', (req, res) => {
  const newUserBody = req.body;
  if (db.users.some((user) => user.login === newUserBody.login)) {
    res.send('This user already created');
  } else {
    const newUser = {
      id: uuidv1(),
      ...newUserBody,
    };
    res.send(newUser);
  }
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
