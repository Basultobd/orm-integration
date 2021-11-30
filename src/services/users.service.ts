import { User, UserCreationAttributes, UserAttributes } from '../models/User';

export class UsersService {
  async addUser(userInfo: UserCreationAttributes): Promise<UserAttributes> {
    try {
      const user = await User.create(userInfo);
      return user;
    } catch (error) {
      throw new Error('Error creating a user');
    }
  }

  async getUsers(): Promise<Array<User>> {
    try {
      return await User.findAll();
    } catch (error) {
      throw new Error('Error getting users');
    }
  }
}
