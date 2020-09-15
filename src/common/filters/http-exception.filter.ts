/**
 * 捕获 HttpException 异常
 */

import { ArgumentsHost, Catch, ExceptionFilter, HttpException, Logger } from '@nestjs/common';

const logger = new Logger();

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    console.log(host);
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status = exception.getStatus();
    const message = exception.message || '阿西吧 Error';

    logger.error(
      JSON.stringify({
        message,
        statusCode: status,
        timestamp: new Date().toLocaleString(),
        path: request.url
      })
    );

    response.status(status).json({
      message,
      statusCode: status,
      timestamp: new Date().toLocaleString(),
      path: request.url
    });
  }
}
