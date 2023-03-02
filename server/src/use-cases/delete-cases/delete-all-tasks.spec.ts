import { describe, it, expect, vi } from "vitest";
import { InMemoryDeleteRepository } from "../../repositories/in-memory-repository/in-memory-delete-repository";
import { MakeTask } from "../../test/factories/task.factory";
import { DeleteAllTasks } from "./Delete-all-tasks";

describe("Deleted all tasks", () => {
  it("should return all deleted tasks", async () => {
    const deleteRepository = new InMemoryDeleteRepository();
    const deleteAllTasks = new DeleteAllTasks(deleteRepository);

    let task = MakeTask();

    const called = vi.spyOn(deleteRepository, "create");

    await deleteRepository.create(task);
    await deleteRepository.create(task);
    await deleteRepository.create(task);

    expect(deleteRepository.tasks).toHaveLength(3);
    const { deleteTrash } = await deleteAllTasks.execute();    
    expect(called).toHaveBeenCalledTimes(3);
    expect(deleteRepository.tasks).toHaveLength(0);
  });
});
