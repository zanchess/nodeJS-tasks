import {
  findUserById,
  getUsers,
  mainPage,
  pushNewUser,
  updateUserInDatabase,
  deleteUser,
} from '../services/users';
import getAutoSuggestUsers from '../utils/get-auto-suggest-users';

const getMainPageHandler = (req, res) => {
  try {
    const message = mainPage();

    res.status(200);
    res.send(message);
  } catch (err) {
    if (!err.statusCode) {
      res.status(500);
      res.send(JSON.stringify(JSON.stringify({ message: 'Error' })));
    }
  }
};

const getUsersHandler = async (req, res) => {
  const { loginSubstring, limit } = req.query;
  if (loginSubstring && limit) {
    const allUsers =  await getUsers();
    const limetedUsersCollection =  await getAutoSuggestUsers(loginSubstring, limit, res.json(allUsers));

    res.status(200);
    res.send(limetedUsersCollection);
  } else {
    try {
      const allUsers =  await getUsers();

      await res.status(200);
      await res.json(allUsers);
    } catch (err) {
      res.status(404);
      res.send(err);
    }

  }
};

const getUserByIdHandler = async (req, res) => {
  const { id } = req.params;

  try {
    const userById =  await findUserById(id);

    await res.status(200);
    await res.json(userById);

  } catch (err) {
    res.status(404);
    res.json(err);
  }
};

const createNewUserHandler = async (req, res) => {
  const user = req.body;
  try {
    const newUser = await pushNewUser(user);

    await res.status(200);
    await res.json(newUser);
  } catch (err) {
    if (!err.statusCode) {
      res.status(500);
    }
  }
};

const updateUserHandler = async (req, res) => {
  const user = req.body;
  const { id } = req.params;

  try {
    const updatedUser = await updateUserInDatabase(id, user);
    await console.log(updatedUser);

    await res.status(201);
    await res.json({message: 'User was updated'});
  } catch (err) {
    if (!err.statusCode) {
      res.status(500);
    }
  }
};

const deleteUserHandler = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedUsers = await deleteUser(id);

    await res.status(201);
    await res.json({message: 'User was deleted'});
  } catch (err) {
    if (!err.statusCode) {
      res.status(404);
    }
  }
};

export {
  getUsersHandler,
  getMainPageHandler,
  getUserByIdHandler,
  createNewUserHandler,
  updateUserHandler,
  deleteUserHandler,
};
