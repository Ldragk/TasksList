import { User, UserProps } from "@src/entities/user";
import { UserRepository } from "@src/repositories/user-repository";
import AuthService from "../auth";
import Cache from "@src/util/cache";
import { CacheService } from "../cache-service";

interface EditUserRequest {
    email: string;
    password: string;
    name: string;
}

interface ResponseBody extends Omit<User, 'password' | 'updated'> {
}

export interface UpdatedUserResponse {
    user: ResponseBody;
}

export class UpdateUser extends CacheService{
    constructor(private userRepository: UserRepository) {
        super()
     }

    async execute(
        userId: string,
        body: EditUserRequest        
    ): Promise<UpdatedUserResponse> {

        const user: User = await this.userRepository.findById(userId);
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

        await this.userRepository.update(userId, userUpdated);

        const response = this.removePassword(userUpdated)
        this.cache.set<User>(`user:${userId}`, response as User, userId);

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
