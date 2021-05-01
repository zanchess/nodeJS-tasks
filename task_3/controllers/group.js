
import CONFIGS from '../configs/config';


const getGroupsHandler = async (req, res) => {
  try {
    const allGroups = await getGroups();

    await res.status(CONFIGS.ERRORS.OK);
    await res.send(allGroups);
  } catch (err) {
    res.status(CONFIGS.ERRORS.NOT_FOUND);
    res.send(err);
  }
};

const getGroupByIdHandler = async (req, res) => {
  const { id } = req.params;

  try {
    const groupById =  await findGroupById(id);

    await res.status(CONFIGS.ERRORS.OK);
    await res.send(groupById);

  } catch (err) {
    res.status(CONFIGS.ERRORS.NOT_FOUND);
    res.json(err);
  }
};

const createNewGroupHandler = async (req, res) => {
  const group = req.body;
  try {
    const newGroup = await pushNewGroup(group);

    await res.status(CONFIGS.ERRORS.OK);
    await res.send(newGroup);
  } catch (err) {
    if (!err.statusCode) {
      res.status(CONFIGS.ERRORS.NOT_FOUND);
    }
  }
};

const updateGroupHandler = async (req, res) => {
  const group = req.body;
  const { id } = req.params;

  try {
    const updatedGroup = await updateGroupInDatabase(id, group);

    await res.status(CONFIGS.ERRORS.OK);
    await res.send({message: 'Group was updated'});
  } catch (err) {
    if (!err.statusCode) {
      res.status(CONFIGS.ERRORS.NOT_FOUND);
    }
  }
};

const deleteGroupHandler = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedGruope = await deleteGroup(id);

    await res.status(CONFIGS.ERRORS.OK);
    await res.send({message: 'Group was deleted'});
  } catch (err) {
    if (!err.statusCode) {
      res.status(CONFIGS.ERRORS.NOT_FOUND);
    }
  }
};

export {
  getGroupsHandler,
  getGroupByIdHandler,
  createNewGroupHandler,
  updateGroupHandler,
  deleteGroupHandler
};
