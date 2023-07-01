import { User } from "@src/entities/user";
import { UserRepository } from "@src/repositories/user-repository";
import AuthService from "../auth";

interface EditUserRequest {
    email: string;
    password: string;
    name: string;
}

interface EditUserResponse {
    user: User;
}

export class UpdateUser {
    constructor(private userRepository: UserRepository) { }

    async execute(
        id: string,
        body: EditUserRequest
    ): Promise<EditUserResponse> {

        const user: User = await this.userRepository.findById(id);
        const { email, name } = body;
        let { password } = body;        
        
        const passwordValidation = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W).+$/;
        if (password.length < 8 || !passwordValidation.test(password)) {
            throw new Error(
                'The password format is invalid! It must contain at least one lowercase letter, one uppercase letter, one digit, one symbol, and have a minimum length of 10 characters.');
        }
        if (password) {
            const hashedPassword = await AuthService.hashPassword(password);
            password = hashedPassword;
        }
        user.updated();
        const userUpdated = new User({
            email: email || user.email,
            password: password ?? user.password,
            name: name ?? user.name,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        }, user.id);

        await this.userRepository.update(id, userUpdated);
        return { user: userUpdated };
    }
}
