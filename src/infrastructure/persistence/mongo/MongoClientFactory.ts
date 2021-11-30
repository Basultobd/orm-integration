import { connect, disconnect, connection } from 'mongoose';
import { ClientFactory } from '../ClientFactory';
import { MongoConfigFactory } from './MongoConfigFactory';

export class MongoClientFactory implements ClientFactory<void> {  
  constructor(private url: string) {};

  async init(): Promise<void> {
    try {
      await connect(this.url);
    } catch (error) {
      throw new Error('Error in the Mongo DB setup')
    }
  }

  async finish(): Promise<void> {
    try {
      await disconnect()
        .then(() => console.log('Mongo connection closed'));
    } catch (error) {
      throw new Error('Error in the Mongo DB setup')
    }
  }

  async drop(): Promise<void> {
    try {
      await connection.dropDatabase();
    } catch (error) {
      throw new Error('Error when trying to drop mongo db')
    }
  }
}

export const mongoClient = new MongoClientFactory(MongoConfigFactory.createConfig());
