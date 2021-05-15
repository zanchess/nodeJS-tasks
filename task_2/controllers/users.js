import {
  findUserById,
  getUsers,
  mainPage,
  pushNewUser,
  updateUserInDatabase,
  deleteUser,
} from '../services/users';
import getAutoSuggestUsers from '../utils/get-auto-suggest-users';
import CONFIGS from '../configs/config';

const getMainPageHandler = (req, res) => {
  try {
    const message = mainPage();

    res.status(CONFIGS.ERRORS.OK);
    res.send(message);
  } catch (err) {
    if (!err.statusCode) {
      res.status(CONFIGS.ERRORS.NOT_FOUND);
      res.send({ message: 'Error' });
    }
  }
};

const getUsersHandler = async (req, res) => {
  const { loginSubstring, limit } = req.query;
  if (loginSubstring && limit) {
    const allUsers =  await getUsers();
    const limetedUsersCollection =  await getAutoSuggestUsers(loginSubstring, limit, res.json(allUsers));

    res.status(CONFIGS.ERRORS.OK);
    res.send(limetedUsersCollection);
  } else {
    try {
      const allUsers =  await getUsers();

      await res.status(CONFIGS.ERRORS.OK);
      await res.send(allUsers);
    } catch (err) {
      res.status(CONFIGS.ERRORS.NOT_FOUND);
      res.send(err);
    }

  }
};

const getUserByIdHandler = async (req, res) => {
  const { id } = req.params;

  try {
    const userById =  await findUserById(id);

    await res.status(CONFIGS.ERRORS.OK);
    await res.send(userById);

  } catch (err) {
    res.status(CONFIGS.ERRORS.NOT_FOUND);
    res.json(err);
  }
};

const createNewUserHandler = async (req, res) => {
  const user = req.body;
  try {
    const newUser = await pushNewUser(user);

    await res.status(CONFIGS.ERRORS.OK);
    await res.send(newUser);
  } catch (err) {
    if (!err.statusCode) {
      res.status(CONFIGS.ERRORS.NOT_FOUND);
    }
  }
};

const updateUserHandler = async (req, res) => {
  const user = req.body;
  const { id } = req.params;

  try {
    const updatedUser = await updateUserInDatabase(id, user);
    await console.log(updatedUser);

    await res.status(CONFIGS.ERRORS.OK);
    await res.send({message: 'User was updated'});
  } catch (err) {
    if (!err.statusCode) {
      res.status(CONFIGS.ERRORS.NOT_FOUND);
    }
  }
};

const deleteUserHandler = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedUsers = await deleteUser(id);

    await res.status(CONFIGS.ERRORS.OK);
    await res.send({message: 'User was deleted'});
  } catch (err) {
    if (!err.statusCode) {
      res.status(CONFIGS.ERRORS.NOT_FOUND);
    }
  }
};

export {
  getUsersHandler,
  getMainPageHandler,
  getUserByIdHandler,
  createNewUserHandler,
  updateUserHandler,
  deleteUserHandler,
};
