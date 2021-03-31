// Addition .env config file
import dotenv from 'dotenv';

// Addition packages in project
import express from 'express';
import cors from 'cors';
import {
  getMainPageHandler,
  getUsersHandler,
  getUserByIdHandler,
  createNewUserHandler,
  updateUserHandler,
  deleteUserHandler,
} from './controllers/users';

dotenv.config();

// Create server
const app = express();
const port = process.env.LOCAL_HOST;
const router = express.Router();

// Middlewears
app.use(cors());
app.use(router);

router.route('/users')
  .get(getUsersHandler)
  .post(createNewUserHandler);

router.route('/users/:id')
  .get(getUserByIdHandler)
  .put(updateUserHandler)
  .delete(deleteUserHandler);

router.route('/')
  .get(getMainPageHandler);

app.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err);
  }
  console.log(`server is listening on ${port} click link \x1b[36m http://localhost:3000 \x1b[0m `);
});
