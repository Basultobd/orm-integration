import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { Controller } from "./Controller";
import { PublishersService } from 'src/services'; // This should not be here

export class PublishersGetController implements Controller {
  constructor(private service: PublishersService) {};

  async run(req: Request, res: Response): Promise<void> {
    try {
      const publishers = await this.service.getPublishers();
      res.status(httpStatus.CREATED).json(publishers);
    } catch (error) {
      res.status(httpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
