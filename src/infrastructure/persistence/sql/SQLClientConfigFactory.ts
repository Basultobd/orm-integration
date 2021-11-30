import { SQLConfig } from './SQLConfig';

export class SQLConfigFactory {
  static createConfig(): SQLConfig {
    return {
      dialect: 'sqlite',
      storage: './database.sqlite',
      logging: false
    };
  }
}
