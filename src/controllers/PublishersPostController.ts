import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { Controller } from "./Controller";
import { PublishersService } from 'src/services'; // This should not be here

export class PublishersPostController implements Controller {
  constructor(private service: PublishersService) {};

  async run(req: Request, response: Response): Promise<void> {
    const { name } = req.body;

    try {
      const Publishers = await this.service.addPublisher({ name });
      response.status(httpStatus.CREATED).json(Publishers);
    } catch (error) {
      response.status(httpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
