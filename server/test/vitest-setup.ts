import { SetupServer } from '@src/server';
import supertest from 'supertest';

let server: SetupServer;
beforeAll(async () => {
    server = new SetupServer();
    await server.init();
    global.testRequest = supertest(server.getApp());
});

afterAll(async () => {

    const response = await global.testRequest.get('/tasks/all');
    const createdTasks = response.body;

    if (Array.isArray(createdTasks)) {
        for (const task of createdTasks) {
            await global.testRequest.delete(`/tasks/delete/unique/${task.id}`);
        }
    } else {
        Object.values(createdTasks).forEach(async (task: any) => {
            await global.testRequest.delete(`/tasks/delete/unique/${task.id}`);
        });
    }

    await server.close()
}, 50000);



