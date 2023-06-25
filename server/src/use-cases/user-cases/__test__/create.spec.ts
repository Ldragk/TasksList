import { MakeUser } from "@src/test/factories/user-factory";
import { CreateUser } from "../create";
import { User } from "@src/entities/user";

describe('create user', () => {

    it('should create a valid user', async () => {

        const userRepositoryMock = {
            create: vi.fn(),
            findByEmail: vi.fn(),
            findById: vi.fn(),
            delete: vi.fn(),
            findAllUsers: vi.fn(),
        };

        const create = new CreateUser(userRepositoryMock);
        const called = vi.spyOn(userRepositoryMock, 'create');

        for (let i = 0; i < 3; i++) {
            const user = MakeUser();
            await create.execute(user);
        };

        expect(called).toHaveBeenCalledTimes(3);
        expect(userRepositoryMock.create).toHaveBeenCalledTimes(3);
        expect(userRepositoryMock.create).toHaveBeenCalledWith(expect.any(User));
    })

    it('Should be an error due to an invalid password.', async () => {

        const userRepositoryMock = {
            create: vi.fn(),
            findByEmail: vi.fn(),
            findById: vi.fn(),
            delete: vi.fn(),
            findAllUsers: vi.fn(),
        };

        const create = new CreateUser(userRepositoryMock);
        const user = MakeUser({
            password: '123456',
        });

        await expect(create.execute(user)).rejects.toThrowError(
            'The password format is invalid! It must contain at least one lowercase letter, one uppercase letter, one digit, one symbol, and have a minimum length of 10 characters.')
    });

    it('Should be an error due to an invalid email.', async () => {

        const userRepositoryMock = {
            create: vi.fn(),
            findByEmail: vi.fn(),
            findById: vi.fn(),
            delete: vi.fn(),
            findAllUsers: vi.fn(),
        };

        const create = new CreateUser(userRepositoryMock);

        await expect(create.execute({
            name: "John Doe",
            email: "johnmail.com",
            password: "1aS@3$4%sF",
        })).rejects.toThrowError('The email format is invalid!')

    });

})


