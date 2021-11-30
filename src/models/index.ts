import { Sequelize } from 'sequelize/types';
import { UserModelInitializer } from './User';

export const registerSQLModels = (client: Sequelize) => {
  /**
   * This is the place where your models will be initialized
   * 
   */
  new UserModelInitializer(client).initialize();
}
