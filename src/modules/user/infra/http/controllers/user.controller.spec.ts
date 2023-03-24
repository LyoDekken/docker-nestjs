import { Test, TestingModule } from '@nestjs/testing';
import { Role } from '@prisma/client';
import { UserService } from 'src/modules/user/services/user.service';
import { UserController } from './user.controller';

describe('UserController', () => {
  let app: TestingModule;
  let userService: UserService;
  let controller: UserController;

  beforeEach(async () => {
    app = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService],
    }).compile();

    userService = app.get<UserService>(UserService);
    controller = app.get<UserController>(UserController);
  });

  describe('createUser', () => {
    it('should create a new user', async () => {
      const userData = {
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: 'password',
        confirmPassword: 'password',
        avatar_url: 'https://example.com/avatar.jpg',
        role: Role.admin,
      };

      const createdUser = { id: '1', ...userData };
      jest.spyOn(userService, 'createUser').mockResolvedValueOnce(createdUser);

      const result = await controller.createUser(userData);

      expect(result).toEqual(createdUser);
    });
  });
});
