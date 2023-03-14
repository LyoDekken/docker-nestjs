import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '@prisma/client';
import { Observable } from 'rxjs';
import { User } from 'src/modules/user/infra/entities/user.entity';
import { ROLES_KEY } from '../entities/role-decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }

    const { user }: { user: User } = context.switchToHttp().getRequest();

    if (!requiredRoles.some((role) => user.role?.includes(role))) {
      throw new ForbiddenException({
        statusCode: 401,
        message: 'Forbidden resource',
        error: `You don't have permissions to access this route`,
      });
    } else {
      return requiredRoles.some((role) => user.role?.includes(role));
    }
  }
}
