import { UserRepository } from "@src/repositories/user-repository";
import { Request } from "express";

export class Me {
    constructor(private userRepository: UserRepository) { }

    async execute(req: Request) {        

        const userId = req.context?.userId._id;
        const user = await this.userRepository.findById(userId);
       
        return { user: user };
    }
}