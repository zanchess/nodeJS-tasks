import CONFIGS from '../configs/config';
import Groups from '../model/group';
import GroupService from '../services/group';

const groupService = new GroupService(Groups);

const getGroupsHandler = async (req, res, next) => {
  try {
    const allGroups = await groupService.getGroups();

    await res.status(CONFIGS.ERRORS.OK);
    await res.send(allGroups);
  } catch (err) {
    err.customErrorMessage = 'Couldn\'t get Groups';
    return next(err);
  }
};

const getGroupByIdHandler = async (req, res, next) => {
  const { id } = req.params;

  try {
    const groupById = await groupService.findGroupById(id);

    await res.status(CONFIGS.ERRORS.OK);
    await res.send(groupById);
  } catch (err) {
    err.customErrorMessage = `Group with id ${req.params.id} not found`;
    return next(err);
  }
};

const createNewGroupHandler = async (req, res, next) => {
  const group = req.body;

  try {
    const newGroup = await groupService.pushNewGroup(group);

    await res.status(CONFIGS.ERRORS.OK);
    await res.send(newGroup);
  } catch (err) {
    err.customErrorMessage = 'Group wasn\'t created';
    return next(err);
  }
};

const updateGroupHandler = async (req, res, next) => {
  const group = req.body;
  const { id } = req.params;

  try {
    await groupService.updateGroupInDatabase(id, group);

    await res.status(CONFIGS.ERRORS.OK);
    await res.send({ message: 'Group was updated' });
  } catch (err) {
    err.customErrorMessage = `Group with id ${id} not found`;
    return next(err);
  }
};

const deleteGroupHandler = async (req, res, next) => {
  const { id } = req.params;

  try {
    await groupService.deleteGroup(id);

    await res.status(CONFIGS.ERRORS.OK);
    await res.send({ message: 'Group was deleted' });
  } catch (err) {
    err.customErrorMessage = `Group with id ${req.params.id} was not deleted`;
    return next(err);
  }
};

const addUserToGroupHandler = async (req, res, next) => {
  try {
    const result = await groupService.addUsersToGroup(req.params.groupId, req.body.userIds);

    if (result) {
      res.status(CONFIGS.ERRORS.SUCCESSFULL);
      res.send({ message: 'user added to group' });
    } else {
      res.status(CONFIGS.ERRORS.NOT_FOUND);
    }
  } catch (err) {
    err.customErrorMessage = `User wasn't add to group with ${req.params.groupId} and ${req.body.userIds} `;
    return next(err);
  }
};

export {
  getGroupsHandler,
  getGroupByIdHandler,
  createNewGroupHandler,
  updateGroupHandler,
  deleteGroupHandler,
  addUserToGroupHandler,
  groupService,
};
