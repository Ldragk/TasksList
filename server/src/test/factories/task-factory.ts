import { Task, TaskProps } from "@src/entities/task";
import { LimitDate } from "@src/entities/task-entities/limitDate";

type Override = Partial<TaskProps>;

export function MakeTask(overrides: Override = {}) {
  return new Task({
    title: "title",
    content: "content",
    date: new LimitDate("02/23/2024"),
    done: false,
    userId: "fake-userId",
    ...overrides,
  });
}
