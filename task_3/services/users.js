import User from '../utils/createUser';
import getAutoSuggestUsers from '../utils/get-auto-suggest-users';
import  Users from '../model/users';


const mainPage = () => {
  const message = 'Main page';

  return { message };
};

const getUsers = () => {
  return  Users.findAll();
};

const findUserById = (id) => {
  return Users.findByPk(id);
};

const pushNewUser = (user) => {
  return  Users.create({...user});
};

const updateUserInDatabase = (id, user) => {
  return User.update(user, { where: { id } });
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
