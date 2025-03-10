import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { extractToken } from '../utils';
import { IsPublicKey } from '../decorators';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.get<boolean>(
      IsPublicKey,
      context.getHandler(),
    );

    if (isPublic) return true;

    const request = context.switchToHttp().getRequest<Request>();
    const token = extractToken(request);

    if (!token) throw new UnauthorizedException('error.noToken');

    try {
      const payload = await this.jwtService.verifyAsync<IUserPayload>(token);
      request.user = payload;
    } catch (error) {
      console.warn(error);
      throw new UnauthorizedException('error.invalidToken');
    }

    return true;
  }
}
