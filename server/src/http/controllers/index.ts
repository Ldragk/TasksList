import { Prisma } from '@prisma/client';
import logger from '@src/logger';
import ApiErr from '@src/util/err/api-err';
import { Response } from 'express';




export abstract class BaseController {

  protected sendCreateUpdateErrorResponse(
    res: Response,
    err: Prisma.PrismaClientValidationError | Error
  ): void {
    if (err instanceof Prisma.PrismaClientValidationError) {
      const clientErrors = this.handleClientError(err);
      res.status(clientErrors.code).send(
        ApiErr.format({
          code: clientErrors.code,        
          cause: clientErrors.cause,
        })
      );
    } else {
      logger.error(err);
      res.status(500).send(
        ApiErr.format({
          code: 500,
          message: String(err.cause),
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

    const regex = /Argument done: Got invalid value (\S+) on prisma\.createOneTask\. Provided (\S+), expected (\S+)/;
    const match = regex.exec(errorMessage);
    
    const value = match?.[1] ?? '';
    const providedType = match?.[2] ?? '';
    const expectedType = match?.[3] ?? '';
    
    const customErrorMessage = `The value ${value} of ${providedType} type, is not valid type. Expected type ${expectedType}`;

    return {
      code: 400,
      error: (err as Error).message,
      cause: customErrorMessage,
    };     
  }  
}

/*
TODO: Erros à serem tratados:
  !! 400 Bad Request: A solicitação possui sintaxe inválida ou parâmetros inválidos.
  !! 404 Not Found: O recurso solicitado não foi existe no servidor.
    - Na tarefa deletada.
    - Rota inexistente.
  ?? 405 Method Not Allowed: O método HTTP usado na solicitação não é suportado para o recurso solicitado.
    - Tentar tratar esse caso de erro. 
*/

