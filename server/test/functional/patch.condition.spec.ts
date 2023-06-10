import { ObjectId } from 'bson';

describe('Patch route Testing', () => {

    it('Should return 200 OK', async () => {
        const createTask = {
            "title": "task title",
            "content": "task content",
            "date": "01/10/2024",
            "done": false
        };

        const response = await global.testRequest.post('/tasks/create').send(createTask);
        const patchResponse = await global.testRequest
            .patch(`/tasks/change/${response.body.id}`).send();

        expect(patchResponse.status).toBe(200);
        expect(ObjectId.isValid(patchResponse.body.id)).toBe(true);
        expect(patchResponse.body).toEqual(expect.objectContaining({
            id: expect.any(String),
            title: 'task title',
            content: 'task content',
            date: {
                month: 1,
                day: 10,
                year: 2024,
            },
            done: true,
            createdAt: new Date(new Date().setSeconds(0, 0)).toISOString(),
            updatedAt: new Date(new Date().setSeconds(0, 0)).toISOString(),
        }));
    })

    it('Should return 404 Not Found', async () => {
        const createTask = {
            "title": "task title",
            "content": "task content",
            "date": "01/10/2024",
            "done": false
        };

        const response = await global.testRequest.post('/tasks/create').send(createTask);
        const patchResponse = await global.testRequest
            .patch(`/tasks/change/64840f32a529c18f2243a272`).send();

        expect(patchResponse.status).toBe(404);
        expect(ObjectId.isValid(patchResponse.body.id)).toBe(false);
        expect(patchResponse.body.cause).toEqual("Invalid id. Task not found.");
        expect(patchResponse.body.message).toEqual(
            `The id should be in the ObjectID format. If the format is correct, there is no task with the requested id.`);
    })
});