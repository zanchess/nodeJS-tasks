import logger from '../logging/winstonLogger';

export default class UserService {
  constructor(userModel) {
    this.userModel = userModel;
  }

  async getUserByLogin(login) {
    logger.info(`Service: executing getUserByLogin(name = ${login})`);
    return this.userModel.findOne({ where: { login } }).then((user) => user.toJSON());
  }

  async getUsers() {
    logger.info('Service: executing getUsers');
    return this.userModel.findAll();
  }

  async findUserById(id) {
    logger.info(`Service: executing findUserById(id = ${id})`);
    return this.userModel.findByPk(id);
  }

  async pushNewUser(user) {
    logger.info(`Service: executing pushNewUser(group = ${JSON.stringify(user)})`);
    return this.userModel.create({ ...user });
  }

  async updateUser(id, user) {
    logger.info(`Service: executing updateUser(id = ${id}, group = ${JSON.stringify(user)})`);
    return this.userModel.update(user, { where: { id } });
  }

  async deleteUser(id) {
    logger.info(`Service: executing deleteUser(groupId = ${id}, usersId = ${id})`);
    return this.userModel.update({ is_deleted: true }, { where: { id } });
  }

  async authenticate(login, password) {
    const user = await this.getUserByLogin(login);
    if (user && user.password === password) {
      return user;
    }
    return null;
  }
}
