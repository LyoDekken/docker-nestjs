import {
  Controller,
  Post,
  Body,
  UseGuards,
  Patch,
  Get,
  Param,
  Delete,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Role, User } from '@prisma/client';
import { Roles } from 'src/modules/auth/infra/entities/role-decorator';
import { RolesGuard } from 'src/modules/auth/infra/guards/auth.guard';
import { LoggedUser } from 'src/shared/infra/http/middlewares/auth.decorator';
import { UserService } from '../../../services/user.service';
import { CreateUserSwagger } from '../../dto-swagger/create-user.dto';
import { UpdateUserSwaggerDto } from '../../dto-swagger/update-user.dto';

@ApiTags('cadastrar')
@Controller('cadastrar')
@ApiBearerAuth()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Roles(Role.admin)
  @UseGuards(AuthGuard(), RolesGuard)
  @Post('user')
  @ApiOperation({
    summary: 'Cadastrar um usuário vinculado',
  })
  async createUser(@Body() data: CreateUserSwagger) {
    return this.userService.createUser(data);
  }

  @Roles(Role.admin)
  @UseGuards(AuthGuard(), RolesGuard)
  @Get('all-users')
  @ApiOperation({
    summary: 'Vizualizar todos os usuarios cadastrados',
  })
  async findAllUser() {
    return this.userService.findAllUser();
  }

  @Roles(Role.admin)
  @UseGuards(AuthGuard(), RolesGuard)
  @Get('find-user/:id')
  @ApiOperation({
    summary: 'Vizualizar um usuario cadastrado pelo ID',
  })
  async findOneUser(@Param('id') id: string) {
    return this.userService.findOneUser(id);
  }

  @UseGuards(AuthGuard(), RolesGuard)
  @Patch('update-user/:id')
  @ApiOperation({
    summary: 'Atualizar o usuário logado',
  })
  async updateUser(
    @LoggedUser() user: User,
    @Body() data: UpdateUserSwaggerDto,
  ) {
    return this.userService.updateUser(user.id, data);
  }

  @Roles(Role.admin)
  @UseGuards(AuthGuard(), RolesGuard)
  @Delete('delete-user/:id')
  @ApiOperation({
    summary: 'Deletar um usuario cadastrado pelo ID',
  })
  async deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }
}
