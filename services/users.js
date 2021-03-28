import User from '../utils/createUser';
import db from './db';

const getUsers = () => {
  const { users } = db;
  return users;
};

const mainPage = () => {
  const message = 'Main page';

  return message;
};

const findUserById = (id) => {
  const { users } = db;
  const userInfoById = users.find((user) => user.id === id && !user.isDeleted);

  return userInfoById;
};

const pushNewUser = (body) => {
  const { login, password, age } = body;
  const { users } = db;

  if (users.some((user) => user.login === login && !user.isDeleted)) {
    return 'This user already created';
  }
  if (users.some((user) => user.login === login && user.isDeleted)) {
    return 'This user already was deleted';
  }
  const newUser = new User(login, password, age);
  users.push(newUser);

  return users;
};

export {
  getUsers,
  mainPage,
  findUserById,
  pushNewUser,
};
