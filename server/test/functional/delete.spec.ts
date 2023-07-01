import { prisma } from "@src/prisma/prisma-client";
import AuthService from "@src/use-cases/auth";

describe('delete task', () => {
    const numberOfTasksToBeCreated: number = 3
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
        await prisma.user.deleteMany({});

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
        await prisma.user.deleteMany({});;
    });

    describe('Delete one task by id', () => {

        it('should deleted task', async () => {
            const createTaskPromises = [];

            for (let i = 0; i < numberOfTasksToBeCreated; i++) {
                const { body } = await global.testRequest.post('/tasks/create').set('x-access-token', token).send(createTask);
                createTaskPromises.push(body);
            }
            await Promise.all(createTaskPromises);

            const response = await global.testRequest.delete(`/tasks/delete/unique/${createTaskPromises[0].id}`).set('x-access-token', token);
            const taskDB = await prisma.task.findMany()
            const trashDB = await prisma.deletedTask.findMany()   

            expect(response.status).toBe(201);
            expect(taskDB).toHaveLength(2);
            expect(trashDB).toHaveLength(1);
        });

        it('should return not found task when invalid id', async () => {
            const createTaskPromises = [];

            for (let i = 0; i < numberOfTasksToBeCreated; i++) {
                const { body } = await global.testRequest.post('/tasks/create').set('x-access-token', token).send(createTask);
                createTaskPromises.push(body);
            }
            await Promise.all(createTaskPromises);

            const response = await global.testRequest.delete('/tasks/delete/unique/invalid-id').set('x-access-token', token);
            const taskDB = await prisma.task.findMany()
            const trashDB = await prisma.deletedTask.findMany()   

            expect(response.status).toBe(404);
            expect(taskDB).toHaveLength(3);
            expect(trashDB).toHaveLength(0);
            expect(response.body.error).toEqual(
                'Not Found');
            expect(response.body.cause).toEqual(
                'Invalid id. Task not found.');
            expect(response.body.message).toEqual(
                'The id should be in the ObjectID format. If the format is correct, there is no task with the requested id.');
        });

    });

    describe('Delete all tasks', () => {

        it('should deleted all tasks', async () => {

            const createTaskPromises = [];

            for (let i = 0; i < numberOfTasksToBeCreated; i++) {
                const { body } = await global.testRequest.post('/tasks/create').set('x-access-token', token).send(createTask);
                createTaskPromises.push(body);               
            }
            await Promise.all(createTaskPromises);
           
            
            const response = await global.testRequest.delete('/tasks/delete/all').set('x-access-token', token);

            const taskDB = await prisma.task.findMany()
            const trashDB = await prisma.deletedTask.findMany()   

            expect(response.status).toBe(201);
            expect(taskDB).toHaveLength(0);
            expect(trashDB).toHaveLength(3);
        })
    })

});