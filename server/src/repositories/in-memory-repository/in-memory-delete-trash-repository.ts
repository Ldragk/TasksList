import { DeleteRepository } from "../delete-repository";
import { InMemoryTrashRepository } from "./in-memory-trash-repository";


export class InMemoryTrashDeleteRepository
  extends InMemoryTrashRepository
  implements DeleteRepository
{
  async delete(id: string): Promise<void> {
    const trash = this.trash.find((trash) => trash.id === id);
    if (!trash) throw new Error("Trash not found");
    this.trash.splice(this.trash.indexOf(trash), 1);
  }

  async deleteAll(): Promise<void> {
    this.trash = [];
  }
}
