import { User } from "@src/entities/user";
import { prisma } from "@src/prisma/prisma-client";
import { UserRepository } from "@src/repositories/user-repository";
import { PrismaUserMapper } from "./prisma-user-mapper";

export class PrismaUserRepository implements UserRepository {

    async create(user: User): Promise<void> {
        const newUser = PrismaUserMapper.toPrisma(user);
        const { email } = newUser;
        const unique = await prisma.user.findUnique({ where: { email } })

        if (unique) {
            throw new Error('User validation failed: email: already exists in the database.');
        }
        await prisma.$transaction([
            prisma.user.create({
                data: newUser
            }),
        ]);
    }

    async findByEmail(email: string): Promise<User> {
        const user = await prisma.user.findUniqueOrThrow({
            where: {
                email: email,
            },
        });        
        return PrismaUserMapper.toDomain(user);
    }

    async findById(id: string): Promise<User> {
        const user = await prisma.user.findUniqueOrThrow({
            where: {
                id: id,
            },
        });
        return PrismaUserMapper.toDomain(user);
    }    

    async delete(id: string): Promise<void> {

        await prisma.task.deleteMany({
            where: {
                userId: id,
            },
        });

        await prisma.deletedTask.deleteMany({
            where: {
                userId: id,
            },
        });

        await prisma.user.delete({
            where: {
                id: id,
            },
        });
    }

    async update(id: string, user: User): Promise<void> {
        const updateUser = PrismaUserMapper.toPrisma(user);
        const { email, password, name } = updateUser
        await prisma.user.update({
            where: {
                id: id,
            },
            data: {
                email,
                password,
                name,
            }
        });
    }

    async findAllUsers(): Promise<User[]> {
        const users = prisma.user.findMany({
            orderBy: {
                createdAt: "desc",
            },
        });
        return (await users).map((user) => PrismaUserMapper.toDomain(user));
    }
}