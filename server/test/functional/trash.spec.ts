import { prisma } from "@src/prisma/prisma-client";
import { PrismaUserRepository } from "@src/prisma/repositories/users/prisma-user-repository";
import { MakeTask } from "@src/test/factories/task-factory";
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

            let trashBody, trashStatus;

            for (let i = 0; i < numberOfTasksToBeCreated; i++) {
                const { body } = await global.testRequest.post('/tasks/create').set('x-access-token', token).send(createTask)
                createTaskPromises.push(body);
            }
            await Promise.all(createTaskPromises);

            while (createTaskPromises.length !== 2) {
                await new Promise(resolve => setTimeout(resolve, 100));
            }

            if (createTaskPromises.length === 2) {
                const { status } = await global.testRequest.delete('/tasks/delete/all').set('x-access-token', token);

                if (status === 201) {
                    const { body, status } = await global.testRequest.get('/trash/all').set('x-access-token', token);
                    trashStatus = status
                    trashBody = body
                }
            }
            expect(trashStatus).toBe(200);
            
        });
    })

    describe('Delete all trash', () => {

        // async function waitForCondition(condition: () => boolean): Promise<void> {
        //     while (!condition()) {
        //         await new Promise(resolve => setTimeout(resolve, 1000));
        //     }
        // }

        it('Should returned 200 OK and delete all trash', async () => {

            const numberOfTasksToBeCreated: number = 2
            const createTaskPromises: Promise<any>[] = [];
            let
                beforeGetAll,
                afterGetAll,
                deleteTaskResponse,
                deleteTaskResponseStatus,
                delStatus;

            for (let i = 0; i < numberOfTasksToBeCreated; i++) {
                const { body } = await global.testRequest.post('/tasks/create').set('x-access-token', token).send(createTask)
                createTaskPromises.push(body);
            }
            await Promise.all(createTaskPromises);            

            while (createTaskPromises.length !== 2) {
                await new Promise(resolve => setTimeout(resolve, 100));
            }

            if (createTaskPromises.length === 2) {
                const { status } = await global.testRequest.delete('/tasks/delete/all').set('x-access-token', token);

                beforeGetAll = await prisma.deletedTask.findMany({});

                if (status === 201) {
                    const { status } = await global.testRequest.delete('/trash/delete/all').set('x-access-token', token).then((res) => res);
                    delStatus = status
                    afterGetAll = await prisma.deletedTask.findMany({});
                }
            }
            expect(delStatus).toBe(200);
            expect(beforeGetAll).toHaveLength(2);
            expect(afterGetAll).toHaveLength(0);
        })
    })
});