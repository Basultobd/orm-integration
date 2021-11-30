import { Publisher, PublisherCreationAttributes, PublisherAttributes } from '../models/Publisher';

export class PublishersService {
  async addPublisher(userInfo: PublisherCreationAttributes): Promise<PublisherAttributes> {
    try {
      const user = await Publisher.create(userInfo);
      return user;
    } catch (error) {
      throw new Error('Error creating a user');
    }
  }

  async getPublishers(): Promise<Array<PublisherAttributes>> {
    try {
      return await Publisher.find({});
    } catch (error) {
      throw new Error('Error getting users');
    }
  }
}
