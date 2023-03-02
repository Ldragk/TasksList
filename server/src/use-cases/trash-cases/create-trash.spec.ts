import { describe, it, expect, vi } from "vitest";
import { InMemoryDeleteRepository } from "../../repositories/in-memory-repository/in-memory-delete-repository";
import { InMemoryFindRepository } from "../../repositories/in-memory-repository/in-memory-find-repository";
import { InMemoryTrashRepository } from "../../repositories/in-memory-repository/in-memory-trash-repository";
import { MakeTask } from "../../test/factories/task.factory";
import { DeleteTask } from "../delete-cases/Delete-task";
import { CreateTrash } from "./Create-trash";

describe("get by deleted tasks", () => {
  it("should return all deleted tasks", async () => {
    const deleteRepository = new InMemoryDeleteRepository();
    const trashRepository = new InMemoryTrashRepository();

    

    const trashCreate = new CreateTrash(
      trashRepository,
      new InMemoryFindRepository()
    );
    const deleteTask = new DeleteTask(deleteRepository);

    let task = MakeTask();

    const called = vi.spyOn(deleteRepository, "create");
    await deleteRepository.create(task);
    await deleteRepository.create(task);
    await deleteRepository.create(task);

   
    

    const { createTrash } = await trashCreate.execute(
        deleteRepository.tasks[0].id
    );

    
    

    expect(deleteRepository.tasks).toHaveLength(3);

    const { deleteTrash } = await deleteTask.execute(
      deleteRepository.tasks[0].id
    );
    expect(called).toHaveBeenCalledTimes(3);
    expect(deleteRepository.tasks).toHaveLength(2);

    // expect(trashRepository.trash).toHaveLength(1);
  });
});
