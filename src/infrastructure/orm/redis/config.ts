import { RedisClientOptions } from 'redis';

/**
 * Redis Config
 *
 * @see https://github.com/NodeRedis/node-redis#options-object-properties
 */
export const config: RedisClientOptions = {
  /**
   * `redis[s]://[[username][:password]@][host][:port][/db-number]`
   * See [`redis`](https://www.iana.org/assignments/uri-schemes/prov/redis) and [`rediss`](https://www.iana.org/assignments/uri-schemes/prov/rediss) IANA registration for more details
   */
  url: process.env.REDIS_HOST,
  socket: {
    port: Number(process.env.REDIS_PORT) || 6379,
  },
};
