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
import {
  getGroupsHandler,
  getGroupByIdHandler,
  createNewGroupHandler,
  updateGroupHandler,
  deleteGroupHandler
} from './task_3/controllers/group';
import sequelize from './task_3/data-access/db'

dotenv.config();

// Create server
const app = express();
const port = process.env.LOCAL_HOST || 3001;
const router = express.Router();

// Middlewears
app.use(router);
app.use( bodyParser.json() );
router.use(cors());
router.use((req, res, next) => {
  res.header('Content-Type', 'application/json');
  next();
});

// Route handling for users
router.route('/users')
  .get(getUsersHandler)
  .post(createNewUserHandler);

router.route('/users/:id')
  .get(getUserByIdHandler)
  .put(updateUserHandler)
  .delete(deleteUserHandler);

// Route handling for groups
router.route('/groups')
  .get(getGroupsHandler)
  .post(createNewGroupHandler);

router.route('/groups/:id')
  .get(getGroupByIdHandler)
  .put(updateGroupHandler)
  .delete(deleteGroupHandler);

router.route('/')
  .get(getMainPageHandler);

sequelize.sync({ force: true }).then(() => {
  app.listen(port, (err) => {
    if (err) {
      return console.log('something bad happened', err);
    }
    return console.log(`server is listening on ${port} click link: \x1b[36m http://localhost:${port} \x1b[0m `);
  });
})


