import UpdateUserById from '../../../../src/application/use_cases/user/update-user-by-id';
import { Gender, User } from '../../../../src/domain/entities/user';

import { UserRepositorySQL } from '../../../../src/infrastructure/repositories/user/user-repository-sql';

const mockUserRepository = new UserRepositorySQL();

describe('Use Case: UpdateUserById', () => {
  test('should resolve with user entity not found', async () => {
    // given
    mockUserRepository.get = jest.fn((): Promise<User | null> => {
      return Promise.resolve(null);
    });

    // when
    const ThrowNotFound = async () =>
      await UpdateUserById(
        123,
        {
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@email.com',
          gender: 'male',
        },
        mockUserRepository,
      );

    // then
    expect(ThrowNotFound).rejects.toThrowError('USER_NOT_FOUND');
  });

  test('should resolve with error when update user', async () => {
    // given
    const correspondingUser = new User(123, 'John', 'Doe', 'john.doe@email.com', 'abcd-1234', 'basic', Gender.male);

    mockUserRepository.get = jest.fn((): Promise<User | null> => Promise.resolve(correspondingUser));
    mockUserRepository.update = jest.fn((): Promise<boolean> => Promise.resolve(false));

    // when
    const ThrowUpdateError = async () =>
      await UpdateUserById(
        123,
        {
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@email.com',
          gender: 'male',
        },
        mockUserRepository,
      );

    // then
    expect(ThrowUpdateError).rejects.toThrowError('THERE_WAS_AN_ERROR');
  });

  test('should update user entity', async () => {
    // given
    mockUserRepository.get = jest.fn((): Promise<User | null> => {
      return Promise.resolve(new User(123, 'John', 'Doe', 'john.doe@email.com', 'abcd-1234', 'basic', Gender.male));
    });
    mockUserRepository.update = jest.fn((): Promise<boolean> => Promise.resolve(true));

    // when
    const isUpdated = await UpdateUserById(
      123,
      {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@email.com',
        gender: 'male',
      },
      mockUserRepository,
    );

    // then
    expect(isUpdated).toEqual(true);
    expect(mockUserRepository.get).toHaveBeenCalledWith(123);
  });

  test('should use existing user data if new data is not provided', async () => {
    // given
    const existingUser = new User(
      123,
      'ExistingFirstName',
      'ExistingLastName',
      'existing.email@example.com',
      null,
      null,
      Gender.male,
    );

    mockUserRepository.get = jest.fn().mockResolvedValue(existingUser);
    mockUserRepository.update = jest.fn().mockResolvedValue(true);

    // when
    const isUpdated = await UpdateUserById(
      123,
      {
        firstName: '',
        lastName: '',
        email: '',
        gender: '',
      },
      mockUserRepository,
    );

    // then
    expect(isUpdated).toEqual(true);
    expect(mockUserRepository.update).toHaveBeenCalledWith(123, {
      ...existingUser,
      id: null,
      firstName: existingUser.firstName,
      lastName: existingUser.lastName,
      email: existingUser.email,
    });
  });
});
