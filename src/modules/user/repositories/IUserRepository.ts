import { CreateUserSwagger } from '../infra/dto-swagger/create-user.dto';
import { UpdateUserSwaggerDto } from '../infra/dto-swagger/update-user.dto';
import { User } from '../infra/entities/user.entity';

export default interface IUserRepository {
  createUser(data: CreateUserSwagger): Promise<User>;

  findAllUser(): Promise<User[]>;

  findOneUser(id: string): Promise<User>;

  updateUser(id: string, data: UpdateUserSwaggerDto): Promise<User>;

  deleteUser(id: string): Promise<any>;
}
