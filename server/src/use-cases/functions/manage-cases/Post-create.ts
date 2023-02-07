import { Task } from "../../../entities/Task";
import { TaskRecipientRepository } from "../../../repositories/Query-repository";

export class CreateTaskBody {
  limitDay(limitDay: any) {
    throw new Error("Method not implemented.");
  }
  limitMonth(limitMonth: any) {
    throw new Error("Method not implemented.");
  }
  limitYear(limitYear: any) {
    throw new Error("Method not implemented.");
  }
  title: any;
  description: any;
  constructor(private taskRepository: TaskRecipientRepository) {}

  async createTask(props: Task): Promise<void> {
    const prismaTaskRecipientRepository = new Task({
      title: props.title,
      description: props.description,
      limitDay: props.limitDay,
      limitMonth: props.limitMonth,
      limitYear: props.limitYear,
      date: `${props.limitMonth}/${props.limitDay}/${props.limitYear}`,
      done: props.done,
    });

    return await this.taskRepository.create(prismaTaskRecipientRepository);
  }
}
