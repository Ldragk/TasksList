import { DeletedTask as RawTrash } from "@prisma/client";
import { Trash } from "@src/entities/trash";
import { LimitDate } from "@src/entities/task-entities/limitDate";

export class PrismaTrashMapper {
  static toPrisma(trash: Trash) {
    return {
      id: trash.id,
      title: trash.title,
      content: trash.content,
      date: trash.date.value,
      done: trash.done,
      deletedAt: trash.deleted(),
      userId: trash.userId,
    };
  }

  static toDomain(raw: RawTrash): Trash {
    return new Trash(
      {
        title: raw.title,
        content: raw.content,
        date: new LimitDate(raw.date),
        done: raw.done,
        createdAt: raw.createdAt,
        deletedAt: raw.deletedAt,
        userId: raw.userId,
      },
      raw.id
    );
  }
}
