import RedisStore from 'connect-redis';
import expressSession from 'express-session';

import RedisAdapter from '../../../infrastructure/orm/redis';

const { redisClient } = RedisAdapter.instance;

export const session = expressSession({
  resave: false,
  saveUninitialized: false,
  store: new RedisStore({ client: redisClient }),
  secret: process.env.SESSION_SECRET_KEY || '',
});
