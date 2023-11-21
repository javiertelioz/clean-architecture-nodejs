import { createClient } from 'redis';

import { config } from './config';

import Logger from '../../logger';

/**
 * Class RedisAdapter
 */
class RedisAdapter {
  public redisClient;

  private static _instance: RedisAdapter;

  private constructor() {}

  public static get instance(): RedisAdapter {
    return this._instance || (this._instance = new this());
  }

  private handleError(err: any) {
    Logger.error('Redis client error', err);
  }

  private handleSuccess() {
    console.info('🛢️  Redis\n', `\tHost: \t\t ${config.url || 'localhost'}\n`, '\tStatus: \t 1\n');
  }

  async run(): Promise<void> {
    this.redisClient = await createClient(config)
      .on('error', this.handleError)
      .on('connect', this.handleSuccess)
      .connect();

    this.redisClient.set('key_2', 'value');
  }
}

export default RedisAdapter;
