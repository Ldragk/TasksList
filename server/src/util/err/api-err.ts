import httpStatusCode from 'http-status-codes';

export interface APIError {  
  code: number;
  codeAsString?: string;
  cause?: string
  message?: string;
  description?: string;
  documentation?: string;
}

export interface APIErrorResponse extends Omit<APIError, 'codeAsString'> {
  error: string;
}

export default class ApiErr {
  public static format(err: APIError): APIErrorResponse {
    return {
      ...{},
      ...{       
        code: err.code,
        error: err.codeAsString
          ? err.codeAsString
          : httpStatusCode.getStatusText(err.code),
      },      
      ...(err.cause && { cause: err.cause }),
      ...(err.message && { message: err.message }),
      ...(err.documentation && { documentation: err.documentation }),
      ...(err.description && { description: err.description }),
    };
  }

 
}

