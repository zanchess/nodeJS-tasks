const { v1: uuidv1 } = require('uuid');

const db = {
  users: [
    {
      id: uuidv1(),
      login: 'Alex',
      password: 'qwerty',
      age: '23',
      isDeleted: false,
    },
    {
      id: uuidv1(),
      login: 'Neal',
      password: '12345678',
      age: '30',
      isDeleted: true,
    },
    /*     {
      login: 'Neal',
      password: '12345678',
      age: '30',
    }, */
  ],
};

module.exports = db;
