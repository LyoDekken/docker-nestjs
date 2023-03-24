import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  describe('createUser', () => {
    it('should create a new user', async () => {
      const userData = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        password: 'password',
        confirmPassword: 'password',
        avatar_url: 'https://example.com/avatar.jpg',
      };

      const user = await service.createUser(userData);

      expect(user).toBeDefined();
      expect(user.id).toBeDefined();
      expect(user.name).toEqual(userData.name);
      expect(user.email).toEqual(userData.email);
      expect(user.role).toEqual('user');
      expect(user.avatar_url).toEqual(userData.avatar_url);
      expect(user.password).not.toEqual(userData.password);
    });

    it('should throw an error if passwords do not match', async () => {
      const userData = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        password: 'password',
        confirmPassword: 'wrongpassword',
        avatar_url: 'https://example.com/avatar.jpg',
      };

      await expect(service.createUser(userData)).rejects.toThrowError(
        'As senhas informadas não são iguais.',
      );
    });
  });
});
