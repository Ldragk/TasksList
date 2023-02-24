import { Task, TaskProps } from "../../entities/Task";
import { Content } from "../../entities/task-entities/Content";
import { LimitDate } from "../../entities/task-entities/LimitDate";

type Override = Partial<TaskProps>;

export function MakeTask(overrides: Override = {}) {
  return new Task({
    title: "title",
    content: new Content("content"),
    date: new LimitDate("02/23/2024"),
    done: false,
    ...overrides,
  });
}
