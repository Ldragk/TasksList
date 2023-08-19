import { User, UserProps } from "@src/entities/user";
import { UserRepository } from "@src/repositories/user-repository";
import AuthService from "../auth";


interface CreateUserRequest {
    email: string;
    password: string;
    name: string;
}

interface ResponseBody {
    id: string;
    email: string;
    name: string;
}

interface CreateUserResponse {
    user: ResponseBody;
}

export class CreateUser {
    constructor(private userRepository: UserRepository) { }

    async execute(props: CreateUserRequest): Promise<CreateUserResponse> {
        const { email, name } = props;
        let { password } = props;

        this.passwordValidation(password)

        password = await this.hashPassword(password)

        let user = new User({
            email: email,
            password: password,
            name: name
        });
        await this.userRepository.create(user);

        const response = this.removePassword(user)


        return { user: response };
    }

    passwordValidation(password: string) {
        const passwordValidation = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W).+$/;
        if (password.length < 8 || !passwordValidation.test(password)) {
            throw new Error(
                'The password format is invalid! It must contain at least one lowercase letter, one uppercase letter, one digit, one symbol, and have a minimum length of 10 characters.');
        }
    }

    async hashPassword(password: string): Promise<string> {
        if (password) {
            const hashedPassword = await AuthService.hashPassword(password);
            password = hashedPassword;
        }
        return password
    }

    removePassword(user: User): ResponseBody {

        const { id, email, name, createdAt } = user;

        const userWithoutPassword = {
            id,
            email,
            name,
            createdAt
        }
        return userWithoutPassword
    }
}
