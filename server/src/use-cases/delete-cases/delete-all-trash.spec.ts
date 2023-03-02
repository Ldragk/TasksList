import { describe, it, expect, vi } from "vitest";
import { InMemoryTrashDeleteRepository } from "../../repositories/in-memory-repository/in-memory-delete-trash-repository";
import { MakeTrash } from "../../test/factories/trash.factory";
import { DeleteAllTrash } from "./Delete-all-trash";

describe("Deleted all trash", () => {
  it("should return all deleted trash", async () => {
    const deleteRepository = new InMemoryTrashDeleteRepository();
    const trashDelete = new DeleteAllTrash(deleteRepository);

    let Trash = MakeTrash();

    const called = vi.spyOn(deleteRepository, "create");

    for (let i = 0; i < 3; ) {
      await deleteRepository.create(Trash);
      i++;
    }

    expect(deleteRepository.trash).toHaveLength(3);
    const { deleteTrash } = await trashDelete.execute();
    expect(called).toHaveBeenCalledTimes(3);
    expect(deleteRepository.trash).toHaveLength(0);
  });
});
