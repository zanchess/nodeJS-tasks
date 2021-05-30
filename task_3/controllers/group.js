import CONFIGS from '../configs/config';
import {
  getGroups,
  findGroupById,
  pushNewGroup,
  updateGroupInDatabase,
  deleteGroup,
  addUsersToGroup,
} from '../services/group';


const getGroupsHandler = async (req, res, next) => {
  try {
    const allGroups = await getGroups();

    await res.status(CONFIGS.ERRORS.OK);
    await res.send(allGroups);
  } catch (err) {
    err.customErrorMessage = 'Couldn\'t get Groups';
    return next(err);;
  }
};

const getGroupByIdHandler = async (req, res, next) => {
  const { id } = req.params;

  try {
    const groupById =  await findGroupById(id);

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
    const newGroup = await pushNewGroup(group);

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
    const updatedGroup = await updateGroupInDatabase(id, group);

    await res.status(CONFIGS.ERRORS.OK);
    await res.send({message: 'Group was updated'});
  } catch (err) {
    err.customErrorMessage = `Group with id ${id} not found`;
    return next(err);
  }
};

const deleteGroupHandler = async (req, res, next) => {
  const { id } = req.params;

  try {
    const deletedGruope = await deleteGroup(id);

    await res.status(CONFIGS.ERRORS.OK);
    await res.send({message: 'Group was deleted'});
  } catch (err) {
    err.customErrorMessage = `Group with id ${req.params.id} was not deleted`;
    return next(err);
  }
};

const addUserToGroupHandler = async (req, res, next) => {
  try {
    const result = await addUsersToGroup(req.params.id, req.body.userIds);
    if (result) {
      res.status(CONFIGS.ERRORS.SUCCESSFULL);
      res.send({message: 'user added to group'});
    } else {
      res.status(ONFIGS.ERRORS.NOT_FOUND);
    }
  } catch (e) {
    return next(e);
  }
}

export {
  getGroupsHandler,
  getGroupByIdHandler,
  createNewGroupHandler,
  updateGroupHandler,
  deleteGroupHandler,
  addUserToGroupHandler
};
