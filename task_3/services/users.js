import User from '../utils/createUser';
import db from './db';
import getAutoSuggestUsers from '../utils/get-auto-suggest-users';

const getUsers = () => {
  const { users } = db;
  return users;
};

const mainPage = () => {
  const message = 'Main page';

  return { message };
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
    return { message: 'This user already created' };
  }
  if (users.some((user) => user.login === login && user.isDeleted)) {
    return { message: 'This user already was deleted' };
  }
  const newUser = new User(login, password, age);
  users.push(newUser);

  return users;
};

const updateUserInDatabase = (id, login, password, age) => {
  const { users } = db;
  if (users.some((user) => user.id === id && !user.isDeleted)) {
    const index = users.indexOf(users.find((user) => user.id === id));

    const newUser = new User(id, login, password, age);
    users[index] = newUser;
    return users;
  }
  return { message: 'Users not found or was deleted' };
};

const setDeletedUser = (id) => {
  const { users } = db;
  if (users.some((user) => user.id === id && !user.isDeleted)) {
    const user = users.find((item) => item.id === id);
    user.isDeleted = true;
    return users;
  }
  return { message: 'Users not found or was deleted' };
};

const getSortAndLimitUsers = (substr, limit) => {
  const { users } = db;
  const limetedUsersCollection = getAutoSuggestUsers(substr, limit, users);

  return limetedUsersCollection;
};

export {
  getUsers,
  mainPage,
  findUserById,
  pushNewUser,
  updateUserInDatabase,
  setDeletedUser,
  getSortAndLimitUsers,
};
