import { User } from "@src/entities/user";

export class UserViewModel {
  static toHTTP(user: User) {
    const { id, email, password, name, createdAt, updatedAt, tasks, trash } = user;
    return {
      id,
      email,
      password,
      name,
      createdAt,
      updatedAt,
      tasks,
      trash
    };
  }
}
