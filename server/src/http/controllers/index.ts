import { Prisma } from '@prisma/client';
import logger from '@src/logger';
import ApiErr from '@src/util/err/api-err';
import { Response } from 'express';

export abstract class BaseController {

  protected sendCreateUpdateErrorResponse(
    res: Response,
    err: Error
  ): void {
    if (err instanceof Prisma.PrismaClientValidationError) {
      logger.error(err);
      const clientErrors = this.handleClientError(err);
      res.status(clientErrors.code).send(
        ApiErr.format({
          code: clientErrors.code,
          cause: clientErrors.cause,
        })
      );
    } else if (err instanceof Prisma.PrismaClientKnownRequestError) {
      logger.error(err);
      const clientErrors = this.handleResourceNotFoundError(err);
      res.status(clientErrors.code).send(
        ApiErr.format({
          code: clientErrors.code,
          cause: clientErrors.cause,
          message: clientErrors.message,
        })
      );
    } else {
      logger.error(err);
      res.status(500).send(
        ApiErr.format({
          code: 500,
          message: err.message.replace(/\s+/g, ' ').trim(),
        })
      );
    }
  }

  private handleClientError(err: Prisma.PrismaClientValidationError | Error): {
    code: number;
    error: string;
    cause?: string;
  } {
    const errorMessage = err.message;
    const regex = /Argument done: Got invalid value (\S+) on prisma\.createOneTask\. Provided (\S+), expected (\S+)/;
    const match = regex.exec(errorMessage);

    const value = match?.[1] ?? '';
    const providedType = match?.[2] ?? '';
    const expectedType = match?.[3] ?? '';

    // ! Don't break line in template literals, because "\n" occurs    
    const customErrorMessage = `The value ${value} of ${providedType} type, is not valid type. Expected type ${expectedType}`;

    return {
      code: 400,
      error: (err as Error).message,
      cause: customErrorMessage,
    };
  }

  private handleResourceNotFoundError(err: Prisma.PrismaClientKnownRequestError): {
    code: number;
    error: string;
    cause: string;
    message: string;
  } {   
    const notFoundTask = 'Invalid id. Task not found.';    

    return {
      code: 404,
      error: (err as Error).message,
      cause: notFoundTask, 
      message: 'The id should be in the ObjectID format. If the format is correct, there is no task with the requested id.'
    };
  }
}

/*
TODO: Errors to be handled:
  ! 400 Bad Request: The solicitation has invalid syntax or parameter.
  ! 404 Not Found: The requested resource does not exist on the server.
    - Deleted tasks.
    - Nonexistent route. 
     
  ? 405 Method Not Allowed: The HTTP method used is not supported for the requested resource.  
    - Try handle this error case. 
*/

