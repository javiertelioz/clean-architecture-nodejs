import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { Request, Response, NextFunction, RequestHandler } from 'express';

import { HttpException } from '../errors/http-exception';

export default function validationMiddleware(type: any, skipMissingProperties = false): RequestHandler {
  return async (req: Request, res: Response, next: NextFunction) => {
    /*const validationErrors = await validate(plainToInstance(type, req.body), {
      skipMissingProperties
    });
    const validationResult = new EntityValidationErrors(validationErrors);

    if (!validationResult.isValid) {
      next(new HttpException(400, 'Validation errors in your request', validationResult.errors));
    }*/

    next();
  };
}
