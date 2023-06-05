import { Task } from "@src/entities/task";
import { Trash } from "@src/entities/trash";
import { ManageRepository } from "@src/repositories/manage-repository";
import { TrashRepository } from "@src/repositories/trash-repository";

export interface CreateTrashResponse {
  deleteTrash?: void;
  createTrash: Trash;
}

export class CreateTrash {
  constructor(
    private trashRepository: TrashRepository,
    private manageRepository: ManageRepository
  ) {}

  async execute(taskId: string): Promise<CreateTrashResponse> {
    const task: Task = await this.manageRepository.findeById(taskId);

    const { id, title, content, date, done, createdAt } = task;

    const trash: Trash = new Trash(
      {
        title: String(title),
        content: content.value,
        date: date.value,
        done: done,
        createdAt: createdAt,
      },
      id
    );
    await this.trashRepository.create(trash);
    return { createTrash: trash };
  }
}
