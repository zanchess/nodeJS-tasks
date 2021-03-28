import { findUserById, getUsers, mainPage, pushNewUser } from '../services/users';

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

export {
  getUsersHandler,
  getMainPageHandler,
  getUserById,
  createNewUser,
};
