import { ConnectOptions } from 'mongoose';

/**
 * Mongoose Config
 *
 * @see https://mongoosejs.com/docs/connections.html#options
 */
const MongooseConfig: ConnectOptions = {
  maxPoolSize: 10,
  autoCreate: true,
};

export default MongooseConfig;
