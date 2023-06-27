import { Trash } from "@src/entities/trash";

export class TrashViewModel {
  static toHTTP(trash: Trash) {
    const { id, title, content, date, done, createdAt, deletedAt, userId } = trash;
    return {
      id,
      title,
      content,
      date,
      done,
      createdAt,
      deletedAt,
      userId
    };
  }
}
