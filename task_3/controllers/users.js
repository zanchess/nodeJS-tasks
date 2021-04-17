import {
  findUserById,
  getUsers,
  mainPage,
  pushNewUser,
  updateUserInDatabase,
  setDeletedUser,
  getSortAndLimitUsers,
} from '../services/users';

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
    const limetedUsersCollection = getSortAndLimitUsers(loginSubstring, limit);

    res.status(200);
    res.send(JSON.stringify(limetedUsersCollection));
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
  const { id } = req.params;
  const user = req.body;

  try {
    const users = updateUserInDatabase(id, user);

    res.status(200);
    res.json(users);
  } catch (err) {
    if (!err.statusCode) {
      res.status(500);
      res.json({ message: 'Error' });
    }
  }
};

const deleteUserHandler = (req, res) => {
  const { id } = req.params;

  try {
    const updatedUsers = setDeletedUser(id);

    res.status(200);
    res.send(JSON.stringify(updatedUsers));
  } catch (err) {
    if (!err.statusCode) {
      res.status(500);
      res.send(JSON.stringify(JSON.stringify({ message: 'Error' })));
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
