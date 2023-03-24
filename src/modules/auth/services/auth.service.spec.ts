import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/shared/infra/prisma/prisma.service';
import { AuthService } from './auth.service';
import { LoginDto } from '../infra/dto-swagger/login.dto';
import { LoginResponseDto } from '../infra/dto-swagger/login-user.dto';
import * as bcrypt from 'bcrypt';
import { Role } from '@prisma/client';

describe('AuthService', () => {
  let service: AuthService;
  let prismaService: PrismaService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: PrismaService,
          useValue: {
            user: {
              findUnique: jest.fn(),
            },
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    prismaService = module.get<PrismaService>(PrismaService);
    jwtService = module.get<JwtService>(JwtService);
  });

  describe('login', () => {
    const email = 'test@example.com';
    const password = 'password';

    it('should throw an UnauthorizedException if the user does not exist', async () => {
      const loginDto: LoginDto = { email, password };
      jest.spyOn(prismaService.user, 'findUnique').mockResolvedValueOnce(null);

      await expect(service.login(loginDto)).rejects.toThrow(
        UnauthorizedException,
      );
    });

    it('should throw an UnauthorizedException if the password is incorrect', async () => {
      const loginDto: LoginDto = { email, password };

      const user = {
        id: '1',
        name: 'John',
        avatar_url: 'https://example.com/avatar.jpg',
        email,
        password: await bcrypt.hash(password, 10),
        role: Role.user,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(prismaService.user, 'findUnique').mockResolvedValueOnce(user);

      await expect(service.login(loginDto)).rejects.toThrow(
        UnauthorizedException,
      );
    });

    it('should return a LoginResponseDto if the email and password are correct', async () => {
      const loginDto: LoginDto = { email, password };

      const user = {
        id: '1',
        name: 'John',
        avatar_url: 'https://example.com/avatar.jpg',
        email,
        password: await bcrypt.hash(password, 10),
        role: Role.user,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(prismaService.user, 'findUnique').mockResolvedValueOnce(user);
      jest.spyOn(jwtService, 'sign').mockReturnValueOnce('fake-token');

      const expected: LoginResponseDto = {
        token: 'fake-token',
        user: {
          id: '1',
          name: 'John',
          avatar_url: 'https://example.com/avatar.jpg',
          email,
          password: await bcrypt.hash(password, 10),
          role: Role.user,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      };

      await expect(service.login(loginDto)).resolves.toEqual(expected);
    });
  });
});
