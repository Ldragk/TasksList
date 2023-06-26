import { SetupServer } from '@src/server';
import supertest from 'supertest';
import { prisma } from './prisma/prisma-client';

let server: SetupServer;
beforeAll(async () => {
    server = new SetupServer();
    await server.init();
    global.testRequest = supertest(server.getApp());
});

afterAll(async () => {   
    await server.close()
});



