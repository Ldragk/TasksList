import { ObjectId } from 'bson';

describe('Post route Testing', () => {
  const dateFormat = `Format: Date must be a string and separated by slashes '/', with the following format: month/day/year.`;

  it('Should return 201 created', async () => {
    const createTask = {
      "title": "task title",
      "content": "task content",
      "date": "01/10/2024",
      "done": true
    };
    const response = await global.testRequest.post('/tasks/create').send(createTask);

    expect(response.status).toBe(201);
    expect(ObjectId.isValid(response.body.id)).toBe(true);
    expect(response.body).toEqual(expect.objectContaining({
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
    }));
  });

  it('Should return 500 Internal Server Error', async () => {
    const createTask = {
      "title": "task title",
      "content": "task content",
      "date": "01/10/2022",
      "done": true
    };
    const response = await global.testRequest.post('/tasks/create').send(createTask);

    expect(response.status).toBe(500);
    expect(response.body.message).toEqual(
      `Invalid date format! ${dateFormat} - Year must be greater than or equal to the current year and consist of 4 digits.`);
  });

  it('Should return 400 Bad Request', async () => {
    const createTask = {
      "title": "task title",
      "content": "task content",
      "date": "01/10/2024",
      "done": 2
    };
    const response = await global.testRequest.post('/tasks/create').send(createTask);

    expect(response.status).toBe(400);
    expect(response.body.cause).toEqual(
      `The Argument done with value 2 of Int type, is not valid. Expected type Boolean.`);
  });

});
