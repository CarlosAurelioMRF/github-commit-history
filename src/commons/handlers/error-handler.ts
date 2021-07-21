import { InternalServerErrorException, NotFoundException } from '@nestjs/common';

import DefaultResponses from '../default-responses';

enum HttpStatusCode {
  notFound = 404
}

export class ErrorHandler {
  public handle(error?: { message: unknown; response?: { status: number } }) {
    const { response, message } = error;

    if (!response) return new InternalServerErrorException(message);

    const { status } = response;

    switch (status) {
      case HttpStatusCode.notFound:
        return new NotFoundException(DefaultResponses.Exceptions.notFound);
      default:
        return new InternalServerErrorException(message);
    }
  }
}

const errorHandler = new ErrorHandler();
export { errorHandler };
