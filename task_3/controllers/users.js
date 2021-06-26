import jwt from 'jsonwebtoken';
import UserService from '../services/users';
import getAutoSuggestUsers from '../utils/get-auto-suggest-users';
import CONFIGS from '../configs/config';
import Users from '../model/users';

const userService = new UserService(Users);

const getUsersHandler = async (req, res, next) => {
  const { loginSubstring, limit } = req.query;
  if (loginSubstring && limit) {
    const allUsers = await userService.getUsers();
    const limetedUsersCollection = await getAutoSuggestUsers(loginSubstring, limit, res.json(allUsers));

    res.status(CONFIGS.ERRORS.OK);
    res.send(limetedUsersCollection);
  } else {
    try {
      const allUsers = await userService.getUsers();

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
    const userById = await userService.findUserById(id);

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
    const newUser = await userService.pushNewUser(user);

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
    await userService.updateUser(id, user);

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
    await userService.deleteUser(id);

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
    const user = await userService.authenticate(login, password);

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
  getUserByIdHandler,
  createNewUserHandler,
  updateUserHandler,
  deleteUserHandler,
  loginHandler,
  userService,
};
