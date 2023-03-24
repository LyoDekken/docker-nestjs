import { UnauthorizedException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { JwtStrategy } from './jwt.strategy';
import { PrismaService } from 'src/shared/infra/prisma/prisma.service';
import { Role } from '@prisma/client';

describe('JwtStrategy', () => {
  let jwtStrategy: JwtStrategy;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JwtStrategy,
        {
          provide: PrismaService,
          useValue: {
            user: {
              findUnique: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    jwtStrategy = module.get<JwtStrategy>(JwtStrategy);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  describe('validate', () => {
    it('should return user when token is valid', async () => {
      const payload = { email: 'test@example.com' };
      const user = {
        id: '1',
        name: 'John',
        avatar_url: 'https://example.com/avatar.jpg',
        email: 'user@email.com',
        password: 'password',
        role: Role.user,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      jest.spyOn(prismaService.user, 'findUnique').mockResolvedValueOnce(user);

      const result = await jwtStrategy.validate(payload);
      expect(result).toEqual(user);
    });

    it('should throw UnauthorizedException when user does not exist', async () => {
      const payload = { email: 'test@example.com' };
      jest
        .spyOn(prismaService.user, 'findUnique')
        .mockResolvedValueOnce(undefined);

      expect(jwtStrategy.validate(payload)).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });
});
