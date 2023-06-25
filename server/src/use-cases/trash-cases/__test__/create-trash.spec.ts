import { InMemoryManageRepository } from "@src/repositories/in-memory-repository/in-memory-manage-repository";
import { InMemoryTrashRepository } from "@src/repositories/in-memory-repository/in-memory-trash-repository";
import { MakeTask } from "@src/test/factories/task-factory";
import { CreateTrash } from "../create-trash";

describe("Create deleted tasks", () => {

  const userId = "fake-userId"

  it("should create deleted tasks", async () => {
    const taskRepository = new InMemoryManageRepository();
    const trashRepository = new InMemoryTrashRepository();

    const create = new CreateTrash(trashRepository, taskRepository);

    const task = MakeTask();
    const calledTask = vi.spyOn(taskRepository, "create");
    const calledTrash = vi.spyOn(trashRepository, "create");

    for (let i = 0; i < 3;) {
      await taskRepository.create(task);
      i++;
    }

    const id = taskRepository.tasks[0].id;
    const { createTrash } = await create.execute(userId, id);

    expect(calledTask).toHaveBeenCalledTimes(3);
    expect(calledTrash).toHaveBeenCalledTimes(1);
    expect(taskRepository.tasks).toHaveLength(3);
    expect(trashRepository.trash).toHaveLength(1);
  });
});
