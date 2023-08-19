import { UserRepository } from "@src/repositories/user-repository";
import { Request } from "express";
import { UpdatedUserResponse } from "./update";
import { User } from "@src/entities/user";

export class Me {
    constructor(private userRepository: UserRepository) { }

    async execute(req: Request): Promise<UpdatedUserResponse> {

        const userId = req.context?.userId._id;
        const user = await this.userRepository.findById(userId);

        const response = this.removePassword(user)

        return { user: response } 
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