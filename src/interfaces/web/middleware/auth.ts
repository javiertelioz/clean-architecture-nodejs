import { Request, Response, NextFunction } from 'express';

import VerifyAuthorization from '../../../application/use_cases/auth/verify-authorization-token';
import JwtAccessTokenManager from '../../../infrastructure/security/jwt-manager';

import { HttpException } from '../errors/http-exception';

export interface RequestCustom extends Request {
  user: any;
}

export default function authMiddleware(req: RequestCustom, res: Response, next: NextFunction) {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new HttpException(401, 'Authentication token missing');
  }

  const accessToken = authorization.replace(/Bearer/gi, '').replace(/ /g, '');

  if (!accessToken) {
    res.sendStatus(401);
    throw new HttpException(401, 'Authentication token missing');
  }

  try {
    req.user = VerifyAuthorization(accessToken, new JwtAccessTokenManager());
    next();
  } catch (error) {
    next(new HttpException(401, error.message));
  }
}
