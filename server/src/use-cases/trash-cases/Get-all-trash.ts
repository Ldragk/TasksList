import { Trash } from "../../entities/Trash";
import { TrashRepository } from "../../repositories/Trash-repository";

interface GetTrashResponse {
  trash: Trash[];
}

export class AllTrash {
  constructor(private trashRepository: TrashRepository) {}

  async execute(): Promise<GetTrashResponse> {
    return { trash: await this.trashRepository.findAllTrash() };
  }
}
