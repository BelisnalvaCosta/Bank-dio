export interface User {
  name: string;
  email: string;
}

const db: User[] = [
  {
    name: "Joana",
    email: "joana@dio.com",
  },
];

export class UserService {
  db: User[];

  constructor(database = db) {
    this.db = database;
  }

  createUser = (name: string, email: string) => {
    const user = { name, email };
    this.db.push(user);
    console.log('DB atualizado', this.db);
  }

  getAllUsers = (): User[] => {
    return this.db;
  }

  deleteUser = (email: string): boolean => {
    const userIndex = this.db.findIndex(user => user.email === email);
    if (userIndex === -1) return false;

    this.db.splice(userIndex, 1);
    console.log('Usuário deletado. DB atualizado', this.db);
    return true;
  }
}
