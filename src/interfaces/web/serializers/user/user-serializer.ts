import { BaseSerializer } from '../base-serializer';

/**
 * User Serializer
 */
export default class UserSerializer implements BaseSerializer {
  private static instance: UserSerializer;

  private constructor() {}

  public static getInstance(): UserSerializer {
    if (!UserSerializer.instance) {
      UserSerializer.instance = new UserSerializer();
    }

    return UserSerializer.instance;
  }

  serialize(data: any) {
    if (!data) {
      throw new Error('Data cannot be undefined or null');
    }

    if (Array.isArray(data)) {
      return data.map(this.singleSerialize);
    }

    return this.singleSerialize(data);
  }

  singleSerialize(entity: any): any {
    return {
      id: entity.id,
      firstName: entity.firstName,
      lastName: entity.lastName,
      gender: entity.gender,
      email: entity.email,
      joined: entity.createdAt,
    };
  }
}
