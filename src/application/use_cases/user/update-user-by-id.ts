import { User } from '../../../domain/entities/user/user';
import { UserError } from '../../../domain/error/user-error';
import { UserRepository } from '../../../domain/repository/user-repository';

export default async (id: string | number, { firstName, lastName, email, gender }, userRepository: UserRepository) => {
  const exist: any | User = await userRepository.get(id);

  if (!exist) {
    throw UserError.notFound();
  }

  const user = new User(
    null,
    firstName || exist.firstName,
    lastName || exist.lastName,
    email || exist.email,
    null,
    null,
    gender || exist.gender,
  );

  const isUpdated = await userRepository.update(id, user);

  if (!isUpdated) {
    throw UserError.updateError();
  }

  return isUpdated;
};
