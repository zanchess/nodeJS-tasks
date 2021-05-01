import {Sequelize, DataTypes} from 'sequelize';
import sequelize from '../data-access/db';

const PERMISSION_TYPES = {
  READ: 'READ',
  WRITE: 'WRITE',
  DELETE: 'DELETE',
  SHARE: 'SHARE',
  UPLOAD_SHARE: 'UPLOAD_SHARE'
};

const Groups = sequelize.define('Group', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  permissions: {
    type: DataTypes.ENUM(Object.values(PERMISSION_TYPES)),
    allowNull: false,
    defaultValue: PERMISSION_TYPES.READ
  }
}, {
  tableName: 'group',
  createdAt: false,
  updatedAt: false
});

export default Groups;

