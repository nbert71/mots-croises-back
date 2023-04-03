import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { BetterLogger } from './logger';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new BetterLogger(`HTTP`);

  use(req: Request, res: Response, next: NextFunction) {
    this.logger.log(`${req.method} ${req.baseUrl} ${res.statusCode}`);
    next();
  }
}
