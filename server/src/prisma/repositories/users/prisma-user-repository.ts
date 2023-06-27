import { User } from "@src/entities/user";
import { prisma } from "@src/prisma/prisma-client";
import { UserRepository } from "@src/repositories/user-repository";
import { PrismaUserMapper } from "./prisma-user-mapper";

//TODO criar rota para alterar dados do usuário.

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

    async findByEmail(email: string): Promise<User | undefined> {
        const user = await prisma.user.findUnique({
            where: {
                email: email,
            },
        });
        if (!user) return undefined;
        return PrismaUserMapper.toDomain(user);
    }

    async findById(id: string): Promise<User | undefined> {
        const user = await prisma.user.findUnique({
            where: {
                id: id,
            },
        });
        if (!user) return undefined;
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

    async findAllUsers(): Promise<User[]> {
        const users = prisma.user.findMany({
            orderBy: {
                createdAt: "desc",
            },
        });

        return (await users).map((user) => PrismaUserMapper.toDomain(user));
    }
}