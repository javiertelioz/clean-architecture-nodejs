import { Repository } from 'typeorm';

import { Gender, User } from '../../../domain/entities/user';
import { Collection, Pagination } from '../../../domain/repository/base-repository';
import { UserRepository } from '../../../domain/repository/user-repository';
import TypeORMAdapter from '../../orm/typeorm';
import { UserEntity } from '../../orm/typeorm/entities/user.entity';

export class UserRepositorySQL implements UserRepository {
  private repository: Repository<UserEntity>;

  constructor() {
    this.repository = TypeORMAdapter.instance.getDataSource().getRepository(UserEntity);
  }

  async create(user: User): Promise<User> {
    const { firstName, lastName, email, password, gender } = user;
    const seqUser = await this.repository.save({ firstName, lastName, email, password, gender });

    return new User(
      seqUser.id,
      seqUser.firstName,
      seqUser.lastName,
      seqUser.email,
      seqUser.phone,
      seqUser.password,
      seqUser.gender as Gender,
    );
  }

  async update(id: number, user: Partial<User>): Promise<boolean> {
    const { firstName, lastName, email, password, gender } = user;
    const result = await this.repository.update(id, { firstName, lastName, email, password, gender });

    return result.affected > 0;
  }

  async remove(id: number): Promise<boolean> {
    const seqUser = await this.repository.findOneBy({ id });

    if (!seqUser) {
      return false;
    }

    await this.repository.remove(seqUser);

    return true;
  }

  async get(id: number): Promise<User | null> {
    const seqUser = await this.repository.findOneBy({ id });

    if (!seqUser) {
      return null;
    }

    return new User(
      seqUser.id,
      seqUser.firstName,
      seqUser.lastName,
      seqUser.email,
      seqUser.phone,
      seqUser.password,
      seqUser.gender as Gender,
    );
  }

  async find(filters: any, pagination: Pagination): Promise<Collection<User>> {
    const [records, count] = await this.repository.findAndCount({
      where: filters,
      take: pagination.limit,
      skip: pagination.offset,
    });

    return {
      count,
      records: records as User[],
    };
  }

  async getByEmail(email: string): Promise<User | null> {
    const seqUser = await this.repository.findOneBy({ email });

    if (!seqUser) {
      return null;
    }

    return new User(
      seqUser.id,
      seqUser.firstName,
      seqUser.lastName,
      seqUser.email,
      seqUser.phone,
      seqUser.password,
      seqUser.gender as Gender,
    );
  }
}
