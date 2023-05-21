import { Task } from "../../entities/task";
import { Trash } from "../../entities/trash";
import { ManageRepository } from "../../repositories/manage-repository";
import { TrashRepository } from "../../repositories/trash-repository";

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
    let task: Task = await this.manageRepository.findeById(taskId);

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
