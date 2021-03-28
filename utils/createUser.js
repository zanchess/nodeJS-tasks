import uuidv1 from 'uuid';

class User {
  constructor(login, password, age) {
    this.id = uuidv1();
    this.login = login;
    this.password = password;
    this.isDeleted = false;
  }
}

module.exports = User;
