import { InMemoryQueryRepository } from "@src/repositories/in-memory-repository/in-memory-query-repository";
import { InMemoryTrashRepository } from "@src/repositories/in-memory-repository/in-memory-trash-repository";
import { MakeTask } from "@src/test/factories/task-factory";
import { CreateAllTrash } from "../create-all-trash";

describe("Create all deleted tasks", () => {
  it("should create all deleted tasks", async () => {
    const trashRepository = new InMemoryTrashRepository();
    const queryRepository = new InMemoryQueryRepository();

    const create = new CreateAllTrash(trashRepository, queryRepository);

    const task = MakeTask();
    const calledTask = vi.spyOn(queryRepository, "create");
    const calledTrash = vi.spyOn(trashRepository, "create");

    for (let i = 0; i < 3; ) {
      await queryRepository.create(task);
      i++;
    }    

    const { createTrash } = await create.execute(task.userId);    

    expect(calledTask).toHaveBeenCalledTimes(3);
    expect(calledTrash).toHaveBeenCalledTimes(3);
    expect(queryRepository.tasks).toHaveLength(3);
    expect(trashRepository.trash).toHaveLength(3);
  });
});
