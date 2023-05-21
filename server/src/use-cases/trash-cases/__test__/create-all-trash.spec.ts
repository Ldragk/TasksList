import { describe, it, expect, vi } from "vitest";
import { InMemoryFindRepository } from "../../../repositories/in-memory-repository/in-memory-find-repository";
import { InMemoryManageRepository } from "../../../repositories/in-memory-repository/in-memory-manage-repository";
import { InMemoryTrashRepository } from "../../../repositories/in-memory-repository/in-memory-trash-repository";
import { MakeTask } from "../../../test/factories/task-factory";
import { CreateAllTrash } from "../create-all-trash";

describe("Create all deleted tasks", () => {
  it("should create all deleted tasks", async () => {
    const taskRepository = new InMemoryManageRepository();
    const trashRepository = new InMemoryTrashRepository();
    const findRepository = new InMemoryFindRepository();

    const create = new CreateAllTrash(trashRepository, findRepository);

    const task = MakeTask();
    const calledTask = vi.spyOn(taskRepository, "create");
    const calledTrash = vi.spyOn(trashRepository, "create");

    for (let i = 0; i < 3; ) {
      await taskRepository.create(task);
      i++;
    }

    const { createTrash } = await create.execute();

    expect(calledTask).toHaveBeenCalledTimes(3);
    expect(calledTrash).toHaveBeenCalledTimes(1);
    expect(taskRepository.tasks).toHaveLength(3);
    expect(trashRepository.trash).toHaveLength(3);
  });
});
