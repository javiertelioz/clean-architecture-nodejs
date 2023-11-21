import CreateUser from '../../../../src/application/use_cases/user/create-user';
import { Gender, User } from '../../../../src/domain/entities/user';

import { UserRepositorySQL } from '../../../../src/infrastructure/repositories/user/user-repository-sql';
import BcryptManager from '../../../../src/infrastructure/security/bcrypt-manager';

const mockBcryptManager = new BcryptManager();
const mockUserRepository = new UserRepositorySQL();

describe('Use Case: CreateUser', () => {
  test('should resolve with the newly persisted user (augmented with an ID)', async () => {
    // given
    const persistedUser = new User(null, 'John', 'Doe', 'john.doe@email.com', 'abcd-1234', 'basic', Gender.male);

    mockUserRepository.getByEmail = jest.fn((): Promise<User | null> => Promise.resolve(null));

    mockUserRepository.create = jest.fn((): Promise<User> => {
      return Promise.resolve(persistedUser);
    });

    // when
    const user = await CreateUser(
      {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@email.com',
        password: 'abcd-1234',
        gender: 'male',
      },
      mockUserRepository,
      mockBcryptManager,
    );

    // then
    expect(user).toEqual(persistedUser);
    // expect(mockUserRepository.create).toHaveBeenCalledWith(persistedUser);
  });

  test('should resolve user exist', async () => {
    // given
    const persistedUser = new User(1, 'John', 'Doe', 'john.doe@email.com', 'abcd-1234', 'basic', Gender.male);

    mockUserRepository.getByEmail = jest.fn((): Promise<User | null> => Promise.resolve(persistedUser));

    const ThrowWrongAccessToken = async () => {
      await CreateUser(
        {
          firstName: 'joe',
          lastName: 'doe',
          email: 'john@mail.com',
          password: 'abcd-1234',
          gender: 'male',
        },
        mockUserRepository,
        mockBcryptManager,
      );
    };

    // then
    expect(ThrowWrongAccessToken).rejects.toThrowError('USER_ALREADY_EXISTS');
  });
});
