import 'reflect-metadata';

import dotenv from 'dotenv';

import Logger from './infrastructure/logger';
import MongooseAdapter from './infrastructure/orm/mongoose';
// import RedisAdapter from './infrastructure/orm/redis';
import TypeORMAdapter from './infrastructure/orm/typeorm';
import Server from './interfaces/web/server';

dotenv.config();

const server = Server.instance;

// const redis = RedisAdapter.instance;
const typeOrm = TypeORMAdapter.instance;
const mongoose = MongooseAdapter.instance;

/**
 * Start Server
 *
 * @function
 */
const bootstrap = async () => {
  Logger.log(`Run Environment: ${process.env.NODE_ENV}`);
  Logger.log(`Launch Application: ${process.env.APP_NAME}`);

  try {
    // await redis.run();
    await typeOrm.run();
    await mongoose.run();

    server.start();
  } catch (error) {
    Logger.error(error.message, error.stack);
    process.exit(1);
  }
};

bootstrap();
