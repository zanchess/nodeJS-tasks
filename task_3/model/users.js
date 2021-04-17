import orm from '../data-access/db'
import {Sequelize} from "sequelize";


const Users = orm.define('users', {
  id: {
    type: Sequelize.UUID,
    primaryKey: true,
    autoIncrement: true
  },
  login: {
    type: Sequelize.STRING
  },
  password: {
    type: Sequelize.PASSWORD
  },
  age: {
    type: Sequelize.INTEGER
  },
  isDelete: {
    type: Sequelize.BOOLEAN
  }
});

export default Users;
