export abstract class DeleteRepository {
  abstract delete(userId: string, id: string): Promise<void>;
  abstract deleteAll(userId: string): Promise<void>;
}
