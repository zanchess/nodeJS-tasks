import { v4 as uuidv4 } from 'uuid';

class User {
  constructor(id = '', login, password, age) {
    this.id = id || uuidv4();
    this.login = login;
    this.password = password;
    this.age = age;
    this.isDeleted = false;
  }
}

export default User;
