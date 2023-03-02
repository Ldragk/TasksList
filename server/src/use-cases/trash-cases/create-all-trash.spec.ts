import { describe, it, expect, vi } from "vitest";
import { InMemoryManageRepository } from "../../repositories/in-memory-repository/in-memory-manage-repository";
import { InMemoryTrashRepository } from "../../repositories/in-memory-repository/in-memory-trash-repository";
import { MakeTask } from "../../test/factories/task.factory";
import { CreateAllTrash } from "./Create-all-trash";
import { CreateTrash } from "./Create-trash";

describe("Create all deleted tasks", () => {
  it("should create all deleted tasks", async () => {
    const taskRepository = new InMemoryManageRepository();
    const trashRepository = new InMemoryTrashRepository();

    const create = new CreateAllTrash(trashRepository);

    const task = MakeTask();
    const called = vi.spyOn(taskRepository, "create");

    await taskRepository.create(task);
    await taskRepository.create(task);
    await taskRepository.create(task);

    const { createTrash } = await create.execute();

    expect(called).toHaveBeenCalledTimes(3);
    expect(taskRepository.tasks).toHaveLength(3);
    expect(trashRepository.trash).toHaveLength(1);
  });
});
