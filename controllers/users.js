import {
  findUserById,
  getUsers,
  mainPage,
  pushNewUser,
  updateUserInDatabase,
  setDeletedUser,
} from '../services/users';

const getMainPageHandler = (req, res) => {
  const message = mainPage();
  res.status(200);
  res.send(message);
};

const getUsersHandler = (req, res) => {
  const users = getUsers();
  res.status(200);
  res.send(JSON.stringify(users));
};

const getUserById = (req, res) => {
  const { id } = req.params;
  const userInfo = findUserById(id);

  res.status(200);
  res.send(JSON.stringify(userInfo));
};

const createNewUser = (req, res) => {
  const users = pushNewUser(req.body);

  res.status(200);
  res.send(JSON.stringify(users));
};

const updateUser = (req, res) => {
  const { id } = req.params;
  const { login, password, age } = req.body;

  const users = updateUserInDatabase(id, login, password, age);
  res.status(200);
  res.send(users);
};

const deleteUser = (req, res) => {
  const { id } = req.params;
  const updatedUsers = setDeletedUser(id);

  res.status(200);
  res.send(updatedUsers);
};

export {
  getUsersHandler,
  getMainPageHandler,
  getUserById,
  createNewUser,
  updateUser,
  deleteUser,
};
