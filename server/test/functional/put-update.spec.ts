import { ObjectId } from "bson";

describe('Put route Testing', () => {

    it('Should return 200 OK', async () => {
        const createTask = {
            "title": "task title",
            "content": "task content",
            "date": "01/10/2024",
            "done": false
        };

        const updatedTask = {
            "title": "task title updated",
            "content": "task content updated",
            "date": "01/10/2024",
            "done": true
        };

        const response = await global.testRequest.post('/tasks/create').send(createTask);
        const putResponse = await global.testRequest
            .put(`/tasks/fullChange/${response.body.id}`).send(updatedTask);

        expect(putResponse.status).toBe(200);
        expect(ObjectId.isValid(putResponse.body.id)).toBe(true);
        expect(putResponse.body).toEqual(expect.objectContaining({
            id: expect.any(String),
            title: 'task title updated',
            content: 'task content updated',
            date: {
                month: 1,
                day: 10,
                year: 2024,
            },
            done: true,
            createdAt: new Date(new Date().setSeconds(0, 0)).toISOString(),
        }));
    })

    it('Should return 500 Internal Server Error', async () => {
        const createTask = {
            "title": "task title",
            "content": "task content",
            "date": "01/10/2024",
            "done": false
        };

        const updatedTask = {
            "title": "task title updated",
            "content": "2",
            "date": "01/10/2024",
            "done": true
        };

        const response = await global.testRequest.post('/tasks/create').send(createTask);
        const putResponse = await global.testRequest
            .put(`/tasks/fullChange/${response.body.id}`).send(updatedTask);

        expect(putResponse.status).toBe(500);
        expect(putResponse.body.message).toEqual("Content must be between 5 and 250 characters");
    });

    it('Should return 400 Bad Request', async () => {
        const createTask = {
            "title": "task title",
            "content": "task content",
            "date": "01/10/2024",
            "done": false
        };

        const updatedTask = {
            "title": "task title updated",
            "content": "task content updated",
            "date": "01/10/2024",
            "done": 2
        };

        const response = await global.testRequest.post('/tasks/create').send(createTask);
        const putResponse = await global.testRequest
            .put(`/tasks/fullChange/${response.body.id}`).send(updatedTask);

        expect(putResponse.status).toBe(400);
        expect(putResponse.body.cause).toEqual(
            'The Argument done with value 2 of Int type, is not valid. Expected type Boolean');
    });
})


