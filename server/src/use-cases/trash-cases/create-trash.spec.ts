import { describe, it, expect, vi } from "vitest";
import { InMemoryDeleteRepository } from "../../repositories/in-memory-repository/in-memory-delete-repository";
import { InMemoryManageRepository } from "../../repositories/in-memory-repository/in-memory-manage-repository";
import { InMemoryTrashRepository } from "../../repositories/in-memory-repository/in-memory-trash-repository";
import { MakeTask } from "../../test/factories/task.factory";
import { DeleteTask } from "../delete-cases/Delete-task";
import { CreateTrash } from "./Create-trash";

describe("get by deleted tasks", () => {
  it("should return deleted tasks", async () => {
    const taskRepository = new InMemoryDeleteRepository();
    const trashRepository = new InMemoryTrashRepository();

    const create = new CreateTrash(
      trashRepository,
      new InMemoryManageRepository()
    );
    const deleteTask = new DeleteTask(taskRepository);

    let task = MakeTask();
    await taskRepository.create(task);
    await taskRepository.create(task);
    await taskRepository.create(task);

    const called = vi.spyOn(taskRepository, "create");

    const id = taskRepository.tasks[0].id;
    const { createTrash } = await create.execute(id);

    // expect(deleteRepository.tasks).toHaveLength(3);

    // const { deleteTrash } = await deleteTask.execute(
    //   deleteRepository.tasks[0].id
    // );
    // expect(called).toHaveBeenCalledTimes(3);
    // expect(deleteRepository.tasks).toHaveLength(2);

    // expect(trashRepository.trash).toHaveLength(1);
  });
});
