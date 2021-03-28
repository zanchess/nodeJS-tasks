import { v4 as uuidv4 } from 'uuid';

const db = {
  users: [
    {
      id: '1a',
      login: 'Alex',
      password: 'qwerty',
      age: '23',
      isDeleted: false,
    },
    {
      id: uuidv4(),
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
