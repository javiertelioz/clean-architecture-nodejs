import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';

import CreateUser from '../../../application/use_cases/user/create-user';
import DeleteUserById from '../../../application/use_cases/user/delete-user-by-id';
import GetAllUsers from '../../../application/use_cases/user/get-all-users';
import GetUserById from '../../../application/use_cases/user/get-user-by-id';
import UpdateUserById from '../../../application/use_cases/user/update-user-by-id';

import UserRepositoryMongo from '../../../infrastructure/repositories/user/user-repository-mongo';
import { UserRepositorySQL } from '../../../infrastructure/repositories/user/user-repository-sql';
import BcryptManager from '../../../infrastructure/security/bcrypt-manager';
import { HttpException } from '../errors/http-exception';
import { Pagination, Paginate } from '../pagination';
import UserSerializer from '../serializers/user/user-serializer';

export default class UserController {
  async createUser(req: Request, res: Response, next: NextFunction): Promise<any> {
    const { body } = req;

    try {
      const user = await CreateUser(body, new UserRepositoryMongo(), new BcryptManager());
      const userSerializer = UserSerializer.getInstance();

      return res.status(httpStatus.CREATED).send(userSerializer.singleSerialize(user));
    } catch (error) {
      console.log(error);
      next(new HttpException(httpStatus.INTERNAL_SERVER_ERROR, error.message));
    }
  }

  async getUser(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;

    try {
      const user = await GetUserById(id, new UserRepositorySQL());
      const userSerializer = UserSerializer.getInstance();

      res.send(userSerializer.singleSerialize(user));
    } catch (error) {
      next(new HttpException(httpStatus.NOT_FOUND, error.message));
    }
  }

  async getAllUsers(req: Request, res: Response) {
    const { page, limit } = req.query;
    const pagination = Pagination(+page, +limit);
    const userSerializer = UserSerializer.getInstance();

    const users = await GetAllUsers(pagination, new UserRepositorySQL());

    return res.send(Paginate(users, userSerializer, +page, +limit));
  }

  async updateUser(req: Request, res: Response, next: NextFunction) {
    const { params, body } = req;

    try {
      await UpdateUserById(params.id, body, new UserRepositorySQL());

      return res.status(httpStatus.NO_CONTENT).send();
    } catch (error) {
      next(new HttpException(httpStatus.NOT_FOUND, error.message));
    }
  }

  async deleteUser(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;

    try {
      await DeleteUserById(id, new UserRepositorySQL());
      return res.status(httpStatus.NO_CONTENT).send();
    } catch (error) {
      next(new HttpException(httpStatus.NOT_FOUND, error.message));
    }
  }
}
