import Users from '../model/users';
import { mockUsers, mockUser, mockCreatedUser } from '../__mocks__/mockedUserData';
import {
  getUsersHandler,
  getUserByIdHandler,
  userService,
  createNewUserHandler,
  updateUserHandler,
  deleteUserHandler,
} from '../controllers/users';

describe('UserController', () => {
  const req = {};
  const res = {};
  const next = jest.fn();

  beforeEach(() => {
    req.body = {};
    req.query = {};
    req.params = {};

    res.status = jest.fn().mockReturnValue(res);
    res.send = jest.fn().mockReturnValue(res);
  });

  beforeAll(() => {
    Users.findAll = jest.fn().mockReturnValue(Promise.resolve(mockUsers));
    Users.findByPk = jest.fn().mockReturnValue(Promise.resolve(mockUser));
    Users.create = jest.fn().mockReturnValue(Promise.resolve(mockCreatedUser));
    Users.update = jest.fn().mockReturnValue(Promise.resolve([1]));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('User Controller tests', () => {
    it('should return all users and send 200 status code', async () => {
      const getAllUsersStub = jest.spyOn(userService, 'getUsers');

      await getUsersHandler(req, res, next);

      expect(getAllUsersStub).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith(mockUsers);
    });

    it('should return user with id', async () => {
      const getAllUsersStub = jest.spyOn(userService, 'findUserById');
      req.params = { id: 7 };

      await getUserByIdHandler(req, res, next);

      expect(getAllUsersStub).toHaveBeenCalledWith(req.params.id);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith(mockUser);
    });

    it('should return new user', async () => {
      const getAllUsersStub = jest.spyOn(userService, 'pushNewUser');
      req.body = {
        id: 121, login: 'login1', password: 'pass1', age: 26, is_deleted: false,
      };

      await createNewUserHandler(req, res, next);

      expect(getAllUsersStub).toHaveBeenCalledWith(req.body);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith(mockCreatedUser);
    });

    it('should update user', async () => {
      const getAllUsersStub = jest.spyOn(userService, 'updateUser');
      req.body = {
        id: 1,
        login: 'login123',
        password: 'pass112',
        age: 21,
        is_deleted: false,
      };
      req.params = { id: 7 };

      await updateUserHandler(req, res, next);

      expect(getAllUsersStub).toHaveBeenCalledWith(req.params.id, req.body);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith({ message: 'User was updated' });
    });

    it('should delete user', async () => {
      const getAllUsersStub = jest.spyOn(userService, 'deleteUser');

      req.params = { id: 1 };

      await deleteUserHandler(req, res, next);

      expect(getAllUsersStub).toHaveBeenCalledWith(req.params.id);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith({ message: 'User was deleted' });
    });
  });
});
