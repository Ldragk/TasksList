// import { prisma } from "@src/prisma/prisma-client";
// import { describe } from "vitest";

// describe('get controller testing', () => {
//     const createTask = {
//         "title": "task title",
//         "content": "task content",
//         "date": "01/10/3024",
//     };

//     beforeAll(async () => {
//         const numberOfTasksToBeCreated: number = 3
//         const numberOfDifferentTasksToBeCreated: number = 2
//         const createTaskPromises = [];

//         for (let i = 0; i < numberOfTasksToBeCreated; i++) {
//             const { body } = await global.testRequest.post('/tasks/create').send(createTask);
//             createTaskPromises.push(body);
//         }

//         for (let i = 0; i < numberOfDifferentTasksToBeCreated; i++) {
//             const { body } = await global.testRequest.post('/tasks/create').send({
//                 ...createTask,
//                 "date": "02/15/3025",
//                 "done": true,
//             });
//             createTaskPromises.push(body);
//         }
//         await Promise.all(createTaskPromises);
//     });

//     beforeEach(async () => {
//         await prisma.deletedTask.deleteMany()
//     });

//     it('Should returned all tasks', async () => {
//         const response = await global.testRequest.get('/tasks/all');

//         expect(response.status).toBe(200);
//         expect(response.body).toHaveLength(5);
//     });

//     it('Should returned task on the specified date', async () => {
//         const response = await global.testRequest.get('/tasks/date/02/15/3025');

//         expect(response.status).toBe(200);
//         expect(response.body).toHaveLength(2);
//     });
// });