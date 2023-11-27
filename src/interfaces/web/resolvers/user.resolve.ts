import { Resolver, Query, Mutation, Authorized, Arg, Ctx } from 'type-graphql';

import { NewUserInput, UpdateUserInput, User } from './user.input';

import CreateUser from '../../../application/use_cases/user/create-user';
import DeleteUserById from '../../../application/use_cases/user/delete-user-by-id';
import GetAllUsers from '../../../application/use_cases/user/get-all-users';
import GetUserById from '../../../application/use_cases/user/get-user-by-id';
import UpdateUserById from '../../../application/use_cases/user/update-user-by-id';

import UserRepositoryMongo from '../../../infrastructure/repositories/user/user-repository-mongo';
import BcryptManager from '../../../infrastructure/security/bcrypt-manager';
import { Paginate, Pagination } from '../pagination';
import UserSerializer from '../serializers/user/user-serializer';

@Resolver(User)
export class UserResolver {
  @Query(returns => User, {
    description: 'Get user by Id',
  })
  async getUserById(@Arg('userId') userId: string) {
    const user = await GetUserById(userId, new UserRepositoryMongo());
    const userSerializer = UserSerializer.getInstance();

    return userSerializer.singleSerialize(user);
  }

  @Query(returns => [User], {
    description: 'Get all users',
  })
  async getAllUsers(): Promise<User[]> {
    const pagination = Pagination(1, 50);
    const userSerializer = UserSerializer.getInstance();

    const users = await GetAllUsers(pagination, new UserRepositoryMongo());

    return Paginate(users, userSerializer, 1, 50).records;
  }

  @Mutation(returns => User, {
    description: 'Create user',
  })
  async createUser(@Arg('newUser') newUserInput: NewUserInput, @Ctx('user') _user: User): Promise<User> {
    const body = {
      firstName: newUserInput.firstName,
      lastName: newUserInput.lastName,
      email: newUserInput.email,
      password: newUserInput.password,
      gender: newUserInput.gender,
    };

    const user = await CreateUser(body, new UserRepositoryMongo(), new BcryptManager());
    const userSerializer = UserSerializer.getInstance();

    return userSerializer.singleSerialize(user);
  }

  @Mutation(returns => Boolean, {
    description: 'Update user',
  })
  async updateUser(
    @Arg('userId', { description: 'User Id eg. 1' }) userId: string,
    @Arg('newUser') updateUserInput: UpdateUserInput,
    @Ctx('user') _user: User,
  ): Promise<boolean> {
    const body = {
      firstName: updateUserInput.firstName,
      lastName: updateUserInput.lastName,
      email: updateUserInput.email,
      gender: updateUserInput.gender,
    };

    return UpdateUserById(userId, body, new UserRepositoryMongo());
  }

  @Mutation(returns => Boolean, {
    description: 'Delete user by id',
  })
  async deleteUserById(@Arg('userId', { description: 'User Id eg. 1' }) userId: string) {
    return DeleteUserById(userId, new UserRepositoryMongo());
  }
}
