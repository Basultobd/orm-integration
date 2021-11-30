import { Sequelize } from 'sequelize';
import { SQLConfigFactory } from './SQLClientConfigFactory';
import { SQLConfig } from './SQLConfig';
import { registerSQLModels } from '../../../models';
import { ClientFactory } from '../ClientFactory';

class SQLClientFactory implements ClientFactory<Sequelize> {
  private client: Sequelize;

  constructor(config: SQLConfig) {
    this.client = new Sequelize(config)
  }

  async init(): Promise<Sequelize> {
    try {
      await this.client.authenticate();
      registerSQLModels(this.client);
      return this.client.sync()
    } catch (error) {
      throw new Error('Error in the SQL DB setup')
    }
  }

  async finish(): Promise<void> {
    try {
      await this.client.close()
        .then(() => console.log('SQL connection closed'));
    } catch (error) {
      throw new Error('An error happend when connection was closing it')
    }
  }

  async drop(): Promise<void> {
    try {
      await this.client.drop();
    } catch (error) {
      throw new Error('Error when trying to drop mongo db')
    }
  }

  getClient(): Sequelize {
    return this.client;
  }
}

export const sqlClient = new SQLClientFactory(SQLConfigFactory.createConfig());

