import { Trash } from "../../entities/trash";
import { TrashRepository } from "../../repositories/trash-repository";

interface GetTrashResponse {
  trash: Trash[];
}

export class AllTrash {
  constructor(private trashRepository: TrashRepository) {}

  async execute(): Promise<GetTrashResponse> {
    return { trash: await this.trashRepository.findAllTrash() };
  }
}
