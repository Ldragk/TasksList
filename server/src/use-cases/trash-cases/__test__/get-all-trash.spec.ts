import { describe, it, expect, vi } from "vitest";
import { InMemoryTrashRepository } from "../../../repositories/in-memory-repository/in-memory-trash-repository";
import { MakeTrash } from "../../../test/factories/trash-factory";
import { AllTrash } from "../get-all-trash";

describe("Get all trash tasks", () => {
  it("should return all trash tasks", async () => {
    const trashRepository = new InMemoryTrashRepository();

    const allTrash = new AllTrash(trashRepository);

    const trashTask = MakeTrash();
    const called = vi.spyOn(trashRepository, "create");

    for (let i = 0; i < 5; ) {
      await trashRepository.create(trashTask);
      i++;
    }

    const { trash } = await allTrash.execute();

    expect(called).toHaveBeenCalledTimes(5);
    expect(trashRepository.trash).toHaveLength(5);
    expect(trash).toHaveLength(5);
  });
});
