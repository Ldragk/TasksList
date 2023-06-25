import { UserProps, User } from "@src/entities/user";

type Override = Partial<UserProps>;

export function MakeUser(overrides: Override = {}) {
    return new User({
        name: "John Doe",
        email: "john@mail.com",
        password: "1aS@3$4%sF",
        ...overrides,
    });
}
