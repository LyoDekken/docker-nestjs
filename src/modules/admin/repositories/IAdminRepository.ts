import { User } from 'src/modules/user/infra/entities/user.entity';
import { CreateAdminSwagger } from '../infra/dto-swagger/create-admin.dto';

export default interface IAdminRepository {
  createAdmin(data: CreateAdminSwagger): Promise<User>;
}
