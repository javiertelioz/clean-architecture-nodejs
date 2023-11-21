import { UserError } from '../../../domain/error/user-error';
import { AccessTokenManager } from '../../security/access-token-manager';

export default (token: string, JwtAccessTokenManager: AccessTokenManager) => {
  const decode = JwtAccessTokenManager.decode(token);

  if (!decode) {
    throw UserError.notAuthorized();
  }

  return {
    uuid: decode.uuid,
    firstName: decode.firstName,
    lastName: decode.lastName,
    role: decode.role,
  };
};
