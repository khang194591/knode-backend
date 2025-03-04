import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(
    private readonly configService: ConfigService,
    private readonly reflector: Reflector,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredPermissions = this.reflector.get<string[]>(
      'permissions',
      context.getHandler(),
    );
    if (!requiredPermissions?.length) {
      return true;
    }

    const request = context.switchToHttp().getRequest<Request>();
    const user = request.user;
    const superAdminEmail = this.configService.get<string>('SUPER_ADMIN_EMAIL');

    if (user?.email === superAdminEmail) return true;

    if (!user || !user.roleId || !user.permissions) {
      throw new ForbiddenException('User permissions not found');
    }

    const userPermissions = user.permissions;

    const hasPermission = requiredPermissions.every((permission) =>
      userPermissions.includes(permission),
    );

    if (!hasPermission) {
      throw new ForbiddenException(
        'You do not have permission to access this resource',
      );
    }

    return true;
  }
}
