// Addition .env config file
import dotenv from 'dotenv';

// Addition packages in project
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { getMainPageHandler, getUsersHandler, getUserById, createNewUser } from './controllers/users';

dotenv.config();

// Create server
const app = express();
const port = process.env.LOCAL_HOST;

// Middlewears
app.use('/users', bodyParser.json());
app.use(cors());

// GET requests
app.get('/', getMainPageHandler);

app.get('/users', getUsersHandler);

app.get('/users/:id', getUserById);

// POST requests
app.post('/users', createNewUser);

/* // PUT requests
app.put('/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  console.log(id);
}); */

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
