import { Prisma } from "@prisma/client";
import { TaskBody } from "../http/dtos/create-task-body";

export abstract class DeleteRepository {
    abstract delete(id: string): Promise<TaskBody>;
    abstract deleteAll(): Promise<Prisma.BatchPayload>;
}
