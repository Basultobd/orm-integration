import Logger from '../Logger';
import { mongoClient } from './mongo/MongoClientFactory';
import { sqlClient } from './sql/SQLClientFactory';

export class DatabasesManager {
  constructor(private logger: Logger) {};

  async openConnection(): Promise<void>{
    try {
      await Promise.all([
        sqlClient.init(),
        mongoClient.init()
      ]).then(() => this.logger.info('Databases initialized correctly') );
    } catch (error) {
      throw new Error('Something was wrong on databases open connections process');
    }
  };

  async closeConnection(): Promise<void> {
    try {
      await Promise.all([
        sqlClient.finish(),
        mongoClient.finish()
      ]).then(() => this.logger.info('Databases connection closed correctly'))
    } catch (error) {
      throw new Error('Something was wrong on databases close connections process');
    }
  };

  async drop(): Promise<void> {
    try {
      await Promise.all([
        sqlClient.drop(),
        mongoClient.drop()
      ]).then(() => this.logger.info('Databases dropped correctly'));
    } catch (error) {
      throw new Error('Something was wrong dropping databases');
    }
  }
};
