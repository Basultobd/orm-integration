import config from '../../../config';

export class MongoConfigFactory {
  static createConfig(): string {
    return config.mongoUrl;
  }
}
