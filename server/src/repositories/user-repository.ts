import { User } from "@src/entities/user";

export abstract class UserRepository {
    abstract create(user: User): Promise<void>;
    abstract findByEmail(email: string): Promise<User | undefined>;
    abstract findById(id: string): Promise<User | undefined>;
    abstract delete(id: string): Promise<void>; 
}