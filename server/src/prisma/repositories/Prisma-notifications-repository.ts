import { ISendNotification, PrismaNotificationMapper } from './Prisma-notifications-mapper';
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class PrismaNotificationsRepository extends PrismaNotificationMapper {
    constructor() {
        super();
    }
  
    async findeById(): Promise<ISendNotification | null> {
      const tasks = await prisma.tasks.findMany({
        select: {
            id: true,
            title: true,            
            done: true,
            limitDay: true,
            limitMonth: true,
            limitYear: true,
        },
        where: {
          done: false,
        },
      });
  
      return !tasks
        ? null
        : PrismaNotificationMapper.toPrisma(tasks);
    }
}  