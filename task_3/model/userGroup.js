import Users from './users';
import Groups from './group';

Users.belongsToMany(Groups, {
  through: 'UserGroups',
});

Groups.belongsToMany(Users, {
  through: 'UserGroups',
});

export default Groups;
