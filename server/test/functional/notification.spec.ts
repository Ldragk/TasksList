import { prisma } from "@src/prisma/prisma-client";
import { PrismaUserRepository } from "@src/prisma/repositories/users/prisma-user-repository";
import AuthService from "@src/use-cases/auth";
import { convertExcessDaysAtTheTurnOfTheMonth } from "@src/use-cases/notifications-cases/functions/convertExcessDaysAtTheTurnOfTheMonth";
import { numberOfDaysInTheMonth } from "@src/use-cases/notifications-cases/functions/numberOfDaysInTheMonth";

describe('Notification routes', () => {
    const year = new Date().getFullYear();
    const day = new Date().getDate();
    const month = new Date().getMonth();
    const targetDate = `${month + 1}/${day}/${year}`

    const notificationsWithinThePeriod = 15
    const date = convertExcessDaysAtTheTurnOfTheMonth(numberOfDaysInTheMonth(`${targetDate}`), notificationsWithinThePeriod)

    const createTask = {
        "title": "task title",
        "content": "task content",
        "date": `${date}`,
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

        const numberOfTasksToBeCreated: number = 3
        const numberOfDifferentTasksToBeCreated: number = 3
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
            const date = convertExcessDaysAtTheTurnOfTheMonth(numberOfDaysInTheMonth(`${targetDate}`), notificationsWithinThePeriod + 1 + (i * 2))
            console.log(date);

            const { body } = await global.testRequest.post('/tasks/create').set('x-access-token', token).send({
                ...createTask,
                "date": `${date}`,
                "done": false,
            });
            createTaskPromises.push(body);
        }
        const { body } = await global.testRequest.post('/tasks/create').set('x-access-token', token).send({
            ...createTask,
            "date": `${date}`,
            "done": true,
        });
        createTaskPromises.push(body);

        await Promise.all(createTaskPromises);
    }, 50000);

    afterAll(async () => {
        await prisma.task.deleteMany({})
        await prisma.deletedTask.deleteMany({});
        await prisma.user.deleteMany({});
    });

    it('Should return 200 OK when valid change is submitted, with param 0 (not "1").', async () => {
        const response = await global.testRequest.get(`/tasks/notifications/17/0`).set('x-access-token', token);

        expect(response.status).toBe(200);
        expect(response.body).toHaveLength(4);
    })

    it('Should return 200 OK when valid change is submitted with param "1".', async () => {
        const response = await global.testRequest.get(`/tasks/notifications/${notificationsWithinThePeriod}/1`).set('x-access-token', token);

        expect(response.status).toBe(200);
        expect(response.body).toHaveLength(3);
    })

    it('Should return 500 when the number of days in advance is greater than 25, regardless of the "anyway" parameter', async () => {
        const response = await global.testRequest.get(`/tasks/notifications/26/1`).set('x-access-token', token);

        expect(response.status).toBe(500);
        expect(response.body.message).toBe('The maximum number of days in advance is 25 days');
    })
})