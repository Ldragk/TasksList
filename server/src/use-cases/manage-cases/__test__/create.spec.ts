import { it, describe, expect } from "vitest";
import { Task } from "@src/entities/task";
import { InMemoryManageRepository } from "@src/repositories/in-memory-repository/in-memory-manage-repository";
import { CreateTask } from "../create";

describe("Create Task Use Case", () => {
  const dateFormat = `Format: Date must be a string and separated by slashes '/', with the following format: month/day/year.`;

  it("should be able to create a valid task", async () => {
    const tasksRepository = new InMemoryManageRepository();
    const createTask = new CreateTask(tasksRepository);
    const { task } = await createTask.execute({
      title: "title",
      content: "content",
      date: "02/23/2024",
      done: false,
    });
    expect(tasksRepository.tasks).toHaveLength(1);
    expect(tasksRepository.tasks[0]).toEqual(task);
    expect(tasksRepository.tasks[0]).toBeInstanceOf(Task);
  });

  it("Should not be able to create a task with a date earlier than the current one", async () => {
    const tasksRepository = new InMemoryManageRepository();
    const createTask = new CreateTask(tasksRepository);

    await expect(
      new Promise((resolve, reject) => {
        createTask.execute({
          title: "title",
          content: "content",
          date: "02/23/2022",
          done: false,
        }).then(resolve).catch(reject);
      })
    ).rejects.toThrow(new Error(`
        Invalid date format!       
        ${dateFormat}     
        - Year must be greater than or equal to the current year and consist of 4 digits.`));  
    expect(tasksRepository.tasks).toHaveLength(0); 
  });

  it("should not be able to create a task with invalid date in year length", async () => {
    const tasksRepository = new InMemoryManageRepository();
    const createTask = new CreateTask(tasksRepository);

    await expect(
      new Promise((resolve, reject) => {
        createTask.execute({
          title: "title",
          content: "content",
          date: "02/23/202",
          done: false,
        }).then(resolve).catch(reject);
      })
    ).rejects.toThrow(new Error(`
        Invalid date format!       
        ${dateFormat}     
        - Year must be greater than or equal to the current year and consist of 4 digits.`));  
    expect(tasksRepository.tasks).toHaveLength(0); 
  });

  it("should not be able to create a task with invalid date in month", async () => {
    const tasksRepository = new InMemoryManageRepository();
    const createTask = new CreateTask(tasksRepository);

    await expect(
      new Promise((resolve, reject) => {
        createTask.execute({
          title: "title",
          content: "content",
          date: "13/23/2024",
          done: false,
        }).then(resolve).catch(reject);
      })
    ).rejects.toThrow(new Error(`
        Invalid date format!       
        ${dateFormat}     
        - Month must be between 1 and 12.`));  
    expect(tasksRepository.tasks).toHaveLength(0); 
  });

  it("should not be able to create a task with invalid date in day", async () => {
    const tasksRepository = new InMemoryManageRepository();
    const createTask = new CreateTask(tasksRepository);

    await expect(
      new Promise((resolve, reject) => {
        createTask.execute({
          title: "title",
          content: "content",
          date: "11/32/2024",
          done: false,
        }).then(resolve).catch(reject);
      })
    ).rejects.toThrow(new Error(`
        Invalid date format!       
        ${dateFormat}     
        - Day must be between 1 and the last day of the respective month.`));  
    expect(tasksRepository.tasks).toHaveLength(0); 
  });

  it("should not be able to create a task with invalid date in month and year", async () => {
    const tasksRepository = new InMemoryManageRepository();
    const createTask = new CreateTask(tasksRepository);

    await expect(
      new Promise((resolve, reject) => {
        createTask.execute({
          title: "title",
          content: "content",
          date: "13/23/2022",
          done: false,
        }).then(resolve).catch(reject);
      })
    ).rejects.toThrow(new Error(`
        Invalid date format!       
        ${dateFormat}     
        - Month must be between 1 and 12.
        - Year must be greater than or equal to the current year and consist of 4 digits.`));  
    expect(tasksRepository.tasks).toHaveLength(0); 
  });

  it("should not be able to create a task with invalid date in month, day and year", async () => {
    const tasksRepository = new InMemoryManageRepository();
    const createTask = new CreateTask(tasksRepository);

    await expect(
      new Promise((resolve, reject) => {
        createTask.execute({
          title: "title",
          content: "content",
          date: "13/32/2022",
          done: false,
        }).then(resolve).catch(reject);
      })
    ).rejects.toThrow(new Error(`
        Invalid date format!       
        ${dateFormat}     
        - Month must be between 1 and 12.
        - Day must be between 1 and the last day of the respective month.
        - Year must be greater than or equal to the current year and consist of 4 digits.`));  
    expect(tasksRepository.tasks).toHaveLength(0); 
  });
});


