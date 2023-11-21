import jwt from 'jsonwebtoken';

import { AccessTokenManager } from '../../application/security/access-token-manager';

export default class JwtAccessTokenManager implements AccessTokenManager {
  generate(payload: any): string {
    const expiresIn = 60 * 60;
    return jwt.sign(payload, `${process.env.APP_JWT_SECRET}`, { expiresIn });
  }

  decode(token: string) {
    return jwt.verify(token, `${process.env.APP_JWT_SECRET}`);
  }
}
