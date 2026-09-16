import { Injectable, type NestMiddleware} from '@nestjs/common';
import { type Request, type Response, type NextFunction } from 'express';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log(`HTTP Method: ${req.method}`);
    console.log(`URL: ${req.url}`)
    console.log(`TIME: ${Date()}`)
    next();
  }
}