// Addition .env config file
import dotenv from 'dotenv';

// Addition packages in project
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import {
  getMainPageHandler,
  getUsersHandler,
  getUserById,
  createNewUser,
  updateUser,
  deleteUser,
} from './controllers/users';

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

// PUT requests
app.put('/users/:id', updateUser);

// DELETE requests
app.delete('/users/:id', deleteUser);

app.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err);
  }
  console.log(`server is listening on ${port} click link \x1b[36m http://localhost:3000 \x1b[0m `);
});
