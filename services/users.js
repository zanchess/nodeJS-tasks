import db from './db';

const getUsers = () => {
  const { users } = db;
  return users;
};

const mainPage = () => {
  const message = 'Main page';

  return message;
};

export {
  getUsers,
  mainPage,
};
