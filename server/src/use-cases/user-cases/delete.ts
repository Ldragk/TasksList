import { User } from "@src/entities/user";
import { UserRepository } from "@src/repositories/user-repository";
import { Request } from "express";
import { UpdatedUserResponse } from "./update";
import Cache from "@src/util/cache";
import { CacheService } from "../cache-service";

export class DeleteUser extends CacheService{
    constructor(private userRepository: UserRepository) {
        super()
     }

    async execute(req: Request): Promise<UpdatedUserResponse> {

        const userId = req.context?.userId._id;
        const user = await this.userRepository.findById(userId)

        if (userId !== user?.id) {
            throw new Error("Access denied");
        }        
        await this.userRepository.delete(user.id);
        const response = this.removePassword(user)

        this.cache.del(`user:${userId}`);
        return { user: response };
    }

    removePassword(userUpdated: User): Omit<User, 'password' | 'updated'> {
        const { id, email, name, createdAt, updatedAt, tasks, trash } = userUpdated;

        const userWithoutPassword = {
            id,
            email,
            name,
            createdAt,
            updatedAt,
            tasks,
            trash
        }
        return userWithoutPassword
    }
}