import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  InternalServerErrorException
} from "@nestjs/common";

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: InternalServerErrorException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let msgResp = {};

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      msgResp = (exception as HttpException).getResponse();
    }

    // Its ApiResponse Type (status code conflict: HttpStatus vs our HttpStatusCode)
    const errorResponse = {
      success: false,
      statusCode: status,
      path: request.url,
      error: exception?.name || 'Error',
      message: exception?.message,
      ...msgResp
    }
    response.status(status).json(errorResponse);
  }
}
