import compress from 'compression';
import morgan from "morgan";
import errorHandler from 'errorhandler';
import express, { Request, Response } from 'express';
import Router from 'express-promise-router';
import helmet from 'helmet';
import * as http from 'http';
import httpStatus from 'http-status';
import { registerRoutes } from './routes';
import Logger from './infrastructure/Logger';

export class Server {
  private express: express.Express;
  private httpServer?: http.Server;
  private logger: Logger;
  private port: string;

  /**
   * Server class constructor.
   * 
   * The functions is doing:
   *  1. creating the express app
   *  2. set helmet middleware
   *  3. set parser middleware
   * 
   * @param port App listen port
   */
  constructor(port: string, logger: Logger) {
    this.port = port;
    this.express = express();
    this.logger = logger;
    // This should be 
    /**
     * Security middleware
     * 
     * For more info about helmet visit:
     * https://github.com/helmetjs/helmet
     */
    this.express.use(helmet());

    /**
     * We used to use body-parser module here, it was deprecated
     * since express 4, the functionality is supported natively by express
     * 
     * Before:
     *  express.use(bodyParse.json());
     *  express.use(bodyParser.urlencoded({ extended: true }));
     * 
     */
    this.express.use(express.json());
    this.express.use(express.urlencoded({ extended: true }));

    // Compression middleware
    this.express.use(compress());

    /**
     * Set the requests logger middleware
     * 
     * For more information visit:
     *  How to use morgan: https://coralogix.com/blog/morgan-npm-logger-the-complete-guide/
     *  morgan doc's: https://github.com/expressjs/morgan
     */
    this.express.use(morgan("combined", { 
      stream: {
        write: (message: string) => this.logger.info(message.trim())
      }})
    );

    /**
     * This middlware removes the need to explicitly define a rejection handler.
     * 
     * For more info about this middleware visit:
     * https://github.com/express-promise-router/express-promise-router
     */
    const router = Router();
    // To see more info about errorHandlre visit: https://github.com/expressjs/errorhandler
    router.use(errorHandler());
    this.express.use(router);
    registerRoutes(router);

    /**
     * Error handler middlerware, if we return a Promise.reject() inside of
     * one of the controllers we ar going to catch the error here.
     * 
     * This is possible due errorHandler middleware
     * 
     */
    router.use((err: Error, req: Request, res: Response, next: Function) => {
      this.logger.error(err);
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err.message);
    });
  }

  /**
   * Start express server
   * @returns void
   */
  async listen(): Promise<void> {
    return new Promise(resolve => {
      this.httpServer = this.express.listen(this.port, () => {
        this.logger.info(
          `  Mock Backend App is running at http://localhost:${this.port} in ${this.express.get('env')} mode`
        );
        this.logger.info('  Press CTRL-C to stop\n');
        resolve();
      });
    });
  }

  /**
   * Returns the express http server instance.
   * 
   * By the time this function is executed http server has been settled
   * 
   * @returns express server
   */
  getHTTPServer(): http.Server | undefined {
    return this.httpServer;
  }

  /**
   * Close the http server connection
   */
  async stop(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.httpServer) {
        this.httpServer.close(error => {
          if (error) {
            return reject(error);
          }
          return resolve();
        });
      }

      return resolve();
    });
  }
}
