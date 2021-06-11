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
  loginHandler,
} from './task_3/controllers/users';
import {
  getGroupsHandler,
  getGroupByIdHandler,
  createNewGroupHandler,
  updateGroupHandler,
  deleteGroupHandler,
  addUserToGroupHandler,
} from './task_3/controllers/group';
import sequelize from './task_3/data-access/db';
import logger from './task_3/logging/winstonLogger';
import errorHandler from './task_3/middleware/errorHandling/errorHandling';
import loggerMiddleweare from './task_3/middleware/logging/logging-middleware';
import authMiddleware from './task_3/middleware/authenticate/auth-middleware';

dotenv.config();

// Create server
const app = express();
const port = process.env.LOCAL_HOST || 3001;
const router = express.Router();

// Middlewears
app.use(loggerMiddleweare);
app.use(authMiddleware);
app.use(bodyParser.json());
app.use(cors());
app.use(router);
app.use(errorHandler);
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

router.route('/groups/:groupId/users')
  .put(addUserToGroupHandler);

// Route handling for logIn
router.route('/login')
  .post(loginHandler);

router.route('/')
  .get(getMainPageHandler);

sequelize.sync({ force: true }).then(() => {
  app.listen(port, (err) => {
    if (err) {
      logger.error('something bad happened', err.message);
    }
    logger.info(`server is listening on ${port} click link: \x1b[36m http://localhost:${port} \x1b[0m `);
  });
});

process.on('uncaughtException', (error) => {
  logger.error(`uncaughtException occured: ${error.message}`);
  sequelize.destroy();
  process.exit(1);
});

process.on('unhandledRejection', (reason) => {
  logger.warn(`unhandled Promise Rejection occured: ${reason.message}`);
});
