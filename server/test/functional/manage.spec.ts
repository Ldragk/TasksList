import { ObjectId } from 'bson';

describe('manage controller Testing', () => {
  const dateFormat = `Format: Date must be a string and separated by slashes '/', with the following format: month/day/year.`;

  it('Should return 201 Created when a valid task is submitted.', async () => {
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

  it('Should return 500 Internal Server Error when an invalid value is submitted.', async () => {
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

  it('Should return 400 Bad Request when a invalid type is submitted.', async () => {
    const createTask = {
      "title": "task title",
      "content": "task content",
      "date": "01/10/2024",
      "done": 2
    };
    const response = await global.testRequest.post('/tasks/create').send(createTask);

    expect(response.status).toBe(400);
    expect(response.body.cause).toEqual(
      `The Argument done with value 2 of Int type, is not valid. Expected type Boolean.`
    );
  });

  it('Should return 200 OK when valid change in the task is submitted.', async () => {
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

  it('Should return 404 Not Found when invalid id is submitted.', async () => {
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

  it('Should return 200 OK when valid change is submitted.', async () => {
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

  it('Should return 500 Internal Server Error when invalid change value is submitted', async () => {
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

  it('Should return 400 Bad Request when invalid type is submitted', async () => {
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

});
