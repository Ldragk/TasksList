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

  private handleClientError(err: Prisma.PrismaClientValidationError): {
    code: number;
    error: string;
    cause?: string;
  } {
    const errorMessage = err.message;
    const regex = /Argument (title|content|date|done): Got invalid value (\S+) on prisma\.(createOneTask|updateOneTask)\. Provided (\S+), expected (\S+)/g;
    let match;
    let argument
    let value
    let providedType
    let expectedType

    while ((match = regex.exec(errorMessage)) !== null) {
      argument = match[1];
      value = match[2];
      providedType = match[4];
      expectedType = match[5];
    }
     
    const customErrorMessage =  // ! Don't break line in template literals, because "\n" occurs  
    `The Argument ${argument} with value ${value} of ${providedType} type, is not valid. Expected type ${expectedType}`;

    return {
      code: 400,
      error: (err as Error).message,
      cause: value || providedType && expectedType ? customErrorMessage : 'This is not the expected type',
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