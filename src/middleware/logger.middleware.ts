import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private jwtService: JwtService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const token = this.extractTokenFromHeader(req);
    const payload = await this.jwtService
      .verifyAsync(token, {
        secret: process.env.SECRET,
      })
      .catch(() => {
        return false;
      });
    if (!token || !payload) {
      throw new HttpException(
        {
          error: 'Não Autorizado',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
    req['user'] = payload;
    next();
  }
  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
