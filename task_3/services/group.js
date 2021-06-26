import logger from '../logging/winstonLogger';
import sequelize from '../data-access/db';

export default class GroupService {
  constructor(groupModel) {
    this.Groups = groupModel;
  }

  async getGroups() {
    logger.info('Service: executing getGroups');
    return this.Groups.findAll();
  }

  async findGroupById(id) {
    logger.info(`Service: executing findGroupById(id = ${id})`);
    return this.Groups.findByPk(id);
  }

  async pushNewGroup(group) {
    logger.info(`Service: executing pushNewGroup(group = ${JSON.stringify(group)})`);
    return this.Groups.create({ ...group });
  }

  async updateGroupInDatabase(id, group) {
    logger.info(`Service: executing updateGroup(id = ${id}, group = ${JSON.stringify(group)})`);
    return this.Groups.update(group, { where: { id } });
  }

  async deleteGroup(id) {
    logger.info(`Service: executing deleteGroup(id = ${id})`);
    return this.Groups.destroy({ where: { id } });
  }

  async addUsersToGroupasync(groupId, usersId) {
    logger.info(`Service: executing addUsersToGroup(groupId = ${groupId}, usersId = ${usersId})`);
    try {
      const group = await this.Groups.findByPk(groupId);

      if (group) {
        await sequelize.transaction((transaction) => group.addUsers(usersId, { transaction }));
      }
      return group;
    } catch (e) {
      throw new Error(e);
    }
  }
}
