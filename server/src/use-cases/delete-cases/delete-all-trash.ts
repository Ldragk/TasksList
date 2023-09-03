import { DeleteRepository } from "@src/repositories/delete-repository";
import Cache from "@src/util/cache"
import { CacheService } from "../cache-service";

interface DeleteAllTrashResponse {
  deleteTrash: void;
}

export class DeleteAllTrash extends CacheService{
  constructor(private deleteTrashRepository: DeleteRepository) {
    super()
  }
  async execute(userId: string): Promise<DeleteAllTrashResponse> {
    this.cache.del(`trash:${userId}`)
    return { deleteTrash: await this.deleteTrashRepository.deleteAll(userId) };
  }
}
