import { Controller, Delete, Get, Middleware, Post } from '@overnightjs/core';
import { Request, Response } from 'express';
import { BaseController } from '.';
import { AuthMiddleware } from '@src/middlewares/auth';
import { CreateUser } from '@src/use-cases/user-cases/create';
import { PrismaUserRepository } from '@src/prisma/repositories/users/prisma-user-repository';
import { UserViewModel } from '../view-models/user-view-model';
import { Authenticate } from '@src/use-cases/user-cases/authenticate';
import { Me } from '@src/use-cases/user-cases/me';
import { DeleteUser } from '@src/use-cases/user-cases/delete';

@Controller('users')
export class UserController extends BaseController {

    @Post('')
    public async create(req: Request, res: Response) {
        try {
            const createUser = new CreateUser(new PrismaUserRepository());
            const { email, password, name } = req.body;
            const { user } = await createUser.execute({
                email,
                password,
                name
            });
            return { user: res.status(201).json(UserViewModel.toHTTP(user)) }
        } catch (err) {
            return this.errorResponse(res, err as Error)
        }
    }

    @Post('authenticate')
    public async authenticate(
        req: Request,
        res: Response
    ) {
        const authenticate = new Authenticate(new PrismaUserRepository())

        try {
            const { token } = await authenticate.execute(req);
            return res.status(200).send({ token: token })
        } catch (err) {
            return this.userErrorResponse(err as Error, res)
        }
    }

    @Get('me')
    @Middleware(AuthMiddleware)
    public async me(req: Request, res: Response) {
        const me = new Me(new PrismaUserRepository())

        try {
            const { user } = await me.execute(req);
            return { user: res.status(200).json(UserViewModel.toHTTP(user)) }
        } catch (err) {
            return this.userErrorResponse(err as Error, res)
        }
    }

    @Delete('delete')
    @Middleware(AuthMiddleware)
    public async delete(
        req: Request,
        res: Response
    ) {
        const deleteUser = new DeleteUser(new PrismaUserRepository())

        try {
            const { user } = await deleteUser.execute(req);
            return res.status(200).json({ 
                message: `User ${user.name} deleted successfully!`,
                user: user })
        } catch (err) {
            return this.userErrorResponse(err as Error, res)
        }
    }

    @Get('all')
    public async all(req: Request, res: Response) {
        const repo = new PrismaUserRepository()
        const users = await repo.findAllUsers()
        return res.status(200).json(users.map(UserViewModel.toHTTP));
    }
}
