import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { isEmpty } from 'lodash';
import { isPresent } from '../is-present';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(req: Request, res: Response, next: NextFunction) {
    const startAt = process.hrtime();
    const { ip, method, originalUrl } = req;
    const userAgent = req.get('user-agent') || '';

    this.logger.log(`Request ${method} ${originalUrl} - ${userAgent} ${ip}`);

    res.on('finish', () => {
      const { statusCode } = res;
      const diff = process.hrtime(startAt);
      const responseTime = (diff[0] * 1e3 + diff[1] * 1e-6).toFixed(0);

      this.logger.log(
        [
          `${method} ${originalUrl} ${statusCode} ${responseTime}ms } - ${userAgent} ${ip} `,
          this.stringifyParams(req.body, 'body'),
          this.stringifyParams(req.query, 'query'),
          this.stringifyParams(req.params, 'params'),
        ]
          .filter(isPresent)
          .join('\n'),
      );
    });

    next();
  }

  private stringifyParams(params: Record<string, any>, prefix: string) {
    if (isEmpty(params)) {
      return null;
    }

    return `${prefix}: ${JSON.stringify(params, (_key, value) =>
      typeof value === 'bigint' ? `${value}n` : value,
    )}`;
  }
}
