import  Groups from '../model/group';

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

export {
  getGroups,
  findGroupById,
  pushNewGroup,
  updateGroupInDatabase,
  deleteGroup
};
