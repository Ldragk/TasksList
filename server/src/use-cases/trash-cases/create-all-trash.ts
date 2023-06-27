import { Trash } from "@src/entities/trash";
import { QueryRepository } from "@src/repositories/get-repository";
import { TrashRepository } from "@src/repositories/trash-repository";
import { CreateTrashResponse } from "./create-trash";
import { Task } from "@src/entities/task";
import { LimitDate } from "@src/entities/task-entities/limitDate";

export class CreateAllTrash {
  constructor(
    private trashRepository: TrashRepository,
    private queryRepository: QueryRepository
  ) { }

  async execute(userId: string): Promise<CreateTrashResponse> {
    const tasks = await this.queryRepository.findAllTasks(userId);  

    return Object(tasks).map(async (task: Task) => {
      const { id, title, content, date, done, createdAt } = task;

      const trashBody = new Trash(
        {
          title: title,
          content: content,
          date: new LimitDate(date.value),
          done: done,
          createdAt: createdAt,
          userId: task.userId,
        },
        id
      );

      return {
        createTrash: await this.trashRepository.create(trashBody),
      };
    });
  }
}
