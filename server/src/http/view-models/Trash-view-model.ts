import { Trash } from "../../entities/Trash";

export class TrashViewModel {
  static toHTTP(trash: Trash) {
    return {
      id: trash.id,
      title: trash.title,
      description: trash.description,
      limitDay: trash.limitDay,
      limitMonth: trash.limitMonth,
      limitYear: trash.limitYear,     
      done: trash.done,
      createdAt: trash.createdAt,
      deletedAt: trash.deletedAt,      
    };
  }
}
