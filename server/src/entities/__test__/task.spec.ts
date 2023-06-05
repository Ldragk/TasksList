import { expect } from "vitest";
import { Task } from "../task";
import { it, describe } from "vitest";
import { Content } from "../task-entities/content";
import { LimitDate } from "../task-entities/limitDate";
import { currentYear } from "../task-entities/__test__/limitDate.spec";

// TODO: Implement error handling tests. Ex: limitDate

describe("task", () => {
  it("should be able to create a valid task", () => {
    expect(
      () =>
        new Task({
          title: "Task 1",
          content: new Content("Content 1"),
          date: new LimitDate(`02/28/${currentYear}`),
          done: true,
          createdAt: new Date(),
          updatedAt: undefined,
        })
    ).toBeTruthy();
  });

  it("should be able to create a invalid task", () => {
    expect(
      () =>
        new Task({
          title: "",
          content: new Content("asdf"),
          date: new LimitDate(`02/29/2022`),
          createdAt: new Date(Date.now() - 1),
          updatedAt: new Date(),
        })
    ).toThrowError();
  });
});
