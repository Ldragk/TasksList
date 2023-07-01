import { User } from "@src/entities/user";

export abstract class UserRepository {
    abstract create(user: User): Promise<void>;
    abstract findByEmail(email: string): Promise<User>;
    abstract findById(id: string): Promise<User>;
    abstract delete(id: string): Promise<void>; 
    abstract update(id: string, user: User): Promise<void>;
}