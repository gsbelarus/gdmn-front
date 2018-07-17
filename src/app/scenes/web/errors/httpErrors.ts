import ExtendableError from 'es6-error';

const enum ErrorCodeType {
  INTERNAL,
  NOT_FOUND,
  NOT_UNIQUE,
  INVALID_AUTH_TOKEN,
  INVALID_ARGUMENTS
}

interface IServerResponseError {
  error: string;
  stack?: string;
  originalError: {
    expose: boolean;
    statusCode: number;
    status: number;
    code?: ErrorCodeType;
    fields?: any[];
  };
  message?: string;
}

class HttpError extends ExtendableError {
  private readonly statusCode: number;
  private readonly statusMessage: string;
  private readonly errorStack?: string;
  private readonly errorCode?: ErrorCodeType;
  private readonly fields?: any[];
  private readonly meta?: object;

  constructor(
    statusCode: number,
    statusMessage: string,
    {
      error: errorMessage,
      stack: errorStack,
      originalError: { code: errorCode, fields, ...meta },
      message
    }: IServerResponseError
  ) {
    super(errorMessage || message || statusMessage);

    this.statusCode = statusCode;
    this.statusMessage = statusMessage;
    this.errorStack = errorStack;
    this.errorCode = errorCode;
    this.fields = fields;
    this.meta = meta;
  }

  // toString() {
  //   return this.message || '[error] ' + this.statusMessage;
  // }
}

function createHttpErrorClass(statusCode: number, statusMessage: string) {
  // tslint:disable-next-line:max-classes-per-file
  return class extends HttpError {
    constructor(responseBody: IServerResponseError) {
      super(statusCode, statusMessage, responseBody);
    }
  };
}

// 4XX: Client Error
export const BadRequestError = createHttpErrorClass(400, 'Bad Request');
export const UnauthorizedError = createHttpErrorClass(401, 'Unauthorized');
export const ForbiddenError = createHttpErrorClass(403, 'Forbidden');
export const NotFoundError = createHttpErrorClass(404, 'NotFound');

export const RequestTimeoutError = createHttpErrorClass(408, 'Request Timeout');
export const ConflictError = createHttpErrorClass(409, 'Conflict');
export const GoneError = createHttpErrorClass(410, 'Gone');

// 5xx: Server Error
export const InternalServerError = createHttpErrorClass(500, 'Internal Server Error');
export const ServiceUnavailableError = createHttpErrorClass(503, 'Service Unavailable');

const httpErrorClasses: any = {
  '400': BadRequestError,
  '401': UnauthorizedError,
  '403': ForbiddenError,
  '404': NotFoundError,
  '408': RequestTimeoutError,
  '409': ConflictError,
  '410': GoneError,
  '500': InternalServerError,
  '503': ServiceUnavailableError
};

function httpErrorFactory(statusCode: number, responseBody: IServerResponseError) {
  const errorStatusClass = httpErrorClasses[statusCode.toString()];

  return errorStatusClass
    ? Reflect.construct(errorStatusClass, [responseBody])
    : new HttpError(statusCode, 'Unknown error', responseBody);
}

// class InvalidUsernameError extends UnauthorizedError {
//   constructor(responseBody) {
//     super(responseBody);
//   }
// }

export { httpErrorFactory, IServerResponseError };
