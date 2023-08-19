import { prisma } from '@src/prisma/prisma-client';
import AuthService from '@src/use-cases/auth';
import exp from 'constants';

const user = prisma.user;

describe('Users functional tests', () => {

    beforeEach(async () => {
        await prisma.task.deleteMany({})
        await prisma.deletedTask.deleteMany({});
        await prisma.user.deleteMany({});
    });

    afterAll(async () => {
        await prisma.task.deleteMany({})
        await prisma.deletedTask.deleteMany({});
        await prisma.user.deleteMany({});;
    });

    describe('When creating a new user', () => {

        it('should successfully create a new user with encrypted password', async () => {
            const newUser = {
                name: 'John Doe',
                email: 'john@mail.com',
                password: '1aS@3$4%sF',
            };
            const response = await global.testRequest.post('/users').send(newUser);
            expect(response.status).toBe(201);
            
            const { password, ...others } = newUser

            expect(response.body).toEqual(
                expect.objectContaining({
                    ...others,
                    id: expect.any(String),
                    createdAt: expect.any(String),
                })
            );
        });

    //     it('should return 400 when there is a validation error', async () => {
    //         const newUser = {
    //             email: 'john@mail.com',
    //             password: '1aS@3$4%sF',
    //         };
    //         const response = await global.testRequest.post('/users').send(newUser);
    //         expect(response.status).toBe(400);
    //         expect(response.body).toEqual({
    //             code: 400,
    //             error: 'Bad Request',
    //             cause: 'The Argument name is missing.',
    //         });
    //     });

    //     it('should return 409 when email already exists', async () => {
    //         const newUser = {
    //             name: 'John Doe',
    //             email: 'john@mail.com',
    //             password: '1aS@3$4%sF',
    //         };
    //         await global.testRequest.post('/users').send(newUser);
    //         const response = await global.testRequest.post('/users').send(newUser);

    //         expect(response.status).toBe(409);
    //         expect(response.body).toEqual({
    //             code: 409,
    //             error: 'Conflict',
    //             cause:
    //                 'User validation failed: email: already exists in the database.',
    //         });
    //     });
    // });

    // describe('When authenticating a user', () => {
    //     it('should generate a token for a valid user', async () => {
    //         const newUser = {
    //             name: 'John Doe',
    //             email: 'john@mail.com',
    //             password: '1aS@3$4%sF',
    //         };

    //         await global.testRequest.post('/users').send(newUser);

    //         const response = await global.testRequest
    //             .post('/users/authenticate')
    //             .send({ email: newUser.email, password: newUser.password });
    //         expect(response.status).toBe(200);
    //         expect(response.body).toEqual(
    //             expect.objectContaining({
    //                 token: expect.any(String),
    //             })
    //         );
    //     });

    //     it('should return UNAUTHORIZED if the user with the given email is not found', async () => {
    //         const newUser = {
    //             name: 'John Doe',
    //             email: 'john@mail.com',
    //             password: '1aS@3$4%sF',
    //         };

    //         await global.testRequest.post('/users').send(newUser);

    //         const response = await global.testRequest
    //             .post('/users/authenticate')
    //             .send({ email: 'some-email@mail.com', password: '1234' });
    //         expect(response.status).toBe(404);
    //     });

    //     it('should UNAUTHORIZED if the user is found but the password does not match', async () => {
    //         const newUser = {
    //             name: 'John Doe',
    //             email: 'john@mail.com',
    //             password: '1aS@3$4%sF',
    //         };

    //         await global.testRequest.post('/users').send(newUser);

    //         const response = await global.testRequest
    //             .post('/users/authenticate')
    //             .send({ email: newUser.email, password: 'different password' });
    //         expect(response.status).toBe(401);
    //     });
    // });

    // describe('When getting user profile info', () => {
    //     it(`Should return the token's owner profile information`, async () => {
    //         const newUser = {
    //             name: 'John Doe',
    //             email: 'john@mail.com',
    //             password: '1aS@3$4%sF',
    //         };

    //         const user = await global.testRequest.post('/users').send(newUser);

    //         const { id, ...others } = user.body

    //         const token = AuthService.generateToken({
    //             _id: id,
    //             ...others
    //         });

    //         const { body, status } = await global.testRequest
    //             .get('/users/me')
    //             .set('x-access-token', token);

    //         const { password, ...response } = others

    //         expect(status).toBe(200);
    //         expect(body).toMatchObject(JSON.parse(JSON.stringify(response)));
    //     });

    //     it(`Should return Not Found, when the user is not found`, async () => {
    //         const newUser = {
    //             name: 'John Doe',
    //             email: 'john@mail.com',
    //             password: '1aS@3$4%sF',
    //         };

    //         const user = await global.testRequest.post('/users').send(newUser);

    //         const { id, ...others } = user.body

    //         const token = AuthService.generateToken({
    //             _id: id,
    //             ...others
    //         });

    //         const { body, status } = await global.testRequest
    //             .get('/users/me')
    //             .set('x-access-token', 'invalid-token');

    //         expect(status).toBe(401);
    //         expect(body.error).toBe('jwt malformed');
    //     });
    // });

    // describe('When delete a user', () => {

    //     it('should delete a user', async () => {

    //         const newUser = {
    //             name: 'John Doe',
    //             email: 'john@mail.com',
    //             password: '1aS@3$4%sF',
    //         };

    //         const user = await global.testRequest.post('/users').send(newUser);

    //         const { id, ...others } = user.body

    //         const token = AuthService.generateToken({
    //             _id: id,
    //             ...others
    //         });

    //         const { body, status } = await global.testRequest
    //             .delete('/users/delete')
    //             .set('x-access-token', token);

    //         const { password, ...response } = others

    //         expect(status).toBe(200);
    //         expect(body).toMatchObject(JSON.parse(JSON.stringify({ "message": "User John Doe deleted successfully!" }, response)));
    //     })
    })

    describe('When update a user', () => {

        it('should update a user', async () => {

            const newUser = {
                name: 'John Doe',
                email: 'john@mail.com',
                password: '1aS@3$4%sF',
            };
            const user = await global.testRequest.post('/users').send(newUser);

            const { id, ...others } = user.body

            const token = AuthService.generateToken({
                _id: id,
                ...others
            });

            const updatedUser = {
                name: 'John Doe update',
                email: 'john-update@mail.com',
                password: 'axS@2@6%sX',
            };

            const { body, status } = await global.testRequest.put('/users/update').set('x-access-token', token).send(updatedUser);

            const { password, ...response } = user.body
            const { password: passwordUpdated, ...responseUpdated } = updatedUser

            expect(status).toBe(200);
            expect(body).toMatchObject({
                ...response,
                ...responseUpdated
            });

        })
    })


});
