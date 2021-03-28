import u1 from 'uuid';

const db = {
  users: [
    {
      id: u1(),
      login: 'Alex',
      password: 'qwerty',
      age: '23',
      isDeleted: false,
    },
    {
      id: u1(),
      login: 'Neal',
      password: '12345678',
      age: '30',
      isDeleted: true,
    },
    {
      login: 'Neal1',
      password: '12345678',
      age: '30',
    },
  ],
};

export default db;
