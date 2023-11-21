import { BaseRepository } from './base-repository';
import { User } from '../entities/user/user';

/**
 * UserRepository Interface
 * @interface
 */
export interface UserRepository extends BaseRepository<User> {
  getByEmail(email: string): Promise<User | null>;
}
