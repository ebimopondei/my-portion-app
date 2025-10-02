
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { verify, JwtPayload } from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { IS_PUBLIC_KEY } from '../decorators/public.decorators';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly configService: ConfigService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) return true;

    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.headers['authorization'];
    const token = authHeader?.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException({ isAuthenticated: false });
    }

    try {
      const jwtSecret = this.configService.get('ACCESSTOKENSECRET');
      const decoded = verify(token, jwtSecret) as JwtPayload;

      (request as any).parsedToken = decoded;
      (request as any).roles = decoded['roles'];

      return true;
    } catch (err: any) {
      throw new ForbiddenException({
        success: false,
        message: err.message,
        data: [],
      });
    }
  }
}
