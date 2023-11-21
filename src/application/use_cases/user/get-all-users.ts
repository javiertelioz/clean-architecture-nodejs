import { UserRepository } from '../../../domain/repository/user-repository';
import { IPagination } from '../../../interfaces/web/pagination';

export default async (payload: IPagination, userRepository: UserRepository): Promise<any> => {
  return userRepository.find([], payload);
};
