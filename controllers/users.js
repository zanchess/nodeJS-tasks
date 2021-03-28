import u1 from 'uuid';
import { getUsers, mainPage } from '../services/users';

const getMainPage = (res, req) => {
  const message = mainPage();

  res.status(200);
  res.send(message);
};

const getUsersHandler = (res, req) => {
  const users = getUsers();
  console.log(req.query);
  res.send(JSON.stringify(users));
};

export default {
  getUsersHandler,
  getMainPage,
};
