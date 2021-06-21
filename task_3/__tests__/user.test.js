import { expect } from '@jest/globals';
import {
  pushNewUser,
  getUserByLogin,
} from '../services/users';
import Users from '../model/users';

jest.mock('../model/users.js');

describe('User controller', () => {
  beforeEach(() => {
    Users.findOne = jest.fn();
    Users.update = jest.fn();
    Users.findAll = jest.fn();
    Users.destroy = jest.fn();
    Users.create = jest.fn();
  });

  test('Should create user record in DB', async () => {
    await pushNewUser({ login: 'sa', age: 21, password: '1111' });
    const foundUser = await getUserByLogin('sa');
    expect(foundUser).toEqual(1);
  });
});
