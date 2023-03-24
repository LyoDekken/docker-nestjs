import { ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '@prisma/client';
import { Observable, of } from 'rxjs';
import { User } from 'src/modules/user/infra/entities/user.entity';
import { RolesGuard } from './auth.guard';

describe('RolesGuard', () => {
  let reflector: jest.Mocked<Reflector>;
  let guard: RolesGuard;
  let context: ExecutionContext;
  let user: User;

  beforeEach(() => {
    reflector = {
      getAllAndOverride: jest.fn(),
    } as unknown as jest.Mocked<Reflector>;
    guard = new RolesGuard(reflector);
    user = {
      id: '1',
      name: 'John',
      avatar_url: 'https://example.com/avatar.jpg',
      password: 'password',
      email: 'john@example.com',
      role: 'admin',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    context = {
      switchToHttp: () => ({
        getRequest: () => ({ user }),
      }),
      getClass: jest.fn(),
      getHandler: jest.fn(),
    } as unknown as ExecutionContext;
  });

  it('should allow access if no roles are required', () => {
    const result = guard.canActivate(context);
    expect(result).toBe(true);
  });

  it('should allow access if user has required role', () => {
    reflector.getAllAndOverride.mockReturnValue(Role.admin);
    const result = guard.canActivate(context);
    expect(result).toBe(true);
  });

  it('should throw ForbiddenException if user does not have required role', () => {
    reflector.getAllAndOverride.mockReturnValue(Role.user);
    expect(() => guard.canActivate(context)).toThrow(ForbiddenException);
  });

  it('should return an Observable if Observable<boolean> is returned', () => {
    reflector.getAllAndOverride.mockReturnValue(Role.colaborator);
    const result = guard.canActivate(context) as Observable<boolean>;
    expect(result).toBeInstanceOf(Observable);
    expect(result).toEqual(of(true));
  });
});
