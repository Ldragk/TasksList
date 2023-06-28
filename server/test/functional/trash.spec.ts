import { prisma } from "@src/prisma/prisma-client";
import { PrismaUserRepository } from "@src/prisma/repositories/users/prisma-user-repository";
import AuthService from "@src/use-cases/auth";

describe('Trash route', () => {
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
        await prisma.task.deleteMany({})
        await prisma.deletedTask.deleteMany({});
        await prisma.user.deleteMany({});;

        const prismaUserRepository = new PrismaUserRepository();
        const user = await global.testRequest.post('/users').send(defaultUser);

        const { id, ...others } = user.body

        token = AuthService.generateToken({
            _id: id,
            ...others
        });
    });

    beforeEach(async () => {
        await prisma.task.deleteMany({})
        await prisma.deletedTask.deleteMany({});
    });

    afterAll(async () => {
        await prisma.task.deleteMany({})
        await prisma.deletedTask.deleteMany({});
        await prisma.user.deleteMany({});
    });

    describe('Get all trash', () => {
        it('Should returned 200 OK and all trash', async () => {

            const numberOfTasksToBeCreated: number = 2
            const createTaskPromises = [];

            for (let i = 0; i < numberOfTasksToBeCreated; i++) {
                const { body } = await global.testRequest.post('/tasks/create').set('x-access-token', token).send(createTask);
                createTaskPromises.push(body);
            }
            await Promise.all(createTaskPromises);

            await global.testRequest.delete('/tasks/delete/all').set('x-access-token', token);
            const response = await global.testRequest.get('/trash/all').set('x-access-token', token);

            expect(response.status).toBe(200);
            expect(response.body).toHaveLength(2);
        });
    })

    describe('Delete all trash', () => {

        it('Should returned 200 OK and delete all trash', async () => {

            const numberOfTasksToBeCreated: number = 2
            const createTaskPromises = [];

            for (let i = 0; i < numberOfTasksToBeCreated; i++) {
                const { body } = await global.testRequest.post('/tasks/create').set('x-access-token', token).send(createTask);
                createTaskPromises.push(body);
            }
            await Promise.all(createTaskPromises);

            await global.testRequest.delete('/tasks/delete/all').set('x-access-token', token);
            const beforeGetAll = await prisma.deletedTask.findMany({});
            const response = await global.testRequest.delete('/trash/delete/all').set('x-access-token', token);
            const afterGetAll = await prisma.deletedTask.findMany({});

            expect(response.status).toBe(200);
            expect(beforeGetAll).toHaveLength(2);
            expect(afterGetAll).toHaveLength(0);
        })
    })
});