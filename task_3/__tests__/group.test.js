import { mockGroup, mockGroups, mockCreatedGroup } from '../__mocks__/mockedGroupData';
import {
  groupService,
  getGroupsHandler,
  getGroupByIdHandler,
  createNewGroupHandler,
  updateGroupHandler,
  deleteGroupHandler,
} from '../controllers/group';
import Groups from '../model/group';

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
    Groups.findAll = jest.fn().mockReturnValue(Promise.resolve(mockGroups));
    Groups.findByPk = jest.fn().mockReturnValue(Promise.resolve(mockGroup));
    Groups.create = jest.fn().mockReturnValue(Promise.resolve(mockCreatedGroup));
    Groups.update = jest.fn().mockReturnValue(Promise.resolve([1]));
    Groups.destroy = jest.fn().mockReturnValue(Promise.resolve([1]));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Group Controller', () => {
    it('should return all groups and send 200 status code', async () => {
      const getAllUsersStub = jest.spyOn(groupService, 'getGroups');

      await getGroupsHandler(req, res, next);

      expect(getAllUsersStub).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith(mockGroups);
    });

    it('should return group by id', async () => {
      const getAllUsersStub = jest.spyOn(groupService, 'findGroupById');
      req.params = { id: 2 };

      await getGroupByIdHandler(req, res, next);

      expect(getAllUsersStub).toHaveBeenCalledWith(req.params.id);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith(mockGroup);
    });

    it('should return new group', async () => {
      const getAllUsersStub = jest.spyOn(groupService, 'pushNewGroup');

      req.body = {
        id: 3,
        name: 'guests',
        permissions: ['READ', 'SHARE'],
      };

      await createNewGroupHandler(req, res, next);

      expect(getAllUsersStub).toHaveBeenCalledWith(req.body);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith(mockCreatedGroup);
    });

    it('should update group', async () => {
      const getAllUsersStub = jest.spyOn(groupService, 'updateGroupInDatabase');
      req.body = {
        name: 'users',
        permissions: ['READ'],
      };
      req.params = { id: 1 };

      await updateGroupHandler(req, res, next);

      expect(getAllUsersStub).toHaveBeenCalledWith(req.params.id, req.body);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith({ message: 'Group was updated' });
    });

    it('should delete user', async () => {
      const getAllUsersStub = jest.spyOn(groupService, 'deleteGroup');

      req.params = { id: 1 };

      await deleteGroupHandler(req, res, next);

      expect(getAllUsersStub).toHaveBeenCalledWith(req.params.id);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith({ message: 'Group was deleted' });
    });
  });
});
