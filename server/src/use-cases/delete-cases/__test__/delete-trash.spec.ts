import { describe, it, expect, vi } from "vitest";
import { InMemoryTrashDeleteRepository } from "@src/repositories/in-memory-repository/in-memory-delete-trash-repository";
import { MakeTrash } from "@src/test/factories/trash-factory";
import { DeleteTrash } from "../delete-trash";

describe("Deleted trash", () => {
  it("should return deleted trash", async () => {
    const deleteRepository = new InMemoryTrashDeleteRepository();
    const trashDelete = new DeleteTrash(deleteRepository);

    let Trash = MakeTrash();

    const called = vi.spyOn(deleteRepository, "create");

    for (let i = 0; i < 3; ) {
      await deleteRepository.create(Trash);
      i++;
    }

    expect(deleteRepository.trash).toHaveLength(3);
    const { deleteTrash } = await trashDelete.execute(
      deleteRepository.trash[0].id
    );
    expect(called).toHaveBeenCalledTimes(3);
    expect(deleteRepository.trash).toHaveLength(2);
  });
});
