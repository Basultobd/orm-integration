import { PublishersService } from "./publishers.service";
import { UsersService } from "./users.service";

const usersService = new UsersService();
const publishersService = new PublishersService();

/**
 * We should not export the class to use as type.
 * 
 * The services should be behind an abstraction like
 * commandBus who knows details about the services
 * 
*/
export { UsersService, usersService, publishersService, PublishersService }
