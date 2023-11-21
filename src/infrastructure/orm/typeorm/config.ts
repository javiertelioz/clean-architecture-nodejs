import { DataSourceOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies/snake-naming.strategy';

export const typeOrmConfig: DataSourceOptions = {
  type: 'postgres',
  host: process.env.POSTGRESQL_HOST || 'localhost',
  port: Number(process.env.POSTGRESQL_PORT) || 5432,
  username: process.env.POSTGRESQL_USER || 'postgres',
  password: process.env.POSTGRESQL_PASS || 'password',
  database: process.env.POSTGRESQL_DATABASE || 'postgres',
  schema: process.env.POSTGRESQL_SCHEMA,
  entities: [__dirname + '/entity/*.ts'],
  migrations: [__dirname + '/migration/*{.ts,.js}'],
  migrationsTableName: `${process.env.POSTGRESQL_SCHEMA}.migration`,
  migrationsRun: false,
  logging: false,
  synchronize: true,
  namingStrategy: new SnakeNamingStrategy(),
};
