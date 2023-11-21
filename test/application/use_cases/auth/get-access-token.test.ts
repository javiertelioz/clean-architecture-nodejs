import GetAuthorization from '../../../../src/application/use_cases/auth/get-authorization-token';
import { Gender, User } from '../../../../src/domain/entities/user';

import { UserRepositorySQL } from '../../../../src/infrastructure/repositories/user/user-repository-sql';
import BcryptManager from '../../../../src/infrastructure/security/bcrypt-manager';
import JwtAccessTokenManager from '../../../../src/infrastructure/security/jwt-manager';

const mockBcryptManager = new BcryptManager();
const mockUserRepository = new UserRepositorySQL();
const mockAccessTokenManager = new JwtAccessTokenManager();

describe('Use Case: GetAuthorization', () => {
  test('should resolve with a generated access token when credentials are ok', async () => {
    // given
    mockBcryptManager.compare = jest.fn(() => true);
    mockAccessTokenManager.generate = jest.fn(() => 'generated-jwt-access-token');
    mockUserRepository.getByEmail = jest.fn((): Promise<User | null> => {
      return Promise.resolve(new User(1, 'joe', 'doe', 'john@mail.com', 'abcd-1234', 'profile', Gender.male));
    });

    // when
    const accessToken = await GetAuthorization(
      {
        password: 'abcd-1234',
        email: 'john@mail.com',
      },
      mockUserRepository,
      mockAccessTokenManager,
      mockBcryptManager,
    );

    // then
    expect(accessToken.token).toBe('generated-jwt-access-token');
  });

  test('should reject when user was not found', async () => {
    // given
    mockAccessTokenManager.generate = jest.fn(() => 'generated-jwt-access-token');
    mockUserRepository.getByEmail = jest.fn((): Promise<User | null> => {
      return Promise.resolve(null);
    });

    // when
    const ThrowNotFound = async () => {
      await GetAuthorization(
        {
          password: 'abcd-1234',
          email: 'john@mail.com',
        },
        mockUserRepository,
        mockAccessTokenManager,
        mockBcryptManager,
      );
    };

    // then
    return expect(ThrowNotFound).rejects.toThrow('INVALID_EMAIL_AND_PASSWORD');
  });

  test('should reject when password did not match', async () => {
    // given
    mockBcryptManager.compare = jest.fn(() => false);
    mockAccessTokenManager.generate = jest.fn(() => 'generated-jwt-access-token');
    mockUserRepository.getByEmail = jest.fn((): Promise<User | null> => {
      return Promise.resolve(new User(1, 'joe', 'doe', 'john@mail.com', 'abcd-1234', 'profile', Gender.male));
    });

    // when
    const ThrowNotMatchPassword = async () => {
      await GetAuthorization(
        {
          password: 'abcd-1234',
          email: 'john@mail.com',
        },
        mockUserRepository,
        mockAccessTokenManager,
        mockBcryptManager,
      );
    };

    // then
    return expect(ThrowNotMatchPassword).rejects.toThrow('INVALID_EMAIL_AND_PASSWORD');
  });
});
