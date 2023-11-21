import GetAllUsers from '../../../../src/application/use_cases/user/get-all-users';
import { Gender, User } from '../../../../src/domain/entities/user';
import { Collection } from '../../../../src/domain/repository/base-repository';

import { UserRepositorySQL } from '../../../../src/infrastructure/repositories/user/user-repository-sql';
import { Pagination } from '../../../../src/interfaces/web/pagination';

const mockUserRepository = new UserRepositorySQL();

describe('Use Case: GetAllUsers', () => {
  test('should resolve with all the users persisted in repository', async () => {
    // given
    const collection: Collection<User> = {
      count: 2,
      records: [
        new User(1, 'John', 'Doe', 'john.doe@email.com', 'abcd-1234', 'basic', Gender.male),
        new User(2, 'jane', 'Doe', 'jane.doe@email.com', 'abcd-1234', 'basic', Gender.female),
      ],
    };
    mockUserRepository.find = jest.fn((): Promise<Collection<User>> => {
      return Promise.resolve(collection);
    });

    // when
    const results = await GetAllUsers(Pagination(1, 10), mockUserRepository);

    // then
    expect(results).toEqual(collection);
  });
});
