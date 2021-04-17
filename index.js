// Addition .env config file
import dotenv from 'dotenv';

// Addition packages in project
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import {
  getMainPageHandler,
  getUsersHandler,
  getUserByIdHandler,
  createNewUserHandler,
  updateUserHandler,
  deleteUserHandler,
} from './task_3/controllers/users';
import orm from './task_3/data-access/db';
dotenv.config();

// Create server
orm.init();
const app = express();
const port = process.env.LOCAL_HOST || 3001;
const router = express.Router();

// Middlewears
app.use(router);
router.use('/users', bodyParser.json());
router.use('/users/:id', bodyParser.json());
router.use(cors());
router.use((req, res, next) => {
  res.header('Content-Type', 'application/json');
  next();
});

// Route handling
router.route('/users')
  .get(getUsersHandler)
  .post(createNewUserHandler);

router.route('/users/:id')
  .get(getUserByIdHandler)
  .put(updateUserHandler)
  .delete(deleteUserHandler);

router.route('/')
  .get(getMainPageHandler);

orm.db.sync().then(() => {
  app.listen(port, (err) => {
    if (err) {
      return console.log('something bad happened', err);
    }
    return console.log(`server is listening on ${port} click link: \x1b[36m http://localhost:${port} \x1b[0m `);
  });
})


