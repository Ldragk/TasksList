import { Trash } from "../../entities/trash";
import { TrashRepository } from "../trash-repository";

export class InMemoryTrashRepository implements TrashRepository {
  trash: Trash[] = [];

  async create(trash: Trash): Promise<void> {
    this.trash.push(trash);
  }

  async findAllTrash(): Promise<Trash[]> {
    return this.trash;
  }
}
