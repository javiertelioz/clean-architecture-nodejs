import { UserError } from '../../../domain/error/user-error';
import { UserRepository } from '../../../domain/repository/user-repository';
import { AccessTokenManager } from '../../security/access-token-manager';
import { CryptoManager } from '../../security/crypto-manager';

export default async (
  { email, password },
  userRepository: UserRepository,
  JwtAccessTokenManager: AccessTokenManager,
  Bcrypt: CryptoManager,
) => {
  const user: any = await userRepository.getByEmail(email);

  if (!user) {
    throw UserError.invalidEmailAndPassword();
  }

  if (!Bcrypt.compare(password, user.password)) {
    throw UserError.invalidEmailAndPassword();
  }

  const token = JwtAccessTokenManager.generate({
    uuid: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    role: user.role,
  });

  return { token };
};
