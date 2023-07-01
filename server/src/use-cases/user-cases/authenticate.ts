import { UserRepository } from "@src/repositories/user-repository";
import { Request } from "express";
import AuthService from "../auth";

export class Authenticate {

    constructor(private userRepository: UserRepository) { }

    async execute(req: Request) {

        const { email, password } = req.body;
        const user = await this.userRepository.findByEmail(email);       

        if (!(await AuthService.comparePassword(password, String(user.password)))) {
            throw new Error('Invalid password!');
        }

        const token = AuthService.generateToken(user);
        return { token: token };
    }
}
