import { ObjectId } from 'bson';
import { prisma } from '@src/prisma/prisma-client';
import AuthService from '@src/use-cases/auth';
import { PrismaUserRepository } from '@src/prisma/repositories/users/prisma-user-repository';

describe('manage controller Testing', () => {
    const defaultUser = {
        name: 'John Doe',
        email: 'john@gmail.com',
        password: '1aS@3$4%sF',
    };
    let token: string;

    beforeEach(async () => {
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

    afterAll(async () => {
        await prisma.task.deleteMany({})
        await prisma.deletedTask.deleteMany({});
        await prisma.user.deleteMany({});;
    });

    const dateFormat = `Format: Date must be a string and separated by slashes '/', with the following format: month/day/year.`;

    it('Should return 201 Created when a valid task is submitted.', async () => {
        const createTask = {
            "title": "task title",
            "content": "task content",
            "date": "01/10/3024",
            "done": true
        };

        const response = await (global.testRequest.post('/tasks/create')).set('x-access-token', token).send(createTask);

        expect(response.status).toBe(201);
        expect(ObjectId.isValid(response.body.id)).toBe(true);
        expect(ObjectId.isValid(response.body.userId)).toBe(true);
        expect(response.body).toEqual(expect.objectContaining({
            id: expect.any(String),
            title: 'task title',
            content: 'task content',
            date: {
                month: 1,
                day: 10,
                year: 3024,
            },
            done: true,
            createdAt: new Date(new Date().setSeconds(0, 0)).toISOString(),
            userId: expect.any(String),
        }));
    });

    it('Should return 500 Internal Server Error when an invalid date value is submitted.', async () => {
        const createTask = {
            "title": "task title",
            "content": "task content",
            "date": "01/10/2022",
            "done": true
        };
        const response = await global.testRequest.post('/tasks/create').set('x-access-token', token).send(createTask);

        expect(response.status).toBe(500);
        expect(response.body.message).toEqual(
            `Invalid date format! ${dateFormat} - Year must be greater than or equal to the current year and consist of 4 digits.`);
    });

    it('Should return 400 Bad Request when a invalid type is submitted.', async () => {
        const createTask = {
            "title": "task title",
            "content": "task content",
            "date": "01/10/2024",
            "done": 2
        };
        const response = await global.testRequest.post('/tasks/create').set('x-access-token', token).send(createTask);

        expect(response.status).toBe(400);
        expect(response.body.cause).toEqual(
            `The Argument done with value 2 of Int type, is not valid. Expected type Boolean.`
        );
    });

    it('Should return 200 OK when valid change in the task is submitted.', async () => {
        const createTask = {
            "title": "task title",
            "content": "task content",
            "date": "01/10/3024",
            "done": false
        };

        const response = await global.testRequest.post('/tasks/create').set('x-access-token', token).send(createTask);
        const patchResponse = await global.testRequest
            .patch(`/tasks/change/${response.body.id}`).set('x-access-token', token).send();

        expect(patchResponse.status).toBe(200);
        expect(ObjectId.isValid(patchResponse.body.id)).toBe(true);
        expect(patchResponse.body).toEqual(expect.objectContaining({
            id: expect.any(String),
            title: 'task title',
            content: 'task content',
            date: {
                month: 1,
                day: 10,
                year: 3024,
            },
            done: true,
            createdAt: new Date(new Date().setSeconds(0, 0)).toISOString(),
            updatedAt: new Date(new Date().setSeconds(0, 0)).toISOString(),
        }));
    })

    it('Should return 404 Not Found when invalid id is submitted.', async () => {
        const createTask = {
            "title": "task title",
            "content": "task content",
            "date": "01/10/3024",
            "done": false
        };

        const response = await global.testRequest.post('/tasks/create').set('x-access-token', token).send(createTask);
        const patchResponse = await global.testRequest
            .patch(`/tasks/change/64840f32a529c18f2243a272`).set('x-access-token', token).send();

        expect(patchResponse.status).toBe(404);
        expect(ObjectId.isValid(patchResponse.body.id)).toBe(false);
        expect(patchResponse.body.cause).toEqual("Invalid id. Task not found.");
        expect(patchResponse.body.message).toEqual(
            `The id should be in the ObjectID format. If the format is correct, there is no task with the requested id.`);
    })

    it('Should return 200 OK when valid change is submitted.', async () => {
        const createTask = {
            "title": "task title",
            "content": "task content",
            "date": "01/10/3024",
        };

        const updatedTask = {
            "title": "task title updated",
            "content": "task content updated",
            "date": "01/10/3024",
            "done": true
        };

        const response = await global.testRequest.post('/tasks/create').set('x-access-token', token).send(createTask);
        const putResponse = await global.testRequest
            .put(`/tasks/fullChange/${response.body.id}`).set('x-access-token', token).send(updatedTask);

        expect(putResponse.status).toBe(200);
        expect(ObjectId.isValid(putResponse.body.id)).toBe(true);
        expect(putResponse.body).toEqual(expect.objectContaining({
            id: expect.any(String),
            title: 'task title updated',
            content: 'task content updated',
            date: {
                month: 1,
                day: 10,
                year: 3024,
            },
            done: true,
            createdAt: new Date(new Date().setSeconds(0, 0)).toISOString(),
        }));
    })

    it('Should return 500 Internal Server Error when invalid change value is submitted', async () => {
        const createTask = {
            "title": "task title",
            "content": "task content",
            "date": "01/10/3024",
            "done": false
        };

        const updatedTask = {
            "title": "task title updated",
            "content": "2",
            "date": "01/10/3024",
            "done": true
        };

        const response = await global.testRequest.post('/tasks/create').set('x-access-token', token).send(createTask);
        const putResponse = await global.testRequest
            .put(`/tasks/fullChange/${response.body.id}`).set('x-access-token', token).send(updatedTask);

        expect(putResponse.status).toBe(500);
        expect(putResponse.body.message).toEqual("Content must be between 5 and 250 characters");
    });

    it('Should return 400 Bad Request when invalid type is submitted', async () => {
        const createTask = {
            "title": "task title",
            "content": "task content",
            "date": "01/10/3024",
            "done": false
        };

        const updatedTask = {
            "title": "task title updated",
            "content": "task content updated",
            "date": "01/10/3024",
            "done": 2
        };

        const response = await global.testRequest.post('/tasks/create').set('x-access-token', token).send(createTask);
        const putResponse = await global.testRequest
            .put(`/tasks/fullChange/${response.body.id}`).set('x-access-token', token).send(updatedTask);

        expect(putResponse.status).toBe(400);
        expect(putResponse.body.cause).toEqual(
            'The Argument done with value 2 of Int type, is not valid. Expected type Boolean');
    });

});
