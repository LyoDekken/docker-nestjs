import { LoginResponseDto } from '../infra/dto-swagger/login-user.dto';
import { LoginDto } from '../infra/dto-swagger/login.dto';

export default interface IAuthRepository {
  login(loginDto: LoginDto): Promise<LoginResponseDto>;
}
