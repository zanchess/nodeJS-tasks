import {Sequelize} from "sequelize";

class PostgreORM {
  async init() {
    this.db = new Sequelize('postgres://tppkddth:YJKR_lCUbXSw1lj59DbeTnamsGHHAU08@tai.db.elephantsql.com:5432/tppkddth');
    try {
      this.db.authenticate();
      console.log('Connection has been established successfully.');
    } catch (err) {
      console.error('Unable to connect to the database:', err);
    }
  }

  destroy() {
    if (this.sequelize) {
      return this.sequelize.close();
    }
  }
}

export default new PostgreORM;
