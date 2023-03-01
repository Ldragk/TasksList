import { describe, it, expect, vi } from "vitest";
import { InMemoryDeleteRepository } from "../../repositories/in-memory-repository/in-memory-delete-repository";
import { MakeTask } from "../../test/factories/task.factory";
import { DeleteAllTasks } from "./Delete-all-tasks";
import { DeleteTask } from "./Delete-task";

describe("get by deleted tasks", () => {
  it("should return all deleted tasks", async () => {
    const deleteRepository = new InMemoryDeleteRepository();
    const deleteTask = new DeleteTask(deleteRepository);

    let task = MakeTask();

    const called = vi.spyOn(deleteRepository, "create");

    await deleteRepository.create(task);
    await deleteRepository.create(task);
    await deleteRepository.create(task);

    expect(deleteRepository.tasks).toHaveLength(3);
    const { deleteTrash } = await deleteTask.execute(
      deleteRepository.tasks[0].id
    );
    expect(called).toHaveBeenCalledTimes(3);
    expect(deleteRepository.tasks).toHaveLength(2);
  });
});
