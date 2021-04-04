import userSchema from '../schemas/validation';
import {
  findUserById,
  getUsers,
  mainPage,
  pushNewUser,
  updateUserInDatabase,
  setDeletedUser,
  getSortAndLimitUsers,
} from '../services/users';

const getMainPageHandler = (req, res) => {
  try {
    const message = mainPage();

    res.status(200);
    res.send(message);
  } catch (err) {
    if (!err.statusCode) {
      res.status(500);
      res.send(JSON.stringify(JSON.stringify({ message: 'Error' })));
    }
  }
};

const getUsersHandler = (req, res) => {
  const { loginSubstring, limit } = req.query;

  try {
    if (loginSubstring && limit) {
      const limetedUsersCollection = getSortAndLimitUsers(loginSubstring, limit);

      res.status(200);
      res.send(JSON.stringify(limetedUsersCollection));
    } else {
      const users = getUsers();
      res.status(200);
      res.send(JSON.stringify(users));
    }
  } catch (err) {
    if (!err.statusCode) {
      res.status(500);
      res.send(JSON.stringify(JSON.stringify({ message: 'Error' })));
    }
  }
};

const getUserByIdHandler = (req, res) => {
  const { id } = req.params;

  try {
    const userInfo = findUserById(id);

    res.status(200);
    res.send(JSON.stringify(userInfo));
  } catch (err) {
    if (!err.statusCode) {
      res.status(500);
      res.send(JSON.stringify(JSON.stringify({ message: 'Error' })));
    }
  }
};

const createNewUserHandler = async (req, res) => {
  const { login, password, age } = req.body;

  try {
    await userSchema.validateAsync({ login, password, age });
    const users = pushNewUser(login, password, age);

    res.status(200);
    res.send(JSON.stringify(users));
  } catch (err) {
    if (!err.statusCode) {
      res.status(500);
      res.send(JSON.stringify(JSON.stringify({ message: 'Error' })));
    }
  }
};

const updateUserHandler = async (req, res) => {
  const { id } = req.params;
  const { login, password, age } = req.body;

  try {
    await userSchema.validateAsync({ login, password, age });
    const users = updateUserInDatabase(id, login, password, age);

    res.status(200);
    res.send(JSON.stringify(users));
  } catch (err) {
    if (!err.statusCode) {
      res.status(500);
      res.send(JSON.stringify(JSON.stringify({ message: 'Error' })));
    }
  }
};

const deleteUserHandler = (req, res) => {
  const { id } = req.params;

  try {
    const updatedUsers = setDeletedUser(id);

    res.status(200);
    res.send(JSON.stringify(updatedUsers));
  } catch (err) {
    if (!err.statusCode) {
      res.status(500);
      res.send(JSON.stringify(JSON.stringify({ message: 'Error' })));
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
