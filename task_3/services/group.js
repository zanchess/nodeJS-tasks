import  Groups from '../model/group';
import logger from '../logging/winstonLogger';

const getGroups = () => {
  logger.info('Service: executing getGroups');
  return  Groups.findAll();
};

const findGroupById = (id) => {
  logger.info(`Service: executing findGroupById(id = ${id})`);
  return Groups.findByPk(id);
};

const pushNewGroup = (group) => {
  logger.info(`Service: executing pushNewGroup(group = ${JSON.stringify(group)})`);
  return  Groups.create({...group});
};

const updateGroupInDatabase = (id, group) => {
  logger.info(`Service: executing updateGroup(id = ${id}, group = ${JSON.stringify(group)})`);
  return Groups.update(group, { where: { id } });
};

const deleteGroup = (id) => {
  logger.info(`Service: executing deleteGroup(id = ${id})`);
  return Groups.destroy({ where: { id } });
};

const addUsersToGroup = (id, userIds) => {
  logger.info(`Service: executing addUsersToGroup(groupId = ${id}, usersId = ${userIds})`);
  return  Groups.addUsersToGroup(id, userIds);
}

export {
  getGroups,
  findGroupById,
  pushNewGroup,
  updateGroupInDatabase,
  deleteGroup,
  addUsersToGroup
};
