import logger from '../logging/winstonLogger';
import sequelize from '../data-access/db';
import Groups from '../model/userGroup';

const getGroups = () => {
  logger.info('Service: executing getGroups');
  return Groups.findAll();
};

const findGroupById = (id) => {
  logger.info(`Service: executing findGroupById(id = ${id})`);
  return Groups.findByPk(id);
};

const pushNewGroup = (group) => {
  logger.info(`Service: executing pushNewGroup(group = ${JSON.stringify(group)})`);
  return Groups.create({ ...group });
};

const updateGroupInDatabase = (id, group) => {
  logger.info(`Service: executing updateGroup(id = ${id}, group = ${JSON.stringify(group)})`);
  return Groups.update(group, { where: { id } });
};

const deleteGroup = (id) => {
  logger.info(`Service: executing deleteGroup(id = ${id})`);
  return Groups.destroy({ where: { id } });
};

const addUsersToGroup = async (groupId, usersId) => {
  console.log(usersId);
  logger.info(`Service: executing addUsersToGroup(groupId = ${groupId}, usersId = ${usersId})`);
  try {
    const group = await Groups.findByPk(groupId);
    console.log(group);

    if (group) {
      await sequelize.transaction((transaction) => group.addUsers(usersId, { transaction }));
    }
    return group;
  } catch (e) {
    throw new Error(e);
  }
};

export {
  getGroups,
  findGroupById,
  pushNewGroup,
  updateGroupInDatabase,
  deleteGroup,
  addUsersToGroup,
};
