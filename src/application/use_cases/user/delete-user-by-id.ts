import { UserError } from '../../../domain/error/user-error';
import { UserRepository } from '../../../domain/repository/user-repository';

export default async (id: string | number, userRepository: UserRepository) => {
  const exist = await userRepository.get(id);

  if (!exist) {
    throw UserError.notFound();
  }

  return userRepository.remove(id);
};
