import { Prisma, Task } from "@prisma/client";

export abstract class DeleteRepository {
    abstract delete(id: string): Promise<Task>;
    abstract deleteAll(): Promise<Prisma.BatchPayload>;
}
