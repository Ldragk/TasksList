import { DeletedTask as RawTrash } from "@prisma/client";
import { Trash } from "../../../entities/Trash";

export class PrismaTrashMapper {
  static toPrisma(trash: Trash) {
    return {
      id: trash.id,
      title: trash.title,
      description: trash.description,
      limitDay: trash.limitDay,
      limitMonth: trash.limitMonth,
      limitYear: trash.limitYear,
      date: trash.date,
      done: trash.done,
      deletedAt: trash.createdAt,      
    };
  }

  static toDomain(raw: RawTrash): Trash {
    return new Trash({      
      title: raw.title,
      description: raw.description,
      limitDay: raw.limitDay,
      limitMonth: raw.limitMonth,
      limitYear: raw.limitYear,
      date: raw.date,
      done: raw.done,
      createdAt: raw.createdAt,
      deletedAt: raw.deletedAt,
    },
    raw.id,
    );
  }
}
