import { expect } from "vitest";
import { Task } from "./Task";
import { it, describe } from "vitest";
import { Content } from "./task-entities/Content";
import { LimitDate } from "./task-entities/LimitDate";
import { currentYear } from "./task-entities/LimitDate.spec";

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
