import { Task } from "../task";
import { LimitDate } from "../task-entities/limitDate";
import { currentYear } from "../task-entities/__test__/limitDate.spec";

// TODO: Implement error handling tests. Ex: limitDate

describe("task", () => {
  it("should be able to create a valid task", () => {
    expect(
      () =>
        new Task({
          title: "Task 1",
          content: "Content 1",
          date: new LimitDate(`02/28/${currentYear}`),
          done: true,
          createdAt: new Date(),
          updatedAt: undefined,
          userId: expect.any(String),
        })
    ).toBeTruthy();
  });

  it("should be able to create a invalid task", () => {
    expect(
      () =>
        new Task({
          title: "",
          content: "asdf",
          date: new LimitDate(`02/29/2022`),
          createdAt: new Date(Date.now() - 1),
          updatedAt: new Date(),
          userId: expect.any(String),
        })
    ).toThrowError();
  });
});
