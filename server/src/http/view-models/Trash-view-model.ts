import { Trash } from "../../entities/Trash";

export class TrashViewModel {
  static toHTTP(trash: Trash) {
    return {
      id: trash.id,
      title: trash.title,
      content: trash.content,
      limitDay: trash.limitDay,
      limitMonth: trash.limitMonth,
      limitYear: trash.limitYear,     
      done: trash.done,
      createdAt: trash.createdAt,
      deletedAt: trash.deletedAt,      
    };
  }
}
