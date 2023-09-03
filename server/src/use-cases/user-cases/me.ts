import { UserRepository } from "@src/repositories/user-repository";
import { Request } from "express";
import { UpdatedUserResponse } from "./update";
import { User } from "@src/entities/user";
import { CacheService } from "../cache-service";

enum CheckCache {
    NoCache = 1,
}

export class Me extends CacheService{
    constructor(private userRepository: UserRepository) { 
        super()
    }

    async execute(req: Request): Promise<UpdatedUserResponse> {

        const userId = req.context?.userId._id;
        const cached = this.cached(userId)

        if (cached === CheckCache.NoCache) {
            const user = await this.userRepository.findById(userId);
            const response = this.removePassword(user)

            this.cache.set<User>(`user:${userId}`, response as User, userId);
            return { user: response }
        }
        return { user: cached as unknown as User }
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

    cached(userId: string) {
        const cachedTasks = this.cache.get<Omit<User, 'password' | 'updated'>>(`user:${userId}`, userId);

        if (cachedTasks) {
            return cachedTasks;
        }
        return CheckCache.NoCache
    }
}