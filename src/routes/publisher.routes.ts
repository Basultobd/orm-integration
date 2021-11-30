import { Router, Request, Response } from 'express';
import { publishersGetController, publishersPostController } from '../controllers'; // This should not be here

export const register = (router: Router) => {
  /**
   * POST /publishers
   * Create a new user
   */
  router.post('/publishers', (req: Request, res: Response) => publishersPostController.run(req, res));
  
  /**
   * GET /
   * Get all publishers
   */
  router.get('/publishers', (req: Request, res: Response) => publishersGetController.run(req, res));
};
