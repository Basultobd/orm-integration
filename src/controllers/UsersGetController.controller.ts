import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { Controller } from "./Controller";
import { UsersService } from 'src/services'; // This should not be here

export class UsersGetController implements Controller {
  constructor(private service: UsersService) {};

  async run(req: Request, res: Response): Promise<void> {
    try {
      const users = await this.service.getUsers();
      res.status(httpStatus.CREATED).json(users);
    } catch (error) {
      res.status(httpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
