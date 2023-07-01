import { DeleteRepository } from "../delete-repository";
import { InMemoryManageRepository } from "./in-memory-manage-repository";

export class InMemoryDeleteRepository
  extends InMemoryManageRepository
  implements DeleteRepository {
  constructor() {
    super();
  }

  async delete(userId: string, id: string): Promise<void> {
    const task = this.tasks.find((task) => task.id === id);
    if (!task) {
      throw new Error("Task not found");
    }
    if (userId === task.userId) {
      this.tasks.splice(this.tasks.indexOf(task), 1);
    }
  }

  async deleteAll(userId: string): Promise<void> {
    this.tasks = this.tasks.filter(tasks => {
      tasks.userId !== userId
    })
  }
}
