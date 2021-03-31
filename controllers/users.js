import {
  findUserById,
  getUsers,
  mainPage,
  pushNewUser,
  updateUserInDatabase,
  setDeletedUser,
  getAutoSuggestUsers,
} from '../services/users';

const getMainPageHandler = (req, res) => {
  const message = mainPage();
  res.status(200);
  res.send(message);
};

const getUsersHandler = (req, res) => {
  const { loginSubstring, limit } = req.query;

  if (loginSubstring && limit) {
    const limitedUsers = getAutoSuggestUsers(loginSubstring, limit);

    res.status(200);
    res.send(limitedUsers);
  }
  const users = getUsers();
  res.status(200);
  res.send(JSON.stringify(users));
};

const getUserByIdHandler = (req, res) => {
  const { id } = req.params;
  const userInfo = findUserById(id);

  res.status(200);
  res.send(JSON.stringify(userInfo));
};

const createNewUserHandler = (req, res) => {
  const users = pushNewUser(req.body);

  res.status(200);
  res.send(JSON.stringify(users));
};

const updateUserHandler = (req, res) => {
  const { id } = req.params;
  const { login, password, age } = req.body;

  const users = updateUserInDatabase(id, login, password, age);
  res.status(200);
  res.send(JSON.stringify(users));
};

const deleteUserHandler = (req, res) => {
  const { id } = req.params;
  const updatedUsers = setDeletedUser(id);

  res.status(200);
  res.send(JSON.stringify(updatedUsers));
};

export {
  getUsersHandler,
  getMainPageHandler,
  getUserByIdHandler,
  createNewUserHandler,
  updateUserHandler,
  deleteUserHandler,
};
