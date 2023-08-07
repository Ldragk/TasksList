import { Task as SrcTask } from "@src/entities/task";
import { Task as PrismaTask } from "@prisma/client";

export function authz(obj: SrcTask | boolean, prisma: PrismaTask) {
    if (obj) {
        return prisma
    } else {
        throw new Error("Access denied");
    }
}