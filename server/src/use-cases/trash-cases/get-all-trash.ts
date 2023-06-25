import { Trash } from "@src/entities/trash";
import { TrashRepository } from "@src/repositories/trash-repository";

interface GetTrashResponse {
  trash: Trash[];
}

export class AllTrash {
  constructor(private trashRepository: TrashRepository) { }

  async execute(userId: string): Promise<GetTrashResponse> {
    return { trash: await this.trashRepository.findAllTrash(userId) };
  }
}
