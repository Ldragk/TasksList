import { UserRepository } from "@src/repositories/user-repository";
import { Request } from "express";

export class DeleteUser {
    constructor(private userRepository: UserRepository) { }

    async execute(req: Request) {

        const userId = req.context?.userId._id;
        const user = await this.userRepository.findById(userId)

        if (userId !== user?.id) {
            throw new Error("Access denied");
        }        

        await this.userRepository.delete(user.id);
        return { user: user };
    }
}