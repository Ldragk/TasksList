import { Trash } from "@src/entities/trash";
import { TrashRepository } from "../trash-repository";

export class InMemoryTrashRepository implements TrashRepository {
  trash: Trash[] = [];

  async create(trash: Trash): Promise<void> {
    this.trash.push(trash);
  }

  async findAllTrash(userId: string): Promise<Trash[]> {
    const trash = this.trash.filter(trash => {
      return trash.userId === userId 
    })   
    return trash
  }
}
