import { DataTypes, Model, Sequelize, Optional } from 'sequelize'
import { ModelInitializer } from './ModelInitializer';

/**
 * This interface is indicating us which are the fields
 * the User object will have.
 */
export interface UserAttributes {
  id: number;
  name: string;
}

/**
 * Some attributes are optional in `User.build` and `User.create` calls.
 * To create a new User we don't need the id, we only need the name.
 * 
 * So this interface is indicating us which are the required attributes
 * for the creation.
 */
export interface UserCreationAttributes extends Optional<UserAttributes, "id"> {}

/**
 * Sequelize Model.
 * 
 * This class inherits from Sequelize.Model class, that is the reason because
 * we can use User.init some lines below.
 * 
 * init() is static method!!
 */
export class User extends Model<UserAttributes, UserCreationAttributes> {
  // Not nulleable attributtes
  public id!: number;
  public name!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export class UserModelInitializer implements ModelInitializer {

  /**
   * Use private/public in the function signature it's a shortcut of:
   * 
   * private client: Sequelize;
   * 
   * constructor(client: Sequelize) {
   *  this.client = client;
   * }
   * 
   */
  constructor(private client: Sequelize) {};
  
  /**
   * This function is part of the ModelInitializer interface.
   * 
   * The interfaces in OOP theory are pure abstract classes.
   * This means that all it's methods are abstract methods.
   * 
   * For more info:
   *  https://www.geeksforgeeks.org/difference-between-abstract-class-and-interface-in-java/
   * 
   * Using this method we are adding the model to the sequelize client instance,
   * this is necessary when we start the DB.
   */
  initialize(): void {
    User.init({
      /**
       * The model attributes.
       * 
       * The way we are defining them will give DB information about
       * the date type of the columns in the table.
       */
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        allowNull: false,
        type: new DataTypes.STRING(128),
      },
    }, {
      // Other model options go here
      sequelize: this.client, // We need to pass the connection instance
      modelName: 'User' // We need to choose the model name
    });
  }
};
