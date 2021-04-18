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
  return Users.update(user, { where: { id } });
};

const deleteUser = (id) => {
  return  Users.update({ is_deleted: true }, { where: { id } });
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
  deleteUser,
  getSortAndLimitUsers,
};
