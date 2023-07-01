import { User as RawUser } from "@prisma/client";
import { User } from "@src/entities/user";

export class PrismaUserMapper {
  static toPrisma(user: User) {
    return {
      id: user.id,
      email: user.email,
      password: user.password,
      name: user.name,
      createdAt: user.createdAt,      
    };
  }

  static toDomain(raw: RawUser): User {
    return new User(
      {
        email: raw.email,
        password: raw.password,
        name: raw.name,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt
      },
      raw.id
    );
  }

}
