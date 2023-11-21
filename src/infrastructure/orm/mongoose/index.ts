import { connect, version, Mongoose } from 'mongoose';

import MongooseConfig from './config';

/**
 * class MongooseAdapter
 */
class MongooseAdapter {
  public mongoose: Mongoose;

  private static _instance: MongooseAdapter;

  private constructor() {}

  public static get instance(): MongooseAdapter {
    return this._instance || (this._instance = new this());
  }

  async run(callback?: () => void): Promise<void> {
    this.mongoose = await connect(process.env.MONGO_URI, MongooseConfig);

    const { name, readyState } = this.mongoose.connection;

    if (!callback) {
      console.info(
        '🛢️  Mongoose\n',
        `\tDatabase:\t ${name}\n`,
        `\tStatus: \t ${readyState}\n`,
        `\tVersion Drive:\t ${version}\n`,
      );
    }
  }
}

export default MongooseAdapter;
