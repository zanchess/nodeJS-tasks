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
      id: uuidv4(),
      login: 'Neal1',
      password: '12345678',
      age: '30',
      isDeleted: false,
    },
    {
      id: uuidv4(),
      login: 'Otto',
      password: '12345678',
      age: '30',
      isDeleted: false,
    },
    {
      id: '1b',
      login: 'Alexis',
      password: 'qwerty',
      age: '18',
      isDeleted: false,
    },
    {
      id: '1c',
      login: 'Alexandr',
      password: 'qwerty',
      age: '27',
      isDeleted: false,
    },
    {
      id: uuidv4(),
      login: 'Yan',
      password: '12345678',
      age: '30',
      isDeleted: false,
    },
    {
      id: uuidv4(),
      login: 'Boris',
      password: '12345678',
      age: '30',
      isDeleted: false,
    },
  ],
};

export default db;
