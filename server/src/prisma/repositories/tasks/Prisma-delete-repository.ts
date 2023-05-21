import { DeleteRepository } from "../../../repositories/delete-repository";
import { PrismaService } from "../../prisma.service";

const prismaService = new PrismaService();

export class PrismaDeleteRepository implements DeleteRepository {
  async delete(id: string): Promise<void> {
    await prismaService.task.delete({
      where: {
        id: id,
      },
    });
  }
  async deleteAll(): Promise<void> {
    await prismaService.task.deleteMany();
  }
}
