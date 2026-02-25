import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Response } from 'express';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter<Prisma.PrismaClientKnownRequestError> {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const { status, message } = this.formatError(exception);

    response.status(status).json({
      statusCode: status,
      message,
    });
  }

  private formatError(exception: Prisma.PrismaClientKnownRequestError) {
    switch (exception.code) {
      // Unique constraint
      case 'P2002':
        return {
          status: HttpStatus.CONFLICT,
          message:
            'This record already exists. One of the unique fields is duplicated.',
        };

      // Record not found
      case 'P2025':
        return {
          status: HttpStatus.NOT_FOUND,
          message:
            'The requested resource was not found or does not belong to this user.',
        };

      // Foreign key
      case 'P2003':
        return {
          status: HttpStatus.BAD_REQUEST,
          message:
            'Invalid reference. One of the related records does not exist.',
        };

      // Invalid data
      case 'P2000':
        return {
          status: HttpStatus.BAD_REQUEST,
          message: 'One of the provided values is too long or invalid.',
        };

      default:
        return {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'An unexpected database error occurred.',
        };
    }
  }
}
