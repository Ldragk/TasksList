import { describe, it, expect, vi } from "vitest";
import { InMemoryManageRepository } from "../../repositories/in-memory-repository/in-memory-manage-repository";
import { InMemoryTrashRepository } from "../../repositories/in-memory-repository/in-memory-trash-repository";
import { MakeTask } from "../../test/factories/task.factory";
import { CreateTrash } from "./Create-trash";

describe("get by deleted tasks", () => {
  it("should return deleted tasks", async () => {
    const taskRepository = new InMemoryManageRepository();
    const trashRepository = new InMemoryTrashRepository();

    const create = new CreateTrash(trashRepository, taskRepository);

    const task = MakeTask();
    const called = vi.spyOn(taskRepository, "create");

    await taskRepository.create(task);
    await taskRepository.create(task);
    await taskRepository.create(task);

    const id = taskRepository.tasks[0].id;
    const { createTrash } = await create.execute(id);

    expect(called).toHaveBeenCalledTimes(3);
    expect(taskRepository.tasks).toHaveLength(3);
    expect(trashRepository.trash).toHaveLength(1);
  });
});
