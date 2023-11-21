import DeleteUserById from '../../../../src/application/use_cases/user/delete-user-by-id';
import { Gender, User } from '../../../../src/domain/entities/user';

import { UserRepositorySQL } from '../../../../src/infrastructure/repositories/user/user-repository-sql';

const mockUserRepository = new UserRepositorySQL();

describe('Use Case: DeleteUserById', () => {
  test('should resolve deleted user', async () => {
    // given
    mockUserRepository.get = jest.fn((): Promise<User | null> => {
      return Promise.resolve(new User(123, 'joe', 'doe', 'john@mail.com', 'abcd-1234', 'profile', Gender.male));
    });
    mockUserRepository.remove = jest.fn((): Promise<boolean> => Promise.resolve(true));

    // when
    const userDeleted = await DeleteUserById(123, mockUserRepository);

    // then
    expect(userDeleted).toBe(true);
    expect(mockUserRepository.remove).toHaveBeenCalledWith(123);
  });

  test('should resolve user not found', async () => {
    // given
    mockUserRepository.get = jest.fn((): Promise<User | null> => Promise.resolve(null));
    mockUserRepository.remove = jest.fn((): Promise<boolean> => Promise.resolve(true));

    // when
    const ThrowNotFound = async () => await DeleteUserById(123, mockUserRepository);

    // then
    expect(ThrowNotFound).rejects.toThrowError('USER_NOT_FOUND');
  });
});
