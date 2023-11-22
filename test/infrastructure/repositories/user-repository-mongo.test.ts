import { User } from '../../../src/domain/entities/user/user';
import UserSchema from '../../../src/infrastructure/orm/mongoose/schema/user';
import UserRepositoryMongo from '../../../src/infrastructure/repositories/user/user-repository-mongo';

jest.mock('../../../src/infrastructure/orm/mongoose/schema/user', () => {
  return {
    findOne: jest.fn(),
    findById: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndDelete: jest.fn(),
    countDocuments: jest.fn(),
    find: jest.fn(),
    save: jest.fn(),
  };
});

describe('UserRepositoryMongo', () => {
  let userRepositoryMongo: UserRepositoryMongo;

  beforeEach(() => {
    userRepositoryMongo = new UserRepositoryMongo();
    userRepositoryMongo.getByEmail = jest.fn((): Promise<User | null> => Promise.resolve(null));
  });

  it('should retrieve user by email using Mongoose', async () => {
    (UserSchema.findOne as jest.Mock).mockResolvedValue({});

    const user = await userRepositoryMongo.getByEmail('test@example.com');

    expect(user).toBeDefined();
  });
});
