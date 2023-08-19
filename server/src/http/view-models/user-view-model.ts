import { User } from "@src/entities/user";

export class UserViewModel {
  static toHTTP(user: Omit<User, 'password' | 'updated'>): Omit<User, 'password' | 'updated'> {
    const { id, email, name, createdAt, updatedAt, tasks, trash } = user;
    return {
      id,
      email,
      name,
      createdAt,
      updatedAt,
      tasks,
      trash
    };
  }
}
