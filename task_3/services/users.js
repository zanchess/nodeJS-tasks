import  Users from '../model/users';
import logger from '../logging/winstonLogger';


const mainPage = () => {
  const message = 'Main page';

  return { message };
};

const getUsers = () => {
  logger.info('Service: executing getUsers');
  return  Users.findAll();
};

const findUserById = (id) => {
  logger.info(`Service: executing findUserById(id = ${id})`);
  return Users.findByPk(id);
};

const pushNewUser = (user) => {
  logger.info(`Service: executing pushNewUser(group = ${JSON.stringify(user)})`);
  return  Users.create({...user});
};

const updateUserInDatabase = (id, user) => {
  logger.info(`Service: executing updateUser(id = ${id}, group = ${JSON.stringify(user)})`);
  return Users.update(user, { where: { id } });
};

const deleteUser = (id) => {
  logger.info(`Service: executing deleteUser(groupId = ${id}, usersId = ${userIds})`);
  return  Users.update({ is_deleted: true }, { where: { id } });
};

export {
  getUsers,
  mainPage,
  findUserById,
  pushNewUser,
  updateUserInDatabase,
  deleteUser,
};
