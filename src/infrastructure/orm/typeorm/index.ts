import { DataSource } from 'typeorm';

import { typeOrmConfig } from './config';

/**
 * Class TypeORMAdapter
 * @class
 * @constructor
 * @public
 */
class TypeORMAdapter {
  private dataSource: DataSource;
  private static _instance: TypeORMAdapter;

  private constructor() {
    this.dataSource = new DataSource(typeOrmConfig);
  }

  public static get instance(): TypeORMAdapter {
    if (!this._instance) {
      this._instance = new TypeORMAdapter();
    }

    return this._instance;
  }

  public getDataSource(): DataSource {
    return this.dataSource;
  }

  async run(): Promise<void> {
    try {
      await this.dataSource.initialize();

      console.info(
        '🛢️  SQL \n',
        `\tDatabase:\t ${typeOrmConfig.database}\n`,
        `\tEngine:\t\t ${typeOrmConfig.type}\n`,
        `\tStatus: \t 1\n`,
        //`\tVersion Drive:\t ${await this.dataSource.()}\n`
      );
    } catch (error) {
      console.error('Error during TypeORM DataSource initialization', error);
      throw new Error(error);
    }
  }
}

export default TypeORMAdapter;
