import { DeletedTask as RawTrash } from "@prisma/client";
import { Trash } from "../../../entities/Trash";

export class PrismaTrashMapper {
  static toPrisma(trash: Trash) {
    return {
      id: trash.id,
      title: trash.title,
      content: trash.content,
      limitDay: trash.limitDay,
      limitMonth: trash.limitMonth,
      limitYear: trash.limitYear,     
      done: trash.done,
      deletedAt: trash.createdAt,
    };
  }

  static toDomain(raw: RawTrash): Trash {
    return new Trash(
      {
        title: raw.title,
        content: raw.content,
        limitDay: raw.limitDay,
        limitMonth: raw.limitMonth,
        limitYear: raw.limitYear,       
        done: raw.done,
        createdAt: raw.createdAt,
        deletedAt: raw.deletedAt,
      },
      raw.id
    );
  }
}
