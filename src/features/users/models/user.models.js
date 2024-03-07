export default class UserModel {
  constructor(id, name, email, password) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
  }
  static add(name, email, password) {
    let newUser = new UserModel(users.length + 1, name, email, password);
    users.push(newUser);
    return newUser;
  }

  static isvalidUser(email, password) {
    let isValid = users.find(
      (user) => user.email == email && user.password == password
    );
    return isValid;
  }
}

var users = [
  {
    id: 1,
    name: "Admin",
    email: "admin2024@gmail.com",
    password: "password123",
  },
  { id: 2, name: "User", email: "user2024@gmail.com", password: "password123" },
];
