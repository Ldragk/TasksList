import { UpdateUser } from "../update";
import { MakeUser } from "@src/test/factories/user-factory";

describe("update", () => {

    it("should update a case", async () => {
        const userRepositoryMock = {
            create: vi.fn(),
            findByEmail: vi.fn(),
            findById: vi.fn(),
            delete: vi.fn(),
            update: vi.fn(),
            findAllUsers: vi.fn(),
        };
        const update = new UpdateUser(userRepositoryMock);
        const createUser = MakeUser();
        userRepositoryMock.create.mockResolvedValue(createUser);

        const userUpdate = {
            "email": 'john-updated@mail.com',
            "password": '3bXa3@%1%gFJs',
            "name": 'john updated',
        };
        const id = createUser.id

        userRepositoryMock.findById.mockResolvedValue(createUser);
        const { user } = await update.execute(id, userUpdate);

        expect(userRepositoryMock.update).toHaveBeenCalledTimes(1);
        expect(userRepositoryMock.findById).toHaveBeenCalledWith(id);
        expect(user.email).toEqual(userUpdate.email);
        expect(user.name).toEqual(userUpdate.name);

    });

    it("should not update a case when invalid password is submitted", async () => {
        const userRepositoryMock = {
            create: vi.fn(),
            findByEmail: vi.fn(),
            findById: vi.fn(),
            delete: vi.fn(),
            update: vi.fn(),
            findAllUsers: vi.fn(),
        };
        const update = new UpdateUser(userRepositoryMock);
        const createUser = MakeUser();
        userRepositoryMock.create.mockResolvedValue(createUser);

        const userUpdate = {
            "email": 'john-updated@mail.com',
            "password": 'aaaaaAs5',
            "name": 'john updated',
        };
        const id = createUser.id

        userRepositoryMock.findById.mockResolvedValue(createUser);
        await expect(update.execute(id, userUpdate)).rejects.toThrowError(
            'The password format is invalid! It must contain at least one lowercase letter, one uppercase letter, one digit, one symbol, and have a minimum length of 10 characters.')
    });

    it("should not update a case when invalid email is submitted", async () => {
        const userRepositoryMock = {
            create: vi.fn(),
            findByEmail: vi.fn(),
            findById: vi.fn(),
            delete: vi.fn(),
            update: vi.fn(),
            findAllUsers: vi.fn(),
        };
        const update = new UpdateUser(userRepositoryMock);
        const createUser = MakeUser();
        userRepositoryMock.create.mockResolvedValue(createUser);

        const userUpdate = {
            "email": 'john-updatedmailcom',
            "password": '3bXa3@%1%gFJs',
            "name": 'john updated',
        };
        const id = createUser.id

        userRepositoryMock.findById.mockResolvedValue(createUser);
        await expect(update.execute(id, userUpdate)).rejects.toThrowError(
            'The email format is invalid!');
    })
}); 
