import jwt from 'jsonwebtoken';
import {
  findUserById,
  getUsers,
  mainPage,
  pushNewUser,
  updateUserInDatabase,
  deleteUser,
  authenticate,
} from '../services/users';
import getAutoSuggestUsers from '../utils/get-auto-suggest-users';
import CONFIGS from '../configs/config';

const getMainPageHandler = (req, res, next) => {
  try {
    const message = mainPage();

    res.status(CONFIGS.ERRORS.OK);
    res.send(message);
  } catch (err) {
    err.customErrorMessage = 'Couldn\'t retrieve main page';
    return next(err);
  }
};

const getUsersHandler = async (req, res, next) => {
  const { loginSubstring, limit } = req.query;
  if (loginSubstring && limit) {
    const allUsers = await getUsers();
    const limetedUsersCollection = await getAutoSuggestUsers(loginSubstring, limit, res.json(allUsers));

    res.status(CONFIGS.ERRORS.OK);
    res.send(limetedUsersCollection);
  } else {
    try {
      const allUsers = await getUsers();

      await res.status(CONFIGS.ERRORS.OK);
      await res.send(allUsers);
    } catch (err) {
      err.customErrorMessage = 'Couldn\'t retrieve Users';
      return next(err);
    }
  }
};

const getUserByIdHandler = async (req, res, next) => {
  const { id } = req.params;

  try {
    const userById = await findUserById(id);

    await res.status(CONFIGS.ERRORS.OK);
    await res.send(userById);
  } catch (err) {
    err.customErrorMessage = `User with id ${id} not found`;
    return next(err);
  }
};

const createNewUserHandler = async (req, res, next) => {
  const user = req.body;
  try {
    const newUser = await pushNewUser(user);
    console.log(newUser);

    await res.status(CONFIGS.ERRORS.OK);
    await res.send(newUser);
  } catch (err) {
    err.customErrorMessage = 'User wasn\'t created';
    return next(err);
  }
};

const updateUserHandler = async (req, res, next) => {
  const user = req.body;
  const { id } = req.params;

  try {
    await updateUserInDatabase(id, user);

    await res.status(CONFIGS.ERRORS.OK);
    await res.send({ message: 'User was updated' });
  } catch (err) {
    if (!err.statusCode) {
      err.customErrorMessage = `User with id ${id} not found`;
      return next(err);
    }
  }
};

const deleteUserHandler = async (req, res, next) => {
  const { id } = req.params;

  try {
    await deleteUser(id);

    await res.status(CONFIGS.ERRORS.OK);
    await res.send({ message: 'User was deleted' });
  } catch (err) {
    err.customErrorMessage = `User with id ${id} was not deleted`;
    return next(err);
  }
};

const loginHandler = async (req, res, next) => {
  const { login, password } = req.body;
  try {
    const user = await authenticate(login, password);
    console.log(user);
    if (user) {
      const accessToken = jwt.sign(user, CONFIGS.JWT_SECRET, { expiresIn: 60 * 60 });
      res.json(`Bearer ${accessToken}`);
    } else {
      res.status(401).send();
    }
  } catch (err) {
    err.customErrorMessage = 'User couldn\'t be found';
    return next(err);
  }
};

export {
  getUsersHandler,
  getMainPageHandler,
  getUserByIdHandler,
  createNewUserHandler,
  updateUserHandler,
  deleteUserHandler,
  loginHandler,
};
