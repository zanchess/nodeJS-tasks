import  Groups from '../model/group';
import UserGroups from '../model/userGroup';

const getGroups = () => {
  return  Groups.findAll();
};

const findGroupById = (id) => {
  return Groups.findByPk(id);
};

const pushNewGroup = (group) => {
  return  Groups.create({...group});
};

const updateGroupInDatabase = (id, group) => {
  return Groups.update(group, { where: { id } });
};

const deleteGroup = (id) => {
  return Groups.destroy({ where: { id } });
};

const addUsersToGroup = (id, userIds) => {
  return  Groups.addUsersToGroup(id, userIds);
}

export {
  getGroups,
  findGroupById,
  pushNewGroup,
  updateGroupInDatabase,
  deleteGroup,
  addUsersToGroup,
};
