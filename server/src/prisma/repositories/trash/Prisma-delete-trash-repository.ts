import { DeleteRepository } from "../../../repositories/Delete-repository";
import { PrismaService } from "../../prisma.service";

const prismaService = new PrismaService();

export class PrismaDeleteTrashRepository implements DeleteRepository {
  async delete(id: string): Promise<void> {
    await prismaService.deletedTask.delete({
      where: {
        id: id,
      },
    });
  }
  async deleteAll(): Promise<void> {
    await prismaService.deletedTask.deleteMany();
  }
}
