import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { ObjectId } from 'bson';

describe('Testing post route', () => {
  it('Deve retornar o status 200 e o resultado esperado', async () => {

    const createTask = {
      "title": "task title",
      "content": "task content",
      "date": "01/10/2024",
      "done": true
    }

    const response = await global.testRequest.post('/tasks/create').send(createTask);

    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      "id": expect.any(ObjectId),
      "title": "task title",
      "content": "task content",
      "date": {
        "month": 1,
        "day": 10,
        "year": 2024
      },
      "done": true,
      "createdAt": "2023-06-08T08:10:31.813Z"
    });
  });
});
  