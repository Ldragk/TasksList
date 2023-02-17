import { Prisma } from "@prisma/client";

export abstract class DeleteRepository {
    abstract delete(id: string): Promise<void>;
    abstract deleteAll(): Promise<void>;
}
