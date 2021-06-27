import { DataTypes } from 'sequelize';
import sequelize from '../data-access/db';

const PERMISSION_TYPES = {
  READ: 'READ',
  WRITE: 'WRITE',
  DELETE: 'DELETE',
  SHARE: 'SHARE',
  UPLOAD_SHARE: 'UPLOAD_SHARE',
};

const Groups = sequelize.define('Group', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: '23542da4-4f33-4f41-a99e-f6aa34dc9d23',
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  permissions: {
    type: DataTypes.ENUM(Object.values(PERMISSION_TYPES)),
    allowNull: false,
    defaultValue: PERMISSION_TYPES.READ,
  },
}, {
  tableName: 'groups',
  createdAt: false,
  updatedAt: false,
});

export default Groups;
