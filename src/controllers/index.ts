import { UserPostController } from './UsersPostController.controller';
import { UsersGetController } from './UsersGetController.controller';
import { publishersService, usersService } from '../services'; // This should not be here
import { PublishersGetController } from './PublishersGetController';
import { PublishersPostController } from './PublishersPostController';

export const usersPostController = new UserPostController(usersService)
export const usersGetController = new UsersGetController(usersService);
export const publishersGetController = new PublishersGetController(publishersService);
export const publishersPostController = new PublishersPostController(publishersService);
