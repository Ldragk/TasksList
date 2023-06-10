import { InMemoryDeleteRepository } from "@src/repositories/in-memory-repository/in-memory-delete-repository";
import { MakeTask } from "@src/test/factories/task-factory";
import { DeleteTask } from "../delete-task";

describe("Deleted tasks", () => {
  it("should return deleted tasks", async () => {
    const deleteRepository = new InMemoryDeleteRepository();
    const deleteTask = new DeleteTask(deleteRepository);

    const task = MakeTask();

    const called = vi.spyOn(deleteRepository, "create");

    for (let i = 0; i < 3; ) {
      await deleteRepository.create(task);
      i++
    }

    expect(deleteRepository.tasks).toHaveLength(3);
    const { deleteTrash } = await deleteTask.execute(
      deleteRepository.tasks[0].id
    );
    expect(called).toHaveBeenCalledTimes(3);
    expect(deleteRepository.tasks).toHaveLength(2);
  });
});
