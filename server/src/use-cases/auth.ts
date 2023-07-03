import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from 'config';
import { prisma } from '@src/prisma/prisma-client';

const User = prisma.user;

export interface JwtToken {
  sub: string;
}

export default class AuthService {
  public static async hashPassword(
    password: string,
    salt = 10
  ): Promise<string> {
    return await bcrypt.hash(password, salt);
  }

  public static async comparePassword(
    password: string,
    hashedPassword: string
  ): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }

  public static generateToken(sub: object): string {
    const key: string = config.get('App.auth.key');
    const tokenExpiresIn: string = config.get('App.auth.tokenExpiresIn');

    return jwt.sign({ sub }, key, { expiresIn: tokenExpiresIn });
  }

  public static decodeToken(token: string): JwtToken {
    const key: string = config.get('App.auth.key');
    return jwt.verify(token, key) as JwtToken;
  }
}
