import { prisma } from "@src/prisma/prisma-client";
import { PrismaUserRepository } from "@src/prisma/repositories/users/prisma-user-repository";
import AuthService from "@src/use-cases/auth";
import { describe } from "vitest";

describe('get controller testing', () => {
    const createTask = {
        "title": "task title",
        "content": "task content",
        "date": "01/10/3024",
    };

    const defaultUser = {
        name: 'John Doe',
        email: 'john@gmail.com',
        password: '1aS@3$4%sF',
    };
    let token: string;

    beforeAll(async () => {
        const numberOfTasksToBeCreated: number = 3
        const numberOfDifferentTasksToBeCreated: number = 2
        const numberOfOverdueTasksToBeCreated: number = 2
        const createTaskPromises = [];

        const prismaUserRepository = new PrismaUserRepository();
        const user = await global.testRequest.post('/users').send(defaultUser);

        const { id, ...others } = user.body

        token = AuthService.generateToken({
            _id: id,
            ...others
        });

        for (let i = 0; i < numberOfTasksToBeCreated; i++) {
            const { body } = await global.testRequest.post('/tasks/create').set('x-access-token', token).send(createTask);
            createTaskPromises.push(body);
        }

        for (let i = 0; i < numberOfDifferentTasksToBeCreated; i++) {
            const { body } = await global.testRequest.post('/tasks/create').set('x-access-token', token).send({
                ...createTask,
                "date": "02/15/3025",
                "done": true,
            });
            createTaskPromises.push(body);
        }

        for (let i = 0; i < numberOfOverdueTasksToBeCreated; i++) {
            const { body } = await global.testRequest.post('/tasks/create').set('x-access-token', token).send({
                ...createTask,
                "date": "02/15/2023",
            });
            createTaskPromises.push(body);
        }

        await Promise.all(createTaskPromises);
    });

    afterAll(async () => {
        await prisma.task.deleteMany({})
        await prisma.user.deleteMany({});
    });

    describe('get all tasks', () => {

        it('Should returned all tasks', async () => {
            const response = await global.testRequest.get('/tasks/all').set('x-access-token', token);

            expect(response.status).toBe(200);
            expect(response.body).toHaveLength(7);
        });

    });

    describe('get tasks by full date', () => {

        it('Should returned task on the specified date', async () => {
            const response = await global.testRequest.get('/tasks/date/02/15/3025').set('x-access-token', token);

            expect(response.status).toBe(200);
            expect(response.body).toHaveLength(2);
        });

        it(`Should returned empty array when the specified date don't match tasks`, async () => {
            const response = await global.testRequest.get('/tasks/date/03/15/3025').set('x-access-token', token);

            expect(response.status).toBe(200);
            expect(response.body).toHaveLength(0);
        });

    });

    describe('get tasks by month', () => {

        it('Should returned task on the specified month', async () => {
            const response = await global.testRequest.get('/tasks/month/02/3025').set('x-access-token', token);

            expect(response.status).toBe(200);
            expect(response.body).toHaveLength(2);
        });

        it(`Should returned empty array when the specified month don't match tasks`, async () => {
            const response = await global.testRequest.get('/tasks/month/03/3025').set('x-access-token', token);

            expect(response.status).toBe(200);
            expect(response.body).toHaveLength(0);
        });

    });

    describe('get tasks by year', () => {

        it('Should returned task on the specified year', async () => {
            const response = await global.testRequest.get('/tasks/year/3025').set('x-access-token', token);

            expect(response.status).toBe(200);
            expect(response.body).toHaveLength(2);
        });

        it(`Should returned empty array when the specified year don't match tasks`, async () => {
            const response = await global.testRequest.get('/tasks/year/3026').set('x-access-token', token);

            expect(response.status).toBe(200);
            expect(response.body).toHaveLength(0);
        });

    });

    describe('get tasks by overdue', async () => {

        it('Should returned overdue tasks', async () => {
            const response = await global.testRequest.get('/tasks/overdue').set('x-access-token', token);

            expect(response.status).toBe(200);
            expect(response.body).toHaveLength(2);
        });

    });

    describe('get tasks by done', async () => {        

        it('Should returned not done tasks', async () => {
            const response = await global.testRequest.get('/tasks/done/0').set('x-access-token', token);

            expect(response.status).toBe(200);
            expect(response.body).toHaveLength(5);
        });


        it('Should returned done tasks', async () => {
            const response = await global.testRequest.get('/tasks/done/1').set('x-access-token', token);

            expect(response.status).toBe(200);
            expect(response.body).toHaveLength(2);
        });

    });    
});