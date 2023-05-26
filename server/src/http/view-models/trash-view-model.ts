import { Trash } from "@src/entities/trash";

export class TrashViewModel {
  static toHTTP(trash: Trash) {
    return {
      id: trash.id,
      title: trash.title,
      content: trash.content,
      date: trash.date,
      done: trash.done,
      createdAt: trash.createdAt,
      deletedAt: trash.deletedAt,
    };
  }
}
