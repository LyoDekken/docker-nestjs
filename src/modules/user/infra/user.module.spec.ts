import { Test } from '@nestjs/testing';
import { UserModule } from './user.module';
import { UserService } from '../services/user.service';
import { UserController } from './http/controllers/user.controller';

describe('UserModule', () => {
  let userService: UserService;
  let userController: UserController;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [UserModule],
    }).compile();

    userService = moduleRef.get<UserService>(UserService);
    userController = moduleRef.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
    expect(userController).toBeDefined();
  });
});
