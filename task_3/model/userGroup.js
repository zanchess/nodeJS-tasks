import {Sequelize, DataTypes} from 'sequelize';
import sequelize from '../data-access/db';
import Users from './users';
import Groups from './group';



const UserGroups = sequelize.define(
  'userGroup',
  {
    user_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      references: {
        model: Users,
        key: 'id'
      }
    },
    group_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      references: {
        model: Groups,
        key: 'id'
      }
    }
  },
  { tableName: 'userGroup', timestamps: false }
);

Users.belongsToMany(Groups, { through:  UserGroups });
Groups.belongsToMany(Users, { through:  UserGroups });

export default UserGroups;

