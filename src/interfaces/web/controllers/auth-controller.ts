import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';

import GetAuthorization from '../../../application/use_cases/auth/get-authorization-token';

import UserRepositoryMongo from '../../../infrastructure/repositories/user/user-repository-mongo';
// import { UserRepositorySQL } from '../../../infrastructure/repositories/user/user-repository-sql';
import BcryptManager from '../../../infrastructure/security/bcrypt-manager';
import JwtAccessTokenManager from '../../../infrastructure/security/jwt-manager';
import { HttpException } from '../errors/http-exception';
import LoginSerializer from '../serializers/auth/login-serializer';

export default class UserController {
  async getAuthorization(req: Request, res: Response, next: NextFunction): Promise<any> {
    const { body } = req;

    try {
      const token = await GetAuthorization(
        body,
        new UserRepositoryMongo(),
        new JwtAccessTokenManager(),
        new BcryptManager(),
      );

      return res.status(httpStatus.OK).send(LoginSerializer.getInstance().serialize(token));
    } catch (error) {
      next(new HttpException(httpStatus.BAD_REQUEST, error.message));
    }
  }
}
