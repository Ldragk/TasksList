import * as http from 'http';
import { User } from './entities/user';

declare module 'express-serve-static-core' {
  export interface Request extends http.IncomingMessage, Express.Request {
    context: {
      userId: User._id;
    };
  }
}