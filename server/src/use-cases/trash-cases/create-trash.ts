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
  ) { }

  async execute(userId: string, taskId: string): Promise<CreateTrashResponse> {
    const task: Task = await this.manageRepository.findById(taskId, userId);

    if (!task) {
      throw new Error("Access denied");
    }
    const { id, title, content, date, done, createdAt, } = task;

    const trash: Trash = new Trash(
      {
        title: title,
        content: content,
        date: date,
        done: done,
        createdAt: createdAt,
        userId: task.userId,
      },
      id
    );
    await this.trashRepository.create(trash);    
    return { createTrash: trash };
  }  
}
