import { DeletedTask as RawTrash } from "@prisma/client";
import { Trash } from "@src/entities/trash";

export class PrismaTrashMapper {
  static toPrisma(trash: Trash) {
    return {
      id: trash.id,
      title: trash.title,
      content: trash.content,
      date: trash.date,
      done: trash.done,
      deletedAt: trash.deleted(),
    };
  }

  static toDomain(raw: RawTrash): Trash {
    return new Trash(
      {
        title: raw.title,
        content: raw.content,
        date: raw.date,
        done: raw.done,
        createdAt: raw.createdAt,
        deletedAt: raw.deletedAt,
      },
      raw.id
    );
  }
}
