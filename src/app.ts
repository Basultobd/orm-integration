import { Server } from './server';
import { DatabasesManager } from './infrastructure/persistence/DatabasesManager';
import WinstonLogger from './infrastructure/WistonLogger';
import Logger from './infrastructure/Logger';
export class App {
  server?: Server;
  logger?: Logger;
  dbManager: DatabasesManager

  constructor() {
    const port = process.env.PORT || '5000';
    this.logger = new WinstonLogger();
    this.server = new Server(port, this.logger);
    this.dbManager = new DatabasesManager(this.logger);
  }

  async start() {
    try {
      await this.server?.listen();
      await this.dbManager.openConnection();
    } catch (error) {
      this.logger?.error(error as string);
    }
  }

  async stop() {
    await this.dbManager.drop();
    await this.dbManager.closeConnection();
    return this.server?.stop();
  }

  get httpServer() {
    return this.server?.getHTTPServer();
  }
}
