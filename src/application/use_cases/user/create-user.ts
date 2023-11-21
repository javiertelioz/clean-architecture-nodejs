import { User, Role } from '../../../domain/entities/user';

import { UserError } from '../../../domain/error/user-error';
import { UserRepository } from '../../../domain/repository/user-repository';
import { CryptoManager } from '../../security/crypto-manager';

export default async (
  { firstName, lastName, email, password, gender },
  userRepository: UserRepository,
  bcrypt: CryptoManager,
) => {
  const DEFAULT_USER_ROLE = Role.profile;
  const exist = await userRepository.getByEmail(email);

  if (exist) {
    throw UserError.alreadyExists();
  }

  const hashedPassword = bcrypt.hash(password);
  const user = new User(
    null,
    firstName,
    lastName,
    email,
    null,
    hashedPassword,
    //DEFAULT_USER_ROLE,
    gender,
  );

  return userRepository.create(user);
};
