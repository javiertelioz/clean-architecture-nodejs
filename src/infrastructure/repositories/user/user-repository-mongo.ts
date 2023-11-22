import { Gender, User } from '../../../domain/entities/user';
import { Pagination, Collection } from '../../../domain/repository/base-repository';
import { UserRepository } from '../../../domain/repository/user-repository';

import UserSchema from '../../orm/mongoose/schema/user';

export default class UserRepositoryMongo implements UserRepository {
  async getByEmail(email: string): Promise<User> {
    console.log('0sdfsafd');
    const mongooseUser = await UserSchema.findOne({ email });

    if (!mongooseUser) {
      return null;
    }

    return new User(
      mongooseUser.id,
      mongooseUser.firstName,
      mongooseUser.lastName,
      mongooseUser.email,
      mongooseUser.phone,
      mongooseUser.password,
      mongooseUser.gender as Gender,
    );
  }

  async create(user: User): Promise<User> {
    const { firstName, lastName, email, password, gender } = user;
    const mongooseUser = new UserSchema({ firstName, lastName, email, password, gender });

    await mongooseUser.save();

    return new User(
      mongooseUser.id,
      mongooseUser.firstName,
      mongooseUser.lastName,
      mongooseUser.email,
      mongooseUser.phone,
      mongooseUser.password,
      mongooseUser.gender as Gender,
    );
  }

  async update(id: string | number, user: Partial<User>): Promise<boolean> {
    const { firstName, lastName, email, gender } = user;
    const mongooseUser = await UserSchema.findByIdAndUpdate(
      id,
      {
        $set: {
          firstName,
          lastName,
          email,
          gender,
        },
      },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!mongooseUser) {
      return false;
    }

    return true;
  }

  async remove(id: string | number): Promise<boolean> {
    const mongooseUser = await UserSchema.findByIdAndDelete(id);

    if (!mongooseUser) {
      return false;
    }

    return true;
  }

  async get(id: string | number): Promise<User> {
    const mongooseUser = await UserSchema.findById(id);

    if (!mongooseUser) {
      return null;
    }

    return new User(
      mongooseUser.id,
      mongooseUser.firstName,
      mongooseUser.lastName,
      mongooseUser.email,
      mongooseUser.phone,
      mongooseUser.password,
      mongooseUser.gender as Gender,
    );
  }

  async find(filters: any, pagination: Pagination): Promise<Collection<User>> {
    const count = await UserSchema.countDocuments();
    const mongooseUsers = await UserSchema.find()
      .skip(pagination.offset)
      .limit(pagination.limit)
      .sort({ createdAt: -1 });

    const records = mongooseUsers.map(mongooseUser => {
      return new User(
        mongooseUser.id,
        mongooseUser.firstName,
        mongooseUser.lastName,
        mongooseUser.email,
        mongooseUser.phone,
        mongooseUser.password,
        mongooseUser.gender as Gender,
      );
    });

    return { count, records };
  }
}
