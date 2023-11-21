import { UserError } from '../../../domain/error/user-error';
import { UserRepository } from '../../../domain/repository/user-repository';

export default async (id: string | number, userRepository: UserRepository): Promise<any> => {
  const user = await userRepository.get(id);

  if (!user) {
    throw UserError.notFound();
  }

  return user;
};
