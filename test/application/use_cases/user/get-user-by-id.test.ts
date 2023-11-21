import GetUserById from '../../../../src/application/use_cases/user/get-user-by-id';
import { Gender, User } from '../../../../src/domain/entities/user';

import { UserRepositorySQL } from '../../../../src/infrastructure/repositories/user/user-repository-sql';

const mockUserRepository = new UserRepositorySQL();

describe('Use Case: GetUserById', () => {
  test('should resolve with the corresponding persisted user entity', async () => {
    // given
    const correspondingUser = new User(123, 'John', 'Doe', 'john.doe@email.com', 'abcd-1234', 'basic', Gender.male);

    mockUserRepository.get = jest.fn((): Promise<User | null> => {
      return Promise.resolve(correspondingUser);
    });

    // when
    const user = await GetUserById(123, mockUserRepository);

    // then
    expect(mockUserRepository.get).toHaveBeenCalledWith(123);
    expect(user).toEqual(correspondingUser);
  });

  test('should resolve with user entity not found', async () => {
    // given
    mockUserRepository.get = jest.fn((): Promise<User | null> => {
      return Promise.resolve(null);
    });

    // when
    const ThrowNotFound = async () => await GetUserById(123, mockUserRepository);

    // then
    expect(ThrowNotFound).rejects.toThrowError('USER_NOT_FOUND');
  });
});
