import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { LoginDto } from '../../dto-swagger/login.dto';
import { LoginResponseDto } from '../../dto-swagger/login-user.dto';
import { User } from 'src/modules/user/infra/entities/user.entity';
import { AuthService } from 'src/modules/auth/services/auth.service';
import { LoggedUser } from 'src/shared/infra/http/middlewares/auth.decorator';

@ApiTags('access')
@Controller('access')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Realizar login, recebendo um token de autenticação',
  })
  login(@Body() loginDto: LoginDto): Promise<LoginResponseDto> {
    return this.authService.login(loginDto);
  }

  @UseGuards(AuthGuard())
  @Get()
  @ApiOperation({
    summary: 'Retorna o usuário autenticado no momento',
  })
  @ApiBearerAuth()
  profileAdmin(@LoggedUser() user: User) {
    return user;
  }
}
