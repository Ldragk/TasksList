import { Prisma } from '@prisma/client';
import logger from '@src/logger';
import ApiErr, { APIError } from '@src/util/err/api-err';
import { Response } from 'express';
import NodeCache from 'node-cache';

export abstract class BaseController {
  // protected cache = new NodeCache({
  //   stdTTL: 60 * 60 * 48, 
  //   checkperiod: 5, 
  //   useClones: false 
  // });
  // protected taskCacheKey = 'allTasks';
  // protected trashCacheKey = 'allTrash'
  // protected userCacheKey = 'me'

  protected errorResponse(
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
    } else if (err.message.includes('already exists')) {
      this.sendErrorResponse(res, {
        code: 409,
        cause: err.message,
      });
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

    let match, argument, value, providedType, expectedType;
    let customErrorMessage, defaultErrorMessage;
    let check

    const errorInType = err.message.includes('Provided')
    const errorInMissing = err.message.includes('missing')

    if (errorInType) {
      const regex = /Argument (title|content|date|done): Got invalid value (\S+) on prisma\.(createOneTask|updateOneTask)\. Provided (\S+), expected (\S+)/g;

      while ((match = regex.exec(errorMessage)) !== null) {
        argument = match[1];
        value = match[2];
        providedType = match[4];
        expectedType = match[5];
      }
      customErrorMessage =  // ! Don't break line in template literals, because "\n" occurs  
        `The Argument ${argument} with value ${value} of ${providedType} type, is not valid. Expected type ${expectedType}`;
      defaultErrorMessage = 'This is not the expected type'
      check = value || providedType && expectedType ? customErrorMessage : defaultErrorMessage

    } else if (errorInMissing) {
      const regex = /Argument\s+(\w+)\s+for\s+data\.\w+\s+is\s+missing/;
      match = errorMessage.match(regex);
      argument = match ? match[1] : null;
      customErrorMessage = `The Argument ${argument} is missing.`;
      defaultErrorMessage = 'Is missing in the request body'
      check = argument ? customErrorMessage : defaultErrorMessage
    }
    return {
      code: 400,
      error: (err as Error).message,
      cause: check
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

  protected userErrorResponse(err: Error, res: Response): void {
    logger.error(err);
    if (err.message === 'No User found') {
      this.sendErrorResponse(res, {
        code: 404,
        message: 'User not found!',
      });
    } else if (err.message === 'Invalid password!') {
      this.sendErrorResponse(res, {
        code: 401,
        message: 'Password does not match',
      });
    } else {
      this.sendErrorResponse(res, {
        code: 500,
        message: 'Internal Server Error',
      });
    }
  }

  protected sendErrorResponse(res: Response, apiError: APIError): Response {
    return res.status(apiError.code).send(ApiErr.format(apiError));
  }
}